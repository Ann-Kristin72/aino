"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = require("../drizzle/db");
var schema_1 = require("../drizzle/schema");
var drizzle_orm_1 = require("drizzle-orm");
var router = express_1.default.Router();
// GET /api/roles - Get all roles
router.get("/", async function(req, res) {
    try {
        console.log("✅ Backend: GET /api/roles");
        var allRoles = await db_1.db.select().from(schema_1.roles);
        console.log("✅ Found roles:", allRoles);
        res.json(allRoles);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/roles:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av roller" });
    }
});
// POST /api/roles - Create new role
router.post("/", async function(req, res) {
    try {
        var name = req.body.name;
        if (!name) {
            return res.status(400).json({ error: "Rollenavn er påkrevd" });
        }
        console.log("✅ Backend: POST /api/roles - creating:", { name });
        // Check if role already exists
        var existingRole = await db_1.db
            .select()
            .from(schema_1.roles)
            .where((0, drizzle_orm_1.eq)(schema_1.roles.name, name))
            .limit(1);
        if (existingRole[0]) {
            return res.status(409).json({ error: "Rolle eksisterer allerede" });
        }
        var newRole = await db_1.db.insert(schema_1.roles).values({ name }).returning();
        console.log("✅ Role created successfully:", newRole[0]);
        res.status(201).json(newRole[0]);
    }
    catch (err) {
        console.error("🔥 Backend ERROR POST /api/roles:", err);
        res.status(500).json({ error: "Noe gikk galt ved opprettelse av rolle" });
    }
});
// GET /api/roles/:id - Get specific role by ID
router.get("/:id", async function(req, res) {
    try {
        var id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: "Ugyldig ID" });
        }
        console.log("✅ Backend: GET /api/roles/:id - fetching:", id);
        var roleId = parseInt(id);
        if (isNaN(roleId)) {
            return res.status(400).json({ error: "Ugyldig ID format" });
        }
        var role = await db_1.db
            .select()
            .from(schema_1.roles)
            .where((0, drizzle_orm_1.eq)(schema_1.roles.id, roleId))
            .limit(1);
        if (!role[0]) {
            console.log("ℹ️ Role not found:", id);
            return res.status(404).json({ error: "Rolle ikke funnet" });
        }
        console.log("✅ Found role:", role[0]);
        res.json(role[0]);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/roles/:id:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av rolle" });
    }
});
exports.default = router;
