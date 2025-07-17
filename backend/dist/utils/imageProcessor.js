"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProcessor = void 0;
var storage_blob_1 = require("@azure/storage-blob");
var node_fetch_1 = __importDefault(require("node-fetch"));
var uuid_1 = require("uuid");
var path_1 = __importDefault(require("path"));
class ImageProcessor {
    /**
     * Initialize Azure Blob Storage client
     */
    static async getBlobServiceClient() {
        if (!this.blobServiceClient) {
            var connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
            if (!connectionString) {
                throw new Error('AZURE_STORAGE_CONNECTION_STRING environment variable is required');
            }
            this.blobServiceClient = storage_blob_1.BlobServiceClient.fromConnectionString(connectionString);
        }
        return this.blobServiceClient;
    }
    /**
     * Process markdown content and migrate all images to Azure Blob Storage
     */
    static async processMarkdownImages(markdownContent) {
        console.log('🖼️ Starting image processing for markdown content...');
        var migratedImages = [];
        let processedContent = markdownContent;
        // Find all image references in markdown
        var imagePatterns = [
            // Markdown images: ![alt](url)
            /!\[([^\]]*)\]\(([^)]+)\)/g,
            // HTML images: <img src="url" ...>
            /<img[^>]+src=["']([^"']+)["'][^>]*>/g
        ];
        for (var pattern of imagePatterns) {
            let match;
            while ((match = pattern.exec(markdownContent)) !== null) {
                var originalUrl = match[2] || match[1]; // For markdown: match[2], for HTML: match[1]
                if (this.shouldMigrateImage(originalUrl)) {
                    try {
                        console.log(`📥 Processing image: ${originalUrl}`);
                        var newUrl = await this.migrateImageToAzure(originalUrl);
                        if (newUrl) {
                            // Replace the URL in the content
                            if (pattern.source.includes('!\\[')) {
                                // Markdown image: ![alt](old_url) -> ![alt](new_url)
                                processedContent = processedContent.replace(`![${match[1]}](${originalUrl})`, `![${match[1]}](${newUrl})`);
                            }
                            else {
                                // HTML image: <img src="old_url" ...> -> <img src="new_url" ...>
                                processedContent = processedContent.replace(`src="${originalUrl}"`, `src="${newUrl}"`);
                            }
                            migratedImages.push(newUrl);
                            console.log(`✅ Migrated image: ${originalUrl} -> ${newUrl}`);
                        }
                    }
                    catch (error) {
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
    static shouldMigrateImage(url) {
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
    static async migrateImageToAzure(imageUrl) {
        try {
            // Download the image
            console.log(`📥 Downloading image from: ${imageUrl}`);
            var response = await (0, node_fetch_1.default)(imageUrl);
            if (!response.ok) {
                throw new Error(`Failed to download image: ${response.status} ${response.statusText}`);
            }
            var imageBuffer = await response.buffer();
            var contentType = response.headers.get('content-type') || 'image/jpeg';
            // Generate unique filename
            var fileExtension = this.getFileExtension(imageUrl, contentType);
            var fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
            var blobName = `image/${fileName}`;
            // Upload to Azure Blob Storage
            console.log(`📤 Uploading image to Azure: ${blobName}`);
            var blobServiceClient = await this.getBlobServiceClient();
            var containerClient = blobServiceClient.getContainerClient(this.containerName);
            var blockBlobClient = containerClient.getBlockBlobClient(blobName);
            await blockBlobClient.upload(imageBuffer, imageBuffer.length, {
                blobHTTPHeaders: {
                    blobContentType: contentType,
                    blobCacheControl: 'public, max-age=31536000' // Cache for 1 year
                }
            });
            var newUrl = `${this.azureBaseUrl}/${blobName}`;
            console.log(`✅ Successfully uploaded image: ${newUrl}`);
            return newUrl;
        }
        catch (error) {
            console.error(`❌ Failed to migrate image ${imageUrl}:`, error);
            return null;
        }
    }
    /**
     * Extract file extension from URL or content type
     */
    static getFileExtension(url, contentType) {
        // Try to get extension from URL
        var urlPath = new URL(url).pathname;
        var urlExtension = path_1.default.extname(urlPath).toLowerCase();
        if (urlExtension && urlExtension !== '.') {
            return urlExtension.substring(1); // Remove the dot
        }
        // Fallback to content type
        var contentTypeMap = {
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
    static async processSingleImage(imageUrl) {
        if (!this.shouldMigrateImage(imageUrl)) {
            return imageUrl; // Return original if no migration needed
        }
        return await this.migrateImageToAzure(imageUrl);
    }
}
exports.ImageProcessor = ImageProcessor;
ImageProcessor.containerName = 'aino-media';
ImageProcessor.azureBaseUrl = 'https://ainomedia.blob.core.windows.net/aino-media';
