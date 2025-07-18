import { BlobServiceClient } from '@azure/storage-blob';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

export class ImageProcessor {
  private static blobServiceClient: BlobServiceClient;
  private static containerName = 'aino-media';
  private static azureBaseUrl = 'https://ainomedia.blob.core.windows.net/aino-media';

  /**
   * Initialize Azure Blob Storage client
   */
  private static async getBlobServiceClient(): Promise<BlobServiceClient> {
    if (!this.blobServiceClient) {
      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
      if (!connectionString) {
        throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable is required');
      }
      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    }
    return this.blobServiceClient;
  }

  /**
   * Process markdown content and migrate all images to Azure Blob Storage
   */
  static async processMarkdownImages(markdownContent: string): Promise<{
    processedContent: string;
    migratedImages: string[];
  }> {
    console.log('🖼️ Starting image processing for markdown content...');
    
    const migratedImages: string[] = [];
    let processedContent = markdownContent;

    // Find all image references in markdown
    const imagePatterns = [
      // Markdown images: ![alt](url)
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      // HTML images: <img src="url" ...>
      /<img[^>]+src=["']([^"']+)["'][^>]*>/g
    ];

    for (const pattern of imagePatterns) {
      let match;
      while ((match = pattern.exec(markdownContent)) !== null) {
        const originalUrl = match[2] || match[1]; // For markdown: match[2], for HTML: match[1]
        
        if (this.shouldMigrateImage(originalUrl)) {
          try {
            console.log(`📥 Processing image: ${originalUrl}`);
            const newUrl = await this.migrateImageToAzure(originalUrl);
            
            if (newUrl) {
              // Replace the URL in the content
              if (pattern.source.includes('!\\[')) {
                // Markdown image: ![alt](old_url) -> ![alt](new_url)
                processedContent = processedContent.replace(
                  `![${match[1]}](${originalUrl})`,
                  `![${match[1]}](${newUrl})`
                );
              } else {
                // HTML image: <img src="old_url" ...> -> <img src="new_url" ...>
                processedContent = processedContent.replace(
                  `src="${originalUrl}"`,
                  `src="${newUrl}"`
                );
              }
              
              migratedImages.push(newUrl);
              console.log(`✅ Migrated image: ${originalUrl} -> ${newUrl}`);
            }
          } catch (error) {
            console.error(`❌ Failed to migrate image ${originalUrl}:`, error);
          }
        }
      }
    }

    console.log(`🖼️ Image processing complete. Migrated ${migratedImages.length} images.`);
    return { processedContent, migratedImages };
  }

  /**
   * Check if an image URL should be migrated to Azure
   */
  private static shouldMigrateImage(url: string): boolean {
    // Skip if already an Azure URL
    if (url.includes('ainomedia.blob.core.windows.net')) {
      return false;
    }

    // Skip if it's a data URL
    if (url.startsWith('data:')) {
      return false;
    }

    // Skip if it's a relative path that doesn't look like an external URL
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return false;
    }

    return true;
  }

  /**
   * Download image from URL and upload to Azure Blob Storage
   */
  private static async migrateImageToAzure(imageUrl: string): Promise<string | null> {
    try {
      // Download the image
      console.log(`📥 Downloading image from: ${imageUrl}`);
      const response = await fetch(imageUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
      }

      const imageBuffer = await response.buffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      
      // Generate unique filename
      const fileExtension = this.getFileExtension(imageUrl, contentType);
      const fileName = `${uuidv4()}.${fileExtension}`;
      const blobName = `image/${fileName}`;

      // Upload to Azure Blob Storage
      console.log(`📤 Uploading image to Azure: ${blobName}`);
      const blobServiceClient = await this.getBlobServiceClient();
      const containerClient = blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(imageBuffer, imageBuffer.length, {
        blobHTTPHeaders: {
          blobContentType: contentType,
          blobCacheControl: 'public, max-age=31536000' // Cache for 1 year
        }
      });

      const newUrl = `${this.azureBaseUrl}/${blobName}`;
      console.log(`✅ Successfully uploaded image: ${newUrl}`);
      
      return newUrl;
    } catch (error) {
      console.error(`❌ Failed to migrate image ${imageUrl}:`, error);
      return null;
    }
  }

  /**
   * Extract file extension from URL or content type
   */
  private static getFileExtension(url: string, contentType: string): string {
    // Try to get extension from URL
    const urlPath = new URL(url).pathname;
    const urlExtension = path.extname(urlPath).toLowerCase();
    
    if (urlExtension && urlExtension !== '.') {
      return urlExtension.substring(1); // Remove the dot
    }

    // Fallback to content type
    const contentTypeMap: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/gif': 'gif',
      'image/webp': 'webp',
      'image/svg+xml': 'svg',
      'image/bmp': 'bmp'
    };

    return contentTypeMap[contentType] || 'jpg';
  }

  /**
   * Process a single image URL (for illustrationUrl fields)
   */
  static async processSingleImage(imageUrl: string): Promise<string | null> {
    if (!this.shouldMigrateImage(imageUrl)) {
      return imageUrl; // Return original if no migration needed
    }

    return await this.migrateImageToAzure(imageUrl);
  }
} 