// Test script for ImageUrlConverter
const fs = require('fs');

// Mock ImageUrlConverter class for testing
class ImageUrlConverter {
  static readonly AZURE_BASE_URL = 'https://ainomedia.blob.core.windows.net/aino-media';
  
  static convertImageUrl(imageUrl) {
    if (!imageUrl) return imageUrl;
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // If it's already an Azure URL, return as is
    if (imageUrl.includes('ainomedia.blob.core.windows.net')) {
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
  
  static convertMarkdownImages(markdownContent) {
    if (!markdownContent) return markdownContent;
    
    // Convert ![alt](url) syntax
    return markdownContent.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (match, alt, url) => {
        const newUrl = this.convertImageUrl(url);
        return `![${alt}](${newUrl})`;
      }
    );
  }
  
  static convertHtmlContent(htmlContent) {
    if (!htmlContent) return htmlContent;
    
    // Convert img src attributes
    let converted = htmlContent.replace(
      /<img[^>]+src=["']([^"']+)["'][^>]*>/gi,
      (match, src) => {
        const newSrc = this.convertImageUrl(src);
        return match.replace(src, newSrc);
      }
    );
    
    // Convert background-image in style attributes
    converted = converted.replace(
      /background-image:\s*url\(['"]?([^'")\s]+)['"]?\)/gi,
      (match, url) => {
        const newUrl = this.convertImageUrl(url);
        return `background-image: url('${newUrl}')`;
      }
    );
    
    return converted;
  }
}

// Test cases
const testCases = [
  {
    name: "Lokal bilde-referanse",
    input: "![Test bilde](./img/test-bilde.png)",
    expected: "![Test bilde](https://ainomedia.blob.core.windows.net/aino-media/img/test-bilde.png)"
  },
  {
    name: "Gammel Skillaid-referanse",
    input: "![Skillaid bilde](img/skillaid-bilde.jpg)",
    expected: "![Skillaid bilde](https://ainomedia.blob.core.windows.net/aino-media/img/skillaid-bilde.jpg)"
  },
  {
    name: "Relativ sti",
    input: "![Relativt bilde](../images/relativt-bilde.png)",
    expected: "![Relativt bilde](https://ainomedia.blob.core.windows.net/aino-media/images/relativt-bilde.png)"
  },
  {
    name: "Eksisterende Azure URL",
    input: "![Azure bilde](https://ainomedia.blob.core.windows.net/aino-media/azure-bilde.png)",
    expected: "![Azure bilde](https://ainomedia.blob.core.windows.net/aino-media/azure-bilde.png)"
  },
  {
    name: "Fullstendig URL",
    input: "![Fullstendig bilde](https://example.com/bilde.png)",
    expected: "![Fullstendig bilde](https://example.com/bilde.png)"
  },
  {
    name: "HTML img tag",
    input: '<img src="./img/html-bilde.png" alt="HTML bilde" width="300" height="200">',
    expected: '<img src="https://ainomedia.blob.core.windows.net/aino-media/img/html-bilde.png" alt="HTML bilde" width="300" height="200">'
  },
  {
    name: "Background image",
    input: '<div style="background-image: url(\'./img/background-bilde.jpg\'); height: 200px;">',
    expected: '<div style="background-image: url(\'https://ainomedia.blob.core.windows.net/aino-media/img/background-bilde.jpg\'); height: 200px;">'
  }
];

// Run tests
console.log('🧪 Testing ImageUrlConverter...\n');

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: ${testCase.name}`);
  
  let result;
  if (testCase.input.includes('![')) {
    // Markdown image test
    result = ImageUrlConverter.convertMarkdownImages(testCase.input);
  } else {
    // HTML test
    result = ImageUrlConverter.convertHtmlContent(testCase.input);
  }
  
  const passed = result === testCase.expected;
  console.log(`Input:  ${testCase.input}`);
  console.log(`Output: ${result}`);
  console.log(`Expected: ${testCase.expected}`);
  console.log(`Status: ${passed ? '✅ PASS' : '❌ FAIL'}\n`);
});

// Test with actual markdown file
console.log('📖 Testing with actual markdown file...\n');
try {
  const markdownContent = fs.readFileSync('../test-image-conversion.md', 'utf-8');
  const convertedMarkdown = ImageUrlConverter.convertMarkdownImages(markdownContent);
  
  console.log('Original markdown:');
  console.log(markdownContent.substring(0, 500) + '...\n');
  
  console.log('Converted markdown:');
  console.log(convertedMarkdown.substring(0, 500) + '...\n');
} catch (error) {
  console.log('⚠️ Could not read test markdown file:', error.message);
}

console.log('✅ Image URL conversion test completed!'); 