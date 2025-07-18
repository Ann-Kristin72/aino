"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownCourseParser = void 0;
const marked_1 = require("marked");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const imageUrlConverter_1 = require("./imageUrlConverter");
class MarkdownCourseParser {
    /**
     * Parse a markdown course file to structured data
     */
    static parseMarkdownToCourse(filePath) {
        console.log(`📖 Parsing course file: ${filePath}`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        // Extract metadata from //:-block
        const metadata = this.extractMetadata(content);
        // Extract course title from first # heading
        const title = this.extractTitle(lines);
        // Generate slug from title
        const slug = this.generateSlug(title);
        // Parse nano and units
        const nano = this.parseNanoAndUnits(lines);
        return {
            metadata,
            title,
            slug,
            nano
        };
    }
    /**
     * Extract metadata from //:-block
     */
    static extractMetadata(content) {
        const metadataMatch = content.match(/\/\/:\s*(\{[\s\S]*?\})\s*\n/);
        if (!metadataMatch) {
            console.warn('⚠️ No metadata block found, using defaults');
            return {
                category: '',
                location: '',
                targetUser: '',
                language: 'nb-NO',
                author: '',
                revisionInterval: '12',
                keywords: []
            };
        }
        try {
            const metadataJson = metadataMatch[1];
            const metadata = JSON.parse(metadataJson);
            // Ensure required fields have defaults
            return {
                category: metadata.category || '',
                location: metadata.location || '',
                targetUser: metadata.targetUser || '',
                language: metadata.language || 'nb-NO',
                author: metadata.author || '',
                revisionInterval: metadata.revisionInterval || '12',
                keywords: metadata.keywords || [],
                imageUrl: metadata.imageUrl,
                ...metadata // Include any additional metadata
            };
        }
        catch (error) {
            console.error('❌ Error parsing metadata:', error);
            throw new Error(`Failed to parse metadata: ${error}`);
        }
    }
    /**
     * Extract course title from first # heading
     */
    static extractTitle(lines) {
        for (const line of lines) {
            const titleMatch = line.match(/^#\s+(.+)$/);
            if (titleMatch) {
                return titleMatch[1].trim();
            }
        }
        throw new Error('No course title found (missing # heading)');
    }
    /**
     * Generate kebab-case slug from title
     */
    static generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'oe')
            .replace(/å/g, 'aa')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }
    /**
     * Parse nano (##) and units (###) from markdown
     */
    static parseNanoAndUnits(lines) {
        const nano = [];
        let currentNano = null;
        let currentUnit = null;
        let unitContent = [];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            // Check for nano heading (##)
            const nanoMatch = line.match(/^##\s+(.+)$/);
            if (nanoMatch) {
                // Save previous unit if exists
                if (currentUnit && currentNano) {
                    currentUnit.body = this.convertMarkdownToHtml(unitContent.join('\n'));
                    currentNano.units.push(currentUnit);
                }
                // Save previous nano if exists
                if (currentNano) {
                    nano.push(currentNano);
                }
                // Start new nano
                currentNano = {
                    title: nanoMatch[1].trim(),
                    order: nano.length + 1,
                    units: []
                };
                currentUnit = null;
                unitContent = [];
                continue;
            }
            // Check for unit heading (###)
            const unitMatch = line.match(/^###\s+(.+)$/);
            if (unitMatch && currentNano) {
                // Save previous unit if exists
                if (currentUnit) {
                    currentUnit.body = this.convertMarkdownToHtml(unitContent.join('\n'));
                    currentNano.units.push(currentUnit);
                }
                // Start new unit
                currentUnit = {
                    title: unitMatch[1].trim(),
                    order: currentNano.units.length + 1,
                    body: ''
                };
                unitContent = [];
                // Check next line for illustration URL
                if (i + 1 < lines.length) {
                    const nextLine = lines[i + 1].trim();
                    if (nextLine && !nextLine.startsWith('#') && !nextLine.startsWith('//')) {
                        currentUnit.illustrationUrl = nextLine;
                        i++; // Skip the illustration URL line
                    }
                }
                continue;
            }
            // Collect content for current unit
            if (currentUnit && !line.startsWith('//')) {
                unitContent.push(line);
            }
        }
        // Save final unit and nano
        if (currentUnit && currentNano) {
            currentUnit.body = this.convertMarkdownToHtml(unitContent.join('\n'));
            currentNano.units.push(currentUnit);
        }
        if (currentNano) {
            nano.push(currentNano);
        }
        return nano;
    }
    /**
     * Convert markdown to HTML using marked
     */
    static convertMarkdownToHtml(markdown) {
        if (!markdown.trim())
            return '';
        try {
            // First convert markdown image URLs to Azure URLs
            const convertedMarkdown = imageUrlConverter_1.ImageUrlConverter.convertMarkdownImages(markdown.trim());
            // Then convert to HTML
            const html = (0, marked_1.marked)(convertedMarkdown);
            // Handle both synchronous and asynchronous marked output
            if (typeof html === 'string') {
                // Finally convert any remaining image URLs in the HTML
                return imageUrlConverter_1.ImageUrlConverter.convertHtmlContent(html);
            }
            else {
                // If marked returns a Promise, we need to handle it differently
                // For now, return the original markdown and log a warning
                console.warn('⚠️ Marked returned a Promise, using original markdown');
                return markdown;
            }
        }
        catch (error) {
            console.error('❌ Error converting markdown to HTML:', error);
            return markdown; // Return original if conversion fails
        }
    }
    /**
     * Parse all markdown files in a directory
     */
    static parseDirectory(dirPath) {
        const courses = [];
        if (!fs.existsSync(dirPath)) {
            console.warn(`⚠️ Directory not found: ${dirPath}`);
            return courses;
        }
        const files = fs.readdirSync(dirPath, { recursive: true });
        for (const file of files) {
            if (typeof file === 'string' && file.endsWith('.md')) {
                const filePath = path.join(dirPath, file);
                try {
                    const course = this.parseMarkdownToCourse(filePath);
                    courses.push(course);
                    console.log(`✅ Parsed: ${course.title}`);
                }
                catch (error) {
                    console.error(`❌ Failed to parse ${file}:`, error);
                }
            }
        }
        return courses;
    }
}
exports.MarkdownCourseParser = MarkdownCourseParser;
