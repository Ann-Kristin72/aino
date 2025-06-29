import express, { Request, Response } from "express";
import { db } from "../drizzle/db";
import { library } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/content - Get all content
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("✅ Backend: GET /api/content");
    const result = await db.select().from(library).orderBy(library.createdAt);
    console.log("✅ Found content items:", result.length);
    res.json(result);
  } catch (err) {
    console.error("🔥 Backend ERROR GET /api/content:", err);
    res.status(500).json({ error: "Noe gikk galt ved henting av innhold" });
  }
});

// POST /api/content - Create new content
router.post("/", async (req: Request, res: Response) => {
  const { title, content, category_id, created_by } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Tittel og innhold er påkrevd" });
  }

  try {
    console.log("✅ Backend: POST /api/content - creating:", { title, category_id, created_by });
    
    const result = await db.insert(library).values({
      title,
      description: content, // Map content to description field
    }).returning();

    console.log("✅ Content created successfully:", result[0].id);
    res.status(201).json(result[0]);
  } catch (err) {
    console.error("🔥 Backend ERROR POST /api/content:", err);
    res.status(500).json({ error: "Noe gikk galt ved lagring av innhold" });
  }
});

// DELETE /api/content/:id - Delete content
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: "Ugyldig ID" });
    }

    console.log("✅ Backend: DELETE /api/content/:id - deleting:", id);
    
    const result = await db.delete(library).where(eq(library.id, id)).returning();
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Innhold ikke funnet" });
    }

    console.log("✅ Content deleted successfully:", id);
    res.json({ success: true, deleted: result[0] });
  } catch (err) {
    console.error("🔥 Backend ERROR DELETE /api/content/:id:", err);
    res.status(500).json({ error: "Noe gikk galt ved sletting av innhold" });
  }
});

export default router;