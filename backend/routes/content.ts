import express, { Request, Response } from "express";
import { db } from "../drizzle/db";
import { courses, nano, unit } from "../drizzle/schema";
import { MarkdownCourseParser, ParsedCourse } from "../utils/parser";
import { marked } from 'marked';
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/content - Get all content (for backward compatibility)
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("✅ Backend: GET /api/content");
    const result = await db.select().from(courses).orderBy(courses.createdAt);
    console.log("✅ Found content items:", result.length);
    res.json(result);
  } catch (err) {
    console.error("🔥 Backend ERROR GET /api/content:", err);
    res.status(500).json({ error: "Noe gikk galt ved henting av innhold" });
  }
});

// POST /api/content - Create new course content from WriterTab
router.post("/", async (req: Request, res: Response) => {
  const { 
    title, 
    category, 
    location, 
    targetUser, 
    language, 
    author, 
    revisionInterval, 
    markdown,
    content // For backward compatibility
  } = req.body;

  const markdownContent = markdown || content;

  if (!title || !markdownContent) {
    return res.status(400).json({ error: "Tittel og markdown er påkrevd" });
  }

  try {
    console.log("✅ Backend: POST /api/content - creating course:", { 
      title, 
      category, 
      location, 
      targetUser 
    });
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/æ/g, 'ae')
      .replace(/ø/g, 'oe')
      .replace(/å/g, 'aa')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // Create course record
    const courseResult = await db.insert(courses).values({
      slug,
      title,
      category: category || '',
      location: location || '',
      targetUser: targetUser || '',
      language: language || 'nb-NO',
      author: author || 'Open Course',
      revisionInterval: revisionInterval || '12',
      keywords: [],
      metadata: {}
    }).returning();

    const courseId = courseResult[0].id;
    console.log("✅ Course created with ID:", courseId);

    // Parse markdown to extract nano and units
    const parsedCourse = parseMarkdownToStructuredData(markdownContent, title);
    
    // Insert nano records
    for (const nanoItem of parsedCourse.nano) {
      const nanoResult = await db.insert(nano).values({
        courseId,
        title: nanoItem.title,
        order: nanoItem.order
      }).returning();

      const nanoId = nanoResult[0].id;
      console.log("✅ Nano created:", nanoItem.title, "ID:", nanoId);

      // Insert unit records for this nano
      for (const unitItem of nanoItem.units) {
        await db.insert(unit).values({
          nanoId,
          title: unitItem.title,
          body: unitItem.body,
          illustrationUrl: unitItem.illustrationUrl,
          order: unitItem.order
        });
        console.log("✅ Unit created:", unitItem.title);
      }
    }

    console.log("✅ Course content saved successfully:", courseId);
    res.status(201).json({ 
      id: courseId,
      slug,
      message: "Kurs lagret successfully" 
    });
  } catch (err) {
    console.error("🔥 Backend ERROR POST /api/content:", err);
    res.status(500).json({ error: "Noe gikk galt ved lagring av kurs" });
  }
});

// DELETE /api/content/:id - Delete course and all related content
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "Ugyldig ID" });
    }

    console.log("✅ Backend: DELETE /api/content/:id - deleting:", id);
    
    // Delete course (cascade will handle nano and unit)
    const result = await db.delete(courses).where(eq(courses.id, id)).returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Kurs ikke funnet" });
    }

    console.log("✅ Course deleted successfully:", id);
    res.json({ success: true, deleted: result[0] });
  } catch (err) {
    console.error("🔥 Backend ERROR DELETE /api/content/:id:", err);
    res.status(500).json({ error: "Noe gikk galt ved sletting av kurs" });
  }
});

// Helper function to parse markdown to structured data
function parseMarkdownToStructuredData(markdown: string, courseTitle: string): ParsedCourse {
  const lines = markdown.split('\n');
  const nano: any[] = [];
  let currentNano: any = null;
  let currentUnit: any = null;
  let unitContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for nano heading (##)
    const nanoMatch = line.match(/^##\s+(.+)$/);
    if (nanoMatch) {
      // Save previous unit if exists
      if (currentUnit && currentNano) {
        currentUnit.body = convertMarkdownToHtml(unitContent.join('\n'));
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
        currentUnit.body = convertMarkdownToHtml(unitContent.join('\n'));
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
    currentUnit.body = convertMarkdownToHtml(unitContent.join('\n'));
    currentNano.units.push(currentUnit);
  }
  
  if (currentNano) {
    nano.push(currentNano);
  }
  
  return {
    metadata: {
      category: '',
      location: '',
      targetUser: '',
      language: 'nb-NO',
      author: '',
      revisionInterval: '12',
      keywords: []
    },
    title: courseTitle,
    slug: '',
    nano
  };
}

// Helper function to convert markdown to HTML
function convertMarkdownToHtml(markdown: string): string {
  if (!markdown.trim()) return '';
  
  try {
    // Configure marked to return synchronous output
    marked.setOptions({ async: false });
    return marked.parse(markdown.trim()) as string;
  } catch (error) {
    console.error('❌ Error converting markdown to HTML:', error);
    return markdown; // Return original if conversion fails
  }
}

export default router;