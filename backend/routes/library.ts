import { Router } from 'express';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { eq, and } from 'drizzle-orm';
import { courses, nano, unit } from '../drizzle/schema';

const router = Router();

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
});

const db = drizzle(pool);

/**
 * GET /api/library
 * Returnerer liste over alle kurs
 */
router.get('/', async (req, res) => {
  try {
    console.log('📚 Fetching all courses...');
    
    const allCourses = await db.select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      category: courses.category,
      location: courses.location,
      targetUser: courses.targetUser,
      language: courses.language,
      author: courses.author,
      imageUrl: courses.imageUrl,
      createdAt: courses.createdAt
    }).from(courses);
    
    console.log(`✅ Found ${allCourses.length} courses`);
    
    res.json({
      success: true,
      data: allCourses
    });
    
  } catch (error) {
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
    const courseResult = await db.select().from(courses).where(eq(courses.slug, slug));
    
    if (courseResult.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Course not found'
      });
    }
    
    const course = courseResult[0];
    
    // Get nano for this course
    const nanoResult = await db.select().from(nano).where(eq(nano.courseId, course.id));
    
    // Get units for each nano
    const courseWithContent = {
      ...course,
      nano: await Promise.all(
        nanoResult.map(async (nanoItem) => {
          const units = await db.select().from(unit).where(eq(unit.nanoId, nanoItem.id));
          return {
            ...nanoItem,
            units: units.sort((a, b) => a.order - b.order)
          };
        })
      )
    };
    
    // Sort nano by order
    courseWithContent.nano.sort((a, b) => a.order - b.order);
    
    console.log(`✅ Course "${course.title}" loaded with ${courseWithContent.nano.length} nano and ${courseWithContent.nano.reduce((sum, n) => sum + n.units.length, 0)} units`);
    
    res.json({
      success: true,
      data: courseWithContent
    });
    
  } catch (error) {
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
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      category: courses.category,
      location: courses.location,
      targetUser: courses.targetUser,
      language: courses.language,
      author: courses.author,
      imageUrl: courses.imageUrl,
      createdAt: courses.createdAt
    }).from(courses).where(eq(courses.category, category));
    
    console.log(`✅ Found ${categoryCourses.length} courses for category "${category}"`);
    
    res.json({
      success: true,
      data: categoryCourses
    });
    
  } catch (error) {
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
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      category: courses.category,
      location: courses.location,
      targetUser: courses.targetUser,
      language: courses.language,
      author: courses.author,
      imageUrl: courses.imageUrl,
      createdAt: courses.createdAt
    }).from(courses).where(eq(courses.targetUser, targetUser));
    
    console.log(`✅ Found ${targetUserCourses.length} courses for target user "${targetUser}"`);
    
    res.json({
      success: true,
      data: targetUserCourses
    });
    
  } catch (error) {
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
    if (category) conditions.push(eq(courses.category, category as string));
    if (location) conditions.push(eq(courses.location, location as string));
    if (targetUser) conditions.push(eq(courses.targetUser, targetUser as string));
    if (language) conditions.push(eq(courses.language, language as string));
    
    const searchResults = await db.select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      category: courses.category,
      location: courses.location,
      targetUser: courses.targetUser,
      language: courses.language,
      author: courses.author,
      imageUrl: courses.imageUrl,
      createdAt: courses.createdAt
    }).from(courses)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
    
    console.log(`✅ Search returned ${searchResults.length} courses`);
    
    res.json({
      success: true,
      data: searchResults
    });
    
  } catch (error) {
    console.error('❌ Error searching courses:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search courses'
    });
  }
});

export default router; 