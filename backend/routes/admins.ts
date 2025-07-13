import express, { Request, Response } from "express";
import { db } from "../drizzle/db";
import { users, roles, user_roles } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { getAdmins } from "../lib/getAdmins";

const router = express.Router();

// GET /api/admins - Get all admins (users with hovedredaktør role)
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("✅ Backend: GET /api/admins");
    const admins = await getAdmins();
    console.log("✅ Found admins:", admins);
    res.json(admins);
  } catch (err) {
    console.error("🔥 /api/admins error", err);
    res.status(500).json({ error: "Kunne ikke hente admins" });
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
  const { name, email, roleId } = req.body;
  if (!name || !email || !roleId) {
    return res.status(400).json({ error: "Name, email og roleId er påkrevd" });
  }
  try {
    // Opprett bruker
    const nyUser = await db
      .insert(users)
      .values({ name, email })
      .returning();
    // Koble bruker til rolle
    await db
      .insert(user_roles)
      .values({ userId: nyUser[0].id, roleId })
      .returning();
    res.status(201).json(nyUser[0]);
  } catch (err) {
    console.error("🔥 Kunne ikke opprette admin", err);
    res.status(500).json({ error: "Klarte ikke opprette admin" });
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

    // Delete user roles first
    await db
      .delete(user_roles)
      .where(eq(user_roles.userId, id));

    // Delete user
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
    const { name, email } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    console.log("✅ Backend: PUT /api/admins/:id - updating:", id, { name, email });

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
        email
      })
      .where(eq(users.id, id));

    // Fetch and return updated admin
    const updatedAdmin = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
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