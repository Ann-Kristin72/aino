"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        console.log("✅ Backend: GET /api/categories");
        const result = await db_1.db.select().from(schema_1.categories).orderBy(schema_1.categories.name);
        console.log("✅ Found categories:", result);
        res.json(result);
    }
    catch (err) {
        console.error("🔥 Feil ved henting av kategorier", err);
        res.status(500).json({ error: "Klarte ikke hente kategorier" });
    }
});
exports.default = router;
