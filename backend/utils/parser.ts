import { marked } from 'marked';
import * as fs from 'fs';
import * as path from 'path';
import { ImageUrlConverter } from './imageUrlConverter';

// TypeScript interfaces for parsed data
export interface ParsedCourse {
  metadata: CourseMetadata;
  title: string;
  slug: string;
  nano: ParsedNano[];
}

export interface CourseMetadata {
  category: string;
  location: string;
  targetUser: string;
  language: string;
  author: string;
  revisionInterval: string;
  keywords: string[];
  imageUrl?: string;
  [key: string]: any; // For additional metadata
}

export interface ParsedNano {
  title: string;
  order: number;
  units: ParsedUnit[];
}

export interface ParsedUnit {
  title: string;
  body: string; // HTML
  illustrationUrl?: string;
  order: number;
}

export class MarkdownCourseParser {
  
  /**
   * Parse a markdown course file to structured data
   */
  static parseMarkdownToCourse(filePath: string): ParsedCourse {
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
  private static extractMetadata(content: string): CourseMetadata {
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
    } catch (error) {
      console.error('❌ Error parsing metadata:', error);
      throw new Error(`Failed to parse metadata: ${error}`);
    }
  }
  
  /**
   * Extract course title from first # heading
   */
  private static extractTitle(lines: string[]): string {
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
  private static generateSlug(title: string): string {
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
  private static parseNanoAndUnits(lines: string[]): ParsedNano[] {
    const nano: ParsedNano[] = [];
    let currentNano: ParsedNano | null = null;
    let currentUnit: ParsedUnit | null = null;
    let unitContent: string[] = [];
    
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
  private static convertMarkdownToHtml(markdown: string): string {
    if (!markdown.trim()) return '';
    
    try {
      // First convert markdown image URLs to Azure URLs
      const convertedMarkdown = ImageUrlConverter.convertMarkdownImages(markdown.trim());
      
      // Then convert to HTML
      const html = marked(convertedMarkdown);
      
      // Handle both synchronous and asynchronous marked output
      if (typeof html === 'string') {
        // Finally convert any remaining image URLs in the HTML
        return ImageUrlConverter.convertHtmlContent(html);
      } else {
        // If marked returns a Promise, we need to handle it differently
        // For now, return the original markdown and log a warning
        console.warn('⚠️ Marked returned a Promise, using original markdown');
        return markdown;
      }
    } catch (error) {
      console.error('❌ Error converting markdown to HTML:', error);
      return markdown; // Return original if conversion fails
    }
  }
  
  /**
   * Parse all markdown files in a directory
   */
  static parseDirectory(dirPath: string): ParsedCourse[] {
    const courses: ParsedCourse[] = [];
    
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
        } catch (error) {
          console.error(`❌ Failed to parse ${file}:`, error);
        }
      }
    }
    
    return courses;
  }
} 