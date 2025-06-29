import { Router } from 'express';
import { db } from '../drizzle/db';
import { categories } from '../drizzle/schema';

const router = Router();

router.get('/', async (req, res) => {
  try {
    console.log("✅ Backend: GET /api/categories");
    const result = await db.select().from(categories).orderBy(categories.name);
    console.log("✅ Found categories:", result);
    res.json(result);
  } catch (err) {
    console.error("🔥 Feil ved henting av kategorier", err);
    res.status(500).json({ error: "Klarte ikke hente kategorier" });
  }
});

export default router; 