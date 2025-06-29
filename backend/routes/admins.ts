import express, { Request, Response } from "express";
import { db } from "../drizzle/db";
import { users, roles } from "../drizzle/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// GET /api/admins - Get all admins (users with hovedredaktør role)
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("✅ Backend: GET /api/admins");

    // Find hovedredaktør role ID
    const hovedredaktørRole = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);

    if (!hovedredaktørRole[0]) {
      console.log("ℹ️ No hovedredaktør role found");
      return res.json([]);
    }

    // Get users with this role
    const redaktører = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email
      })
      .from(users)
      .where(eq(users.role_id, hovedredaktørRole[0].id));

    console.log("✅ Found admins:", redaktører);
    res.json(Array.isArray(redaktører) ? redaktører : []);

  } catch (error) {
    console.error("🔥 Backend ERROR GET /api/admins:", error);
    res.status(500).json({ error: "Noe gikk galt ved henting av admins" });
  }
});

// GET /api/admins/:id - Get specific admin by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Ugyldig ID" });
    }

    console.log("✅ Backend: GET /api/admins/:id - fetching:", id);

    const admin = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role_id: users.role_id,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!admin[0]) {
      console.log("ℹ️ Admin not found:", id);
      return res.status(404).json({ error: "Admin ikke funnet" });
    }

    console.log("✅ Found admin:", admin[0]);
    res.json(admin[0]);
  } catch (error) {
    console.error("🔥 Backend ERROR GET /api/admins/:id:", error);
    res.status(500).json({ error: "Noe gikk galt ved henting av admin" });
  }
});

// POST /api/admins - Create new admin
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    console.log("✅ Backend: POST /api/admins - creating:", { name, email });

    // Find hovedredaktør role
    const hovedredaktør = await db
      .select()
      .from(roles)
      .where(eq(roles.name, "hovedredaktør"))
      .limit(1);

    if (!hovedredaktør[0]) {
      return res.status(500).json({ error: "Hovedredaktør role not found" });
    }

    // Create new admin
    const ny = await db
      .insert(users)
      .values({
        name,
        email,
        role_id: hovedredaktør[0].id
      })
      .returning();

    console.log("✅ Admin created successfully:", ny[0].id);
    res.status(201).json(ny[0]);
  } catch (error) {
    console.error("🔥 Backend ERROR POST /api/admins:", error);
    res.status(500).json({ error: "Noe gikk galt ved opprettelse av admin" });
  }
});

// DELETE /api/admins/:id - Delete admin
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    console.log("✅ Backend: DELETE /api/admins/:id - deleting:", id);

    // Check if admin exists first
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!existingAdmin[0]) {
      return res.status(404).json({ error: "Admin ikke funnet" });
    }

    // Delete admin
    await db
      .delete(users)
      .where(eq(users.id, id));

    console.log("✅ Admin deleted successfully:", id);
    res.json({ success: true });
  } catch (error) {
    console.error("🔥 Backend ERROR DELETE /api/admins:", error);
    res.status(500).json({ error: "Noe gikk galt ved sletting av admin" });
  }
});

// PUT /api/admins/:id - Update admin
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, role_id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    console.log("✅ Backend: PUT /api/admins/:id - updating:", id, { name, email, role_id });

    // Check if admin exists first
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (!existingAdmin[0]) {
      return res.status(404).json({ error: "Admin ikke funnet" });
    }

    // Update user details
    await db
      .update(users)
      .set({
        name,
        email,
        ...(role_id && { role_id })
      })
      .where(eq(users.id, id));

    // Fetch and return updated admin
    const updatedAdmin = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role_id: users.role_id,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    console.log("✅ Admin updated successfully:", updatedAdmin[0]);
    res.json(updatedAdmin[0]);
  } catch (error) {
    console.error("🔥 Backend ERROR PUT /api/admins:", error);
    res.status(500).json({ error: "Noe gikk galt ved oppdatering av admin" });
  }
});

export default router; 