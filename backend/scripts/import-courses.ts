#!/usr/bin/env tsx

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq } from 'drizzle-orm';
import * as path from 'path';
import * as fs from 'fs';
import { MarkdownCourseParser } from '../utils/parser';
import { courses, nano, unit } from '../drizzle/schema';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});

const db = drizzle(pool);

async function importCourses() {
  console.log('🚀 Starting course import...');
  
  try {
    // Check if data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      console.log('📁 Creating data directory...');
      fs.mkdirSync(dataDir, { recursive: true });
      console.log('✅ Data directory created. Please add .md files to /data/');
      return;
    }
    
    // Parse all markdown files
    console.log('📖 Parsing markdown files...');
    const parsedCourses = MarkdownCourseParser.parseDirectory(dataDir);
    
    if (parsedCourses.length === 0) {
      console.log('⚠️ No markdown files found in /data/');
      console.log('💡 Add some .md files to get started');
      return;
    }
    
    console.log(`📊 Found ${parsedCourses.length} courses to import`);
    
    // Import each course
    for (const parsedCourse of parsedCourses) {
      await importCourse(parsedCourse);
    }
    
    console.log('✅ Course import completed successfully!');
    
  } catch (error) {
    console.error('❌ Import failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

async function importCourse(parsedCourse: any) {
  console.log(`\n📚 Importing course: ${parsedCourse.title}`);
  
  try {
    // Check if course already exists
    const existingCourse = await db.select().from(courses).where(eq(courses.slug, parsedCourse.slug));
    
    if (existingCourse.length > 0) {
      console.log(`⚠️ Course "${parsedCourse.title}" already exists, skipping...`);
      return;
    }
    
    // Insert course
    const [insertedCourse] = await db.insert(courses).values({
      slug: parsedCourse.slug,
      title: parsedCourse.title,
      category: parsedCourse.metadata.category,
      location: parsedCourse.metadata.location,
      targetUser: parsedCourse.metadata.targetUser,
      language: parsedCourse.metadata.language,
      author: parsedCourse.metadata.author,
      revisionInterval: parsedCourse.metadata.revisionInterval,
      keywords: parsedCourse.metadata.keywords,
      imageUrl: parsedCourse.metadata.imageUrl,
      metadata: parsedCourse.metadata
    }).returning();
    
    console.log(`✅ Course inserted: ${insertedCourse.id}`);
    
    // Insert nano and units
    for (const parsedNano of parsedCourse.nano) {
      const [insertedNano] = await db.insert(nano).values({
        courseId: insertedCourse.id,
        title: parsedNano.title,
        order: parsedNano.order
      }).returning();
      
      console.log(`  📖 Nano inserted: ${parsedNano.title}`);
      
      // Insert units for this nano
      for (const parsedUnit of parsedNano.units) {
        await db.insert(unit).values({
          nanoId: insertedNano.id,
          title: parsedUnit.title,
          body: parsedUnit.body,
          illustrationUrl: parsedUnit.illustrationUrl,
          order: parsedUnit.order
        });
        
        console.log(`    📝 Unit inserted: ${parsedUnit.title}`);
      }
    }
    
    console.log(`✅ Course "${parsedCourse.title}" imported successfully!`);
    
  } catch (error) {
    console.error(`❌ Failed to import course "${parsedCourse.title}":`, error);
    throw error;
  }
}

// Create sample markdown file if none exists
function createSampleMarkdown() {
  const samplePath = path.join(process.cwd(), 'data', 'sample-course.md');
  
  if (!fs.existsSync(samplePath)) {
    const sampleContent = `//: {
  "category": "Ernæring",
  "location": "Institusjon",
  "targetUser": "Pleieassistenter",
  "language": "nb-NO",
  "author": "Aino Team",
  "revisionInterval": "12",
  "keywords": ["ernæring", "pleie", "institusjon"],
  "imageUrl": "/images/ernæring.jpg"
}

# Grunnleggende Ernæring for Pleieassistenter

## Kapittel 1: Ernæringsbehov

### Hva er ernæring?
https://example.com/ernæring.jpg
Dette er en introduksjon til ernæring og hvorfor det er viktig.

**Viktige punkter:**
- Ernæring er kroppens drivstoff
- Alle trenger riktig ernæring
- Spesielt viktig for eldre

### Ernæringsgrupper
https://example.com/grupper.jpg
Kroppen trenger ulike typer næringsstoffer:

1. **Karbohydrater** - Energi
2. **Protein** - Muskler og vev
3. **Fett** - Hormoner og vitaminer
4. **Vitaminer og mineraler** - Immunforsvar

## Kapittel 2: Praktisk Anvendelse

### Måltidsplanlegging
https://example.com/måltid.jpg
Slik planlegger du måltider for brukere:

- Vurder individuelle behov
- Inkluder alle næringsgrupper
- Ta hensyn til preferanser
- Sørg for variasjon

### Spesielle Ernæringsbehov
https://example.com/spesial.jpg
Noen brukere har spesielle behov:

**Diabetes:**
- Kontrollert karbohydratinntak
- Regelmessige måltider
- Blodsukkerovervåking

**Hjerteproblemer:**
- Lavt saltinnhold
- Mager protein
- Hjertevennlige fett
`;
    
    fs.writeFileSync(samplePath, sampleContent);
    console.log('📝 Sample markdown file created: /data/sample-course.md');
  }
}

// Main execution
if (require.main === module) {
  createSampleMarkdown();
  importCourses();
} 