import express, { Request, Response } from "express";
import { db } from "../drizzle/db";
import { userProgress } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

const router = express.Router();

// POST /api/progress/unit/:unitId - Marker unit som fullført
router.post('/unit/:unitId', async (req: Request, res: Response) => {
  try {
    const { unitId } = req.params;
    const { userId, courseId, nanoId } = req.body;

    if (!userId || !unitId) {
      return res.status(400).json({ error: "userId og unitId er påkrevd" });
    }

    console.log("✅ Backend: POST /api/progress/unit/:unitId - marking unit as completed:", { unitId, userId });

    const inserted = await db.insert(userProgress).values({
      userId,
      unitId,
      courseId,
      nanoId,
    }).returning();

    console.log("✅ Unit marked as completed:", inserted[0]);
    res.json(inserted[0]);
  } catch (err) {
    console.error("🔥 Backend ERROR POST /api/progress/unit/:unitId:", err);
    res.status(500).json({ error: "Noe gikk galt ved markering av unit som fullført" });
  }
});

// GET /api/progress/course/:courseId - Hent progresjon for kurs
router.get('/course/:courseId', async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId er påkrevd" });
    }

    console.log("✅ Backend: GET /api/progress/course/:courseId - fetching progress:", { courseId, userId });

    const progress = await db.select().from(userProgress)
      .where(and(eq(userProgress.userId, userId as string), eq(userProgress.courseId, courseId)));

    console.log("✅ Found progress items:", progress.length);
    res.json(progress);
  } catch (err) {
    console.error("🔥 Backend ERROR GET /api/progress/course/:courseId:", err);
    res.status(500).json({ error: "Noe gikk galt ved henting av progresjon" });
  }
});

// DELETE /api/progress/unit/:unitId - Fjern fullføring av unit
router.delete('/unit/:unitId', async (req: Request, res: Response) => {
  try {
    const { unitId } = req.params;
    const { userId } = req.body;

    if (!userId || !unitId) {
      return res.status(400).json({ error: "userId og unitId er påkrevd" });
    }

    console.log("✅ Backend: DELETE /api/progress/unit/:unitId - removing completion:", { unitId, userId });

    await db.delete(userProgress)
      .where(and(eq(userProgress.userId, userId), eq(userProgress.unitId, unitId)));

    console.log("✅ Unit completion removed successfully");
    res.json({ status: 'deleted' });
  } catch (err) {
    console.error("🔥 Backend ERROR DELETE /api/progress/unit/:unitId:", err);
    res.status(500).json({ error: "Noe gikk galt ved sletting av fullføring" });
  }
});

// GET /api/progress/user/:userId - Hent all progresjon for en bruker
router.get('/user/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    console.log("✅ Backend: GET /api/progress/user/:userId - fetching all progress:", { userId });

    const progress = await db.select().from(userProgress)
      .where(eq(userProgress.userId, userId));

    console.log("✅ Found progress items for user:", progress.length);
    res.json(progress);
  } catch (err) {
    console.error("🔥 Backend ERROR GET /api/progress/user/:userId:", err);
    res.status(500).json({ error: "Noe gikk galt ved henting av brukerprogresjon" });
  }
});

export default router; 