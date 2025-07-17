"use strict";
/**
 * Image URL Converter for Azure Blob Storage
 * Converts local image references to Azure Blob Storage URLs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUrlConverter = void 0;
class ImageUrlConverter {
    /**
     * Convert local image URLs in HTML content to Azure Blob Storage URLs
     */
    static convertHtmlContent(htmlContent) {
        if (!htmlContent)
            return htmlContent;
        // Convert img src attributes
        let converted = htmlContent.replace(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi, (match, src) => {
            var newSrc = this.convertImageUrl(src);
            return match.replace(src, newSrc);
        });
        // Convert background-image in style attributes
        converted = converted.replace(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi, (match, url) => {
            var newUrl = this.convertImageUrl(url);
            return `background-image: url('${newUrl}')`;
        });
        return converted;
    }
    /**
     * Convert a single image URL to Azure Blob Storage URL
     */
    static convertImageUrl(imageUrl) {
        if (!imageUrl)
            return imageUrl;
        // Convert old Skillaid URLs to new Azure URLs
        if (imageUrl.includes('skillaidmedia.blob.core.windows.net')) {
            // Extract the image path from the old URL
            var urlParts = imageUrl.split('/');
            var imagePath = urlParts.slice(-2).join('/'); // Get the last two parts (media/image/filename)
            return `${this.AZURE_BASE_URL}/${imagePath}`;
        }
        // Convert old Skillaid CDN URLs
        if (imageUrl.includes('skillaid-cdn.azureedge.net')) {
            // Extract the image path from the old CDN URL
            var urlParts = imageUrl.split('/');
            var imagePath = urlParts.slice(-2).join('/'); // Get the last two parts (media/image/filename)
            return `${this.AZURE_BASE_URL}/${imagePath}`;
        }
        // If it's already the new Azure URL, return as is
        if (imageUrl.includes('ainomedia.blob.core.windows.net')) {
            return imageUrl;
        }
        // If it's already a full URL (but not Skillaid), return as is
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        // Clean up the URL
        let cleanUrl = imageUrl;
        // Remove leading ./ or / if present
        cleanUrl = cleanUrl.replace(/^\.?\//, '');
        // Handle relative paths (../) - remove the .. but keep the rest
        cleanUrl = cleanUrl.replace(/^\.\.\//, '');
        // Don't remove img/ prefix - keep the directory structure
        // cleanUrl = cleanUrl.replace(/^img\//, '');
        // If it's a relative path, convert to Azure URL
        if (cleanUrl && !cleanUrl.startsWith('http')) {
            return `${this.AZURE_BASE_URL}/${cleanUrl}`;
        }
        return imageUrl;
    }
    /**
     * Convert markdown image syntax to Azure URLs
     */
    static convertMarkdownImages(markdownContent) {
        if (!markdownContent)
            return markdownContent;
        // Convert ![alt](url) syntax
        return markdownContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
            var newUrl = this.convertImageUrl(url);
            return `![${alt}](${newUrl})`;
        });
    }
    /**
     * Check if an image URL is accessible (basic validation)
     */
    static async validateImageUrl(url) {
        try {
            var response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        }
        catch (error) {
            console.warn(`⚠️ Image URL validation failed for ${url}:`, error);
            return false;
        }
    }
    /**
     * Get all image URLs from HTML content
     */
    static extractImageUrls(htmlContent) {
        var urls = [];
        // Extract img src attributes
        var imgMatches = htmlContent.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
        if (imgMatches) {
            imgMatches.forEach(match => {
                var srcMatch = match.match(/src=["']([^"']+)["']/i);
                if (srcMatch) {
                    urls.push(srcMatch[1]);
                }
            });
        }
        // Extract background-image URLs
        var bgMatches = htmlContent.match(/background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi);
        if (bgMatches) {
            bgMatches.forEach(match => {
                var urlMatch = match.match(/url\(['"]?([^'")\s]+)['"]?\)/i);
                if (urlMatch) {
                    urls.push(urlMatch[1]);
                }
            });
        }
        return urls;
    }
}
exports.ImageUrlConverter = ImageUrlConverter;
ImageUrlConverter.AZURE_BASE_URL = 'https://ainomedia.blob.core.windows.net/aino-media';
