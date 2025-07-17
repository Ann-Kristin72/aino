"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("../drizzle/db");
var schema_1 = require("../drizzle/schema");
var imageUrlConverter_1 = require("../utils/imageUrlConverter");
var imageProcessor_1 = require("../utils/imageProcessor");
var marked_1 = require("marked");
var drizzle_orm_1 = require("drizzle-orm");
var router = express_1.default.Router();
// GET /api/content - Get all content (for backward compatibility)
router.get("/", async function(req, res) {
    try {
        console.log("✅ Backend: GET /api/content");
        var result = await db_1.db.select().from(schema_1.courses).orderBy(schema_1.courses.createdAt);
        console.log("✅ Found content items:", result.length);
        res.json(result);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/content:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av innhold" });
    }
});
// GET /api/content/:slug - Get specific course by slug
router.get("/slug/:slug", async function(req, res) {
    try {
        var slug = req.params.slug;
        console.log("✅ Backend: GET /api/content/slug/:slug - fetching:", slug);
        var result = await db_1.db.select().from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.slug, slug));
        if (result.length === 0) {
            return res.status(404).json({ error: "Kurs ikke funnet" });
        }
        var course = result[0];
        console.log("✅ Found course:", course.title);
        // Fetch nano for this course
        var nanoResult = await db_1.db.select().from(schema_1.nano).where((0, drizzle_orm_1.eq)(schema_1.nano.courseId, course.id)).orderBy(schema_1.nano.order);
        console.log("✅ Found nano items:", nanoResult.length);
        // Fetch units for each nano and convert image URLs
        var courseWithContent = {
            Object.assign({}, course),
            nano: await Promise.all(nanoResult.map(async function(nanoItem) {
                var unitsResult = await db_1.db.select().from(schema_1.unit).where((0, drizzle_orm_1.eq)(schema_1.unit.nanoId, nanoItem.id)).orderBy(schema_1.unit.order);
                // Convert image URLs in unit content
                var unitsWithConvertedImages = unitsResult.map(unitItem => ({
                    Object.assign({}, unitItem),
                    body: imageUrlConverter_1.ImageUrlConverter.convertHtmlContent(unitItem.body),
                    illustrationUrl: unitItem.illustrationUrl ? imageUrlConverter_1.ImageUrlConverter.convertImageUrl(unitItem.illustrationUrl) : undefined
                }));
                return {
                    Object.assign({}, nanoItem),
                    units: unitsWithConvertedImages
                };
            }))
        };
        res.json(courseWithContent);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/content/slug/:slug:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av kurs" });
    }
});
// GET /api/content/id/:id - Get specific course by ID
router.get("/id/:id", async function(req, res) {
    try {
        var id = req.params.id;
        console.log("✅ Backend: GET /api/content/id/:id - fetching:", id);
        var result = await db_1.db.select().from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.id, id));
        if (result.length === 0) {
            return res.status(404).json({ error: "Kurs ikke funnet" });
        }
        var course = result[0];
        console.log("✅ Found course:", course.title);
        // Fetch nano for this course
        var nanoResult = await db_1.db.select().from(schema_1.nano).where((0, drizzle_orm_1.eq)(schema_1.nano.courseId, course.id)).orderBy(schema_1.nano.order);
        console.log("✅ Found nano items:", nanoResult.length);
        // Fetch units for each nano and convert image URLs
        var courseWithNanoAndUnits = {
            Object.assign({}, course),
            nano: await Promise.all(nanoResult.map(async function(nanoItem) {
                var unitsResult = await db_1.db.select().from(schema_1.unit).where((0, drizzle_orm_1.eq)(schema_1.unit.nanoId, nanoItem.id)).orderBy(schema_1.unit.order);
                // Convert image URLs in unit content
                var unitsWithConvertedImages = unitsResult.map(unitItem => ({
                    Object.assign({}, unitItem),
                    body: imageUrlConverter_1.ImageUrlConverter.convertHtmlContent(unitItem.body),
                    illustrationUrl: unitItem.illustrationUrl ? imageUrlConverter_1.ImageUrlConverter.convertImageUrl(unitItem.illustrationUrl) : undefined
                }));
                return {
                    Object.assign({}, nanoItem),
                    units: unitsWithConvertedImages
                };
            }))
        };
        res.json(courseWithNanoAndUnits);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/content/id/:id:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av kurs" });
    }
});
// GET /api/content/unit/:unitId - Get specific unit by ID
router.get("/unit/:unitId", async function(req, res) {
    try {
        var unitId = req.params.unitId;
        console.log("✅ Backend: GET /api/content/unit/:unitId - fetching:", unitId);
        // Fetch the unit
        var unitResult = await db_1.db.select().from(schema_1.unit).where((0, drizzle_orm_1.eq)(schema_1.unit.id, unitId));
        if (unitResult.length === 0) {
            return res.status(404).json({ error: "Enhet ikke funnet" });
        }
        var unitData = unitResult[0];
        console.log("✅ Found unit:", unitData.title);
        // Fetch the parent nano
        var nanoResult = await db_1.db.select().from(schema_1.nano).where((0, drizzle_orm_1.eq)(schema_1.nano.id, unitData.nanoId));
        if (nanoResult.length === 0) {
            return res.status(404).json({ error: "Nano ikke funnet" });
        }
        var nanoData = nanoResult[0];
        console.log("✅ Found nano:", nanoData.title);
        // Fetch the parent course
        var courseResult = await db_1.db.select().from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.id, nanoData.courseId));
        if (courseResult.length === 0) {
            return res.status(404).json({ error: "Kurs ikke funnet" });
        }
        var courseData = courseResult[0];
        console.log("✅ Found course:", courseData.title);
        // Return unit with context
        var unitWithContext = {
            unit: unitData,
            nano: nanoData,
            course: courseData
        };
        res.json(unitWithContext);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/content/unit/:unitId:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av enhet" });
    }
});
// POST /api/content - Create new course content from WriterTab
router.post("/", async function(req, res) {
    var title = req.body.title;
var category = req.body.category;
var location = req.body.location;
var targetUser = req.body.targetUser;
var language = req.body.language;
var author = req.body.author;
var revisionInterval = req.body.revisionInterval;
var markdown = req.body.markdown;
var content // For backward compatibility = req.body.content // For backward compatibility;
    var markdownContent = markdown || content;
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
        // Process images in markdown content - migrate to Azure
        console.log("🖼️ Processing images in markdown content...");
        var processedContent = await imageProcessor_1.ImageProcessor.processMarkdownImages(markdownContent).processedContent;
var migratedImages = await imageProcessor_1.ImageProcessor.processMarkdownImages(markdownContent).migratedImages;
        if (migratedImages.length > 0) {
            console.log("✅ Migrated " + migratedImages.length + " images to Azure Blob Storage");
        }
        else {
            console.log("ℹ️ No images found to migrate");
        }
        // Generate unique slug from title
        var baseSlug = title
            .toLowerCase()
            .replace(/æ/g, 'ae')
            .replace(/ø/g, 'oe')
            .replace(/å/g, 'aa')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
        // Check if slug already exists and add timestamp if needed
        var slug = baseSlug;
        var counter = 1;
        while (true) {
            var existing = await db_1.db.select().from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.slug, slug));
            if (existing.length === 0) {
                break;
            }
            slug = "" + baseSlug + "-" + counter + "";
            counter++;
        }
        // Create course record
        var courseResult = await db_1.db.insert(schema_1.courses).values({
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
        var courseId = courseResult[0].id;
        console.log("✅ Course created with ID:", courseId);
        // Parse markdown to extract nano and units (using processed content with Azure URLs)
        var parsedCourse = parseMarkdownToStructuredData(processedContent, title);
        // Insert nano records
        for (var nanoItem of parsedCourse.nano) {
            var nanoResult = await db_1.db.insert(schema_1.nano).values({
                courseId,
                title: nanoItem.title,
                order: nanoItem.order
            }).returning();
            var nanoId = nanoResult[0].id;
            console.log("✅ Nano created:", nanoItem.title, "ID:", nanoId);
            // Insert unit records for this nano
            for (var unitItem of nanoItem.units) {
                // Process illustrationUrl if it exists
                var processedIllustrationUrl = unitItem.illustrationUrl;
                if (unitItem.illustrationUrl) {
                    console.log("🖼️ Processing illustration URL: " + unitItem.illustrationUrl + "");
                    processedIllustrationUrl = await imageProcessor_1.ImageProcessor.processSingleImage(unitItem.illustrationUrl) || unitItem.illustrationUrl;
                }
                await db_1.db.insert(schema_1.unit).values({
                    nanoId,
                    title: unitItem.title,
                    body: unitItem.body,
                    illustrationUrl: processedIllustrationUrl,
                    order: unitItem.order
                });
                console.log("✅ Unit created:", unitItem.title);
            }
        }
        console.log("✅ Course content saved successfully:", courseId);
        res.status(201).json({
            id: courseId,
            slug,
            message: "Kurs lagret successfully",
            migratedImages: migratedImages.length
        });
    }
    catch (err) {
        console.error("🔥 Backend ERROR POST /api/content:", err);
        res.status(500).json({ error: "Noe gikk galt ved lagring av kurs" });
    }
});
// DELETE /api/content/:id - Delete course and all related content
router.delete("/:id", async function(req, res) {
    try {
        var id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Ugyldig ID" });
        }
        console.log("✅ Backend: DELETE /api/content/:id - deleting:", id);
        // Delete course (cascade will handle nano and unit)
        var result = await db_1.db.delete(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.id, id)).returning();
        if (result.length === 0) {
            return res.status(404).json({ error: "Kurs ikke funnet" });
        }
        console.log("✅ Course deleted successfully:", id);
        res.json({ success: true, deleted: result[0] });
    }
    catch (err) {
        console.error("🔥 Backend ERROR DELETE /api/content/:id:", err);
        res.status(500).json({ error: "Noe gikk galt ved sletting av kurs" });
    }
});
// Helper function to parse markdown to structured data
function parseMarkdownToStructuredData(markdown, courseTitle) {
    var lines = markdown.split('\n');
    var nano = [];
    var currentNano = null;
    var currentUnit = null;
    var unitContent = [];
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        // Check for nano heading (##)
        var nanoMatch = line.match(/^##\s+(.+)$/);
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
        var unitMatch = line.match(/^###\s+(.+)$/);
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
                var nextLine = lines[i + 1].trim();
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
function convertMarkdownToHtml(markdown) {
    if (!markdown.trim())
        return '';
    try {
        // Configure marked to return synchronous output
        marked_1.marked.setOptions({ async: false });
        return marked_1.marked.parse(markdown.trim());
    }
    catch (error) {
        console.error('❌ Error converting markdown to HTML:', error);
        return markdown; // Return original if conversion fails
    }
}
exports.default = router;
