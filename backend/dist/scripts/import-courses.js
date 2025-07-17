#!/usr/bin/env tsx
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
var node_postgres_1 = require("drizzle-orm/node-postgres");
var pg_1 = require("pg");
var drizzle_orm_1 = require("drizzle-orm");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var parser_1 = require("../utils/parser");
var schema_1 = require("../drizzle/schema");
var imageProcessor_1 = require("../utils/imageProcessor");
// Database connection
var pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});
var db = (0, node_postgres_1.drizzle)(pool);
async function importCourses() {
    console.log('🚀 Starting course import...');
    try {
        // Check if data directory exists
        var dataDir = path.join(process.cwd(), 'data');
        if (!fs.existsSync(dataDir)) {
            console.log('📁 Creating data directory...');
            fs.mkdirSync(dataDir, { recursive: true });
            console.log('✅ Data directory created. Please add .md files to /data/');
            return;
        }
        // Parse all markdown files
        console.log('📖 Parsing markdown files...');
        var parsedCourses = parser_1.MarkdownCourseParser.parseDirectory(dataDir);
        if (parsedCourses.length === 0) {
            console.log('⚠️ No markdown files found in /data/');
            console.log('💡 Add some .md files to get started');
            return;
        }
        console.log(`📊 Found ${parsedCourses.length} courses to import`);
        // Import each course
        for (var parsedCourse of parsedCourses) {
            await importCourse(parsedCourse);
        }
        console.log('✅ Course import completed successfully!');
    }
    catch (error) {
        console.error('❌ Import failed:', error);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
}
async function importCourse(parsedCourse) {
    console.log(`\n📚 Importing course: ${parsedCourse.title}`);
    try {
        // Check if course already exists
        var existingCourse = await db.select().from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.slug, parsedCourse.slug));
        if (existingCourse.length > 0) {
            console.log(`⚠️ Course "${parsedCourse.title}" already exists, skipping...`);
            return;
        }
        // Insert course
        var [insertedCourse] = await db.insert(schema_1.courses).values({
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
        for (var parsedNano of parsedCourse.nano) {
            var [insertedNano] = await db.insert(schema_1.nano).values({
                courseId: insertedCourse.id,
                title: parsedNano.title,
                order: parsedNano.order
            }).returning();
            console.log(`  📖 Nano inserted: ${parsedNano.title}`);
            // Insert units for this nano
            for (var parsedUnit of parsedNano.units) {
                // Process illustrationUrl if it exists
                let processedIllustrationUrl = parsedUnit.illustrationUrl;
                if (parsedUnit.illustrationUrl) {
                    console.log(`    🖼️ Processing illustration URL: ${parsedUnit.illustrationUrl}`);
                    processedIllustrationUrl = await imageProcessor_1.ImageProcessor.processSingleImage(parsedUnit.illustrationUrl) || parsedUnit.illustrationUrl;
                }
                // Process images in unit body
                let processedBody = parsedUnit.body;
                if (parsedUnit.body) {
                    console.log(`    🖼️ Processing images in unit body: ${parsedUnit.title}`);
                    var { processedContent } = await imageProcessor_1.ImageProcessor.processMarkdownImages(parsedUnit.body);
                    processedBody = processedContent;
                }
                await db.insert(schema_1.unit).values({
                    nanoId: insertedNano.id,
                    title: parsedUnit.title,
                    body: processedBody,
                    illustrationUrl: processedIllustrationUrl,
                    order: parsedUnit.order
                });
                console.log(`    📝 Unit inserted: ${parsedUnit.title}`);
            }
        }
        console.log(`✅ Course "${parsedCourse.title}" imported successfully!`);
    }
    catch (error) {
        console.error(`❌ Error importing course "${parsedCourse.title}":`, error);
    }
}
// Create sample markdown file if none exists
function createSampleMarkdown() {
    var samplePath = path.join(process.cwd(), 'data', 'sample-course.md');
    if (!fs.existsSync(samplePath)) {
        var sampleContent = `//: {
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
