"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("../drizzle/db");
var schema_1 = require("../drizzle/schema");
var drizzle_orm_1 = require("drizzle-orm");
var getAdmins_1 = require("../lib/getAdmins");
var router = express_1.default.Router();
// GET /api/admins - Get all admins (users with hovedredaktør role)
router.get("/", async (req, res) => {
    try {
        console.log("✅ Backend: GET /api/admins");
        var admins = await (0, getAdmins_1.getAdmins)();
        console.log("✅ Found admins:", admins);
        res.json(admins);
    }
    catch (err) {
        console.error("🔥 /api/admins error", err);
        res.status(500).json({ error: "Kunne ikke hente admins" });
    }
});
// GET /api/admins/:id - Get specific admin by ID
router.get("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Ugyldig ID" });
        }
        console.log("✅ Backend: GET /api/admins/:id - fetching:", id);
        var admin = await db_1.db
            .select({
            id: schema_1.users.id,
            name: schema_1.users.name,
            email: schema_1.users.email,
        })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .limit(1);
        if (!admin[0]) {
            console.log("ℹ️ Admin not found:", id);
            return res.status(404).json({ error: "Admin ikke funnet" });
        }
        console.log("✅ Found admin:", admin[0]);
        res.json(admin[0]);
    }
    catch (error) {
        console.error("🔥 Backend ERROR GET /api/admins/:id:", error);
        res.status(500).json({ error: "Noe gikk galt ved henting av admin" });
    }
});
// POST /api/admins - Create new admin
router.post("/", async (req, res) => {
    var { name, email, roleId } = req.body;
    if (!name || !email || !roleId) {
        return res.status(400).json({ error: "Name, email og roleId er påkrevd" });
    }
    try {
        // Opprett bruker
        var nyUser = await db_1.db
            .insert(schema_1.users)
            .values({ name, email })
            .returning();
        // Koble bruker til rolle
        await db_1.db
            .insert(schema_1.userRoles)
            .values({ userId: nyUser[0].id, roleId })
            .returning();
        res.status(201).json(nyUser[0]);
    }
    catch (err) {
        console.error("🔥 Kunne ikke opprette admin", err);
        res.status(500).json({ error: "Klarte ikke opprette admin" });
    }
});
// DELETE /api/admins/:id - Delete admin
router.delete("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        console.log("✅ Backend: DELETE /api/admins/:id - deleting:", id);
        // Check if admin exists first
        var existingAdmin = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .limit(1);
        if (!existingAdmin[0]) {
            return res.status(404).json({ error: "Admin ikke funnet" });
        }
        // Delete user roles first
        await db_1.db
            .delete(schema_1.userRoles)
            .where((0, drizzle_orm_1.eq)(schema_1.userRoles.userId, id));
        // Delete user
        await db_1.db
            .delete(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        console.log("✅ Admin deleted successfully:", id);
        res.json({ success: true });
    }
    catch (error) {
        console.error("🔥 Backend ERROR DELETE /api/admins:", error);
        res.status(500).json({ error: "Noe gikk galt ved sletting av admin" });
    }
});
// PUT /api/admins/:id - Update admin
router.put("/:id", async (req, res) => {
    try {
        var { id } = req.params;
        var { name, email } = req.body;
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        if (!name || !email) {
            return res.status(400).json({ error: "Name and email are required" });
        }
        console.log("✅ Backend: PUT /api/admins/:id - updating:", id, { name, email });
        // Check if admin exists first
        var existingAdmin = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .limit(1);
        if (!existingAdmin[0]) {
            return res.status(404).json({ error: "Admin ikke funnet" });
        }
        // Update user details
        await db_1.db
            .update(schema_1.users)
            .set({
            name,
            email
        })
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id));
        // Fetch and return updated admin
        var updatedAdmin = await db_1.db
            .select({
            id: schema_1.users.id,
            name: schema_1.users.name,
            email: schema_1.users.email,
        })
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.id, id))
            .limit(1);
        console.log("✅ Admin updated successfully:", updatedAdmin[0]);
        res.json(updatedAdmin[0]);
    }
    catch (error) {
        console.error("🔥 Backend ERROR PUT /api/admins:", error);
        res.status(500).json({ error: "Noe gikk galt ved oppdatering av admin" });
    }
});
exports.default = router;
