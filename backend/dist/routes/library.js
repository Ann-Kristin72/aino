"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const imageUrlConverter_1 = require("../utils/imageUrlConverter");
const router = (0, express_1.Router)();
// Database connection
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});
const db = (0, node_postgres_1.drizzle)(pool);
/**
 * GET /api/library
 * Returnerer liste over alle kurs
 */
router.get('/', async (req, res) => {
    try {
        console.log('📚 Fetching all courses...');
        const allCourses = await db.select({
            id: schema_1.courses.id,
            slug: schema_1.courses.slug,
            title: schema_1.courses.title,
            category: schema_1.courses.category,
            location: schema_1.courses.location,
            targetUser: schema_1.courses.targetUser,
            language: schema_1.courses.language,
            author: schema_1.courses.author,
            imageUrl: schema_1.courses.imageUrl,
            createdAt: schema_1.courses.createdAt
        }).from(schema_1.courses);
        console.log(`✅ Found ${allCourses.length} courses`);
        res.json({
            success: true,
            data: allCourses
        });
    }
    catch (error) {
        console.error('❌ Error fetching courses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch courses'
        });
    }
});
/**
 * GET /api/library/:slug
 * Returnerer hele trestrukturen for et spesifikt kurs
 */
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        console.log(`📖 Fetching course: ${slug}`);
        // Get course details
        const courseResult = await db.select().from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.slug, slug));
        if (courseResult.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }
        const course = courseResult[0];
        // Get nano for this course
        const nanoResult = await db.select().from(schema_1.nano).where((0, drizzle_orm_1.eq)(schema_1.nano.courseId, course.id));
        // Get units for each nano and convert image URLs
        const courseWithContent = {
            ...course,
            nano: await Promise.all(nanoResult.map(async (nanoItem) => {
                const units = await db.select().from(schema_1.unit).where((0, drizzle_orm_1.eq)(schema_1.unit.nanoId, nanoItem.id));
                // Convert image URLs in unit content
                const unitsWithConvertedImages = units.map(unitItem => ({
                    ...unitItem,
                    body: imageUrlConverter_1.ImageUrlConverter.convertHtmlContent(unitItem.body),
                    illustrationUrl: unitItem.illustrationUrl ? imageUrlConverter_1.ImageUrlConverter.convertImageUrl(unitItem.illustrationUrl) : undefined
                }));
                return {
                    ...nanoItem,
                    units: unitsWithConvertedImages.sort((a, b) => a.order - b.order)
                };
            }))
        };
        // Sort nano by order
        courseWithContent.nano.sort((a, b) => a.order - b.order);
        console.log(`✅ Course "${course.title}" loaded with ${courseWithContent.nano.length} nano and ${courseWithContent.nano.reduce((sum, n) => sum + n.units.length, 0)} units`);
        res.json({
            success: true,
            data: courseWithContent
        });
    }
    catch (error) {
        console.error('❌ Error fetching course:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch course'
        });
    }
});
/**
 * GET /api/library/category/:category
 * Returnerer kurs for en spesifikk kategori
 */
router.get('/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        console.log(`📚 Fetching courses for category: ${category}`);
        const categoryCourses = await db.select({
            id: schema_1.courses.id,
            slug: schema_1.courses.slug,
            title: schema_1.courses.title,
            category: schema_1.courses.category,
            location: schema_1.courses.location,
            targetUser: schema_1.courses.targetUser,
            language: schema_1.courses.language,
            author: schema_1.courses.author,
            imageUrl: schema_1.courses.imageUrl,
            createdAt: schema_1.courses.createdAt
        }).from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.category, category));
        console.log(`✅ Found ${categoryCourses.length} courses for category "${category}"`);
        res.json({
            success: true,
            data: categoryCourses
        });
    }
    catch (error) {
        console.error('❌ Error fetching category courses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch category courses'
        });
    }
});
/**
 * GET /api/library/target-user/:targetUser
 * Returnerer kurs for en spesifikk målbruker
 */
router.get('/target-user/:targetUser', async (req, res) => {
    try {
        const { targetUser } = req.params;
        console.log(`👥 Fetching courses for target user: ${targetUser}`);
        const targetUserCourses = await db.select({
            id: schema_1.courses.id,
            slug: schema_1.courses.slug,
            title: schema_1.courses.title,
            category: schema_1.courses.category,
            location: schema_1.courses.location,
            targetUser: schema_1.courses.targetUser,
            language: schema_1.courses.language,
            author: schema_1.courses.author,
            imageUrl: schema_1.courses.imageUrl,
            createdAt: schema_1.courses.createdAt
        }).from(schema_1.courses).where((0, drizzle_orm_1.eq)(schema_1.courses.targetUser, targetUser));
        console.log(`✅ Found ${targetUserCourses.length} courses for target user "${targetUser}"`);
        res.json({
            success: true,
            data: targetUserCourses
        });
    }
    catch (error) {
        console.error('❌ Error fetching target user courses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch target user courses'
        });
    }
});
/**
 * GET /api/library/search
 * Søk i kurs basert på query parameters
 */
router.get('/search', async (req, res) => {
    try {
        const { category, location, targetUser, language } = req.query;
        console.log('🔍 Searching courses with filters:', { category, location, targetUser, language });
        // Build query with filters
        const conditions = [];
        if (category)
            conditions.push((0, drizzle_orm_1.eq)(schema_1.courses.category, category));
        if (location)
            conditions.push((0, drizzle_orm_1.eq)(schema_1.courses.location, location));
        if (targetUser)
            conditions.push((0, drizzle_orm_1.eq)(schema_1.courses.targetUser, targetUser));
        if (language)
            conditions.push((0, drizzle_orm_1.eq)(schema_1.courses.language, language));
        const searchResults = await db.select({
            id: schema_1.courses.id,
            slug: schema_1.courses.slug,
            title: schema_1.courses.title,
            category: schema_1.courses.category,
            location: schema_1.courses.location,
            targetUser: schema_1.courses.targetUser,
            language: schema_1.courses.language,
            author: schema_1.courses.author,
            imageUrl: schema_1.courses.imageUrl,
            createdAt: schema_1.courses.createdAt
        }).from(schema_1.courses)
            .where(conditions.length > 0 ? (0, drizzle_orm_1.and)(...conditions) : undefined);
        console.log(`✅ Search returned ${searchResults.length} courses`);
        res.json({
            success: true,
            data: searchResults
        });
    }
    catch (error) {
        console.error('❌ Error searching courses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to search courses'
        });
    }
});
exports.default = router;
