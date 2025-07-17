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
// POST /api/progress/unit/:unitId - Marker unit som fullført
router.post('/unit/:unitId', async (req, res) => {
    try {
        var { unitId } = req.params;
        var { userId, courseId, nanoId } = req.body;
        if (!userId || !unitId) {
            return res.status(400).json({ error: "userId og unitId er påkrevd" });
        }
        console.log("✅ Backend: POST /api/progress/unit/:unitId - marking unit as completed:", { unitId, userId });
        var inserted = await db_1.db.insert(schema_1.userProgress).values({
            userId,
            unitId,
            courseId,
            nanoId,
        }).returning();
        console.log("✅ Unit marked as completed:", inserted[0]);
        res.json(inserted[0]);
    }
    catch (err) {
        console.error("🔥 Backend ERROR POST /api/progress/unit/:unitId:", err);
        res.status(500).json({ error: "Noe gikk galt ved markering av unit som fullført" });
    }
});
// GET /api/progress/course/:courseId - Hent progresjon for kurs
router.get('/course/:courseId', async (req, res) => {
    try {
        var { courseId } = req.params;
        var { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "userId er påkrevd" });
        }
        console.log("✅ Backend: GET /api/progress/course/:courseId - fetching progress:", { courseId, userId });
        var progress = await db_1.db.select().from(schema_1.userProgress)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userProgress.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userProgress.courseId, courseId)));
        console.log("✅ Found progress items:", progress.length);
        res.json(progress);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/progress/course/:courseId:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av progresjon" });
    }
});
// DELETE /api/progress/unit/:unitId - Fjern fullføring av unit
router.delete('/unit/:unitId', async (req, res) => {
    try {
        var { unitId } = req.params;
        var { userId } = req.body;
        if (!userId || !unitId) {
            return res.status(400).json({ error: "userId og unitId er påkrevd" });
        }
        console.log("✅ Backend: DELETE /api/progress/unit/:unitId - removing completion:", { unitId, userId });
        await db_1.db.delete(schema_1.userProgress)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.userProgress.userId, userId), (0, drizzle_orm_1.eq)(schema_1.userProgress.unitId, unitId)));
        console.log("✅ Unit completion removed successfully");
        res.json({ status: 'deleted' });
    }
    catch (err) {
        console.error("🔥 Backend ERROR DELETE /api/progress/unit/:unitId:", err);
        res.status(500).json({ error: "Noe gikk galt ved sletting av fullføring" });
    }
});
// GET /api/progress/user/:userId - Hent all progresjon for en bruker
router.get('/user/:userId', async (req, res) => {
    try {
        var { userId } = req.params;
        console.log("✅ Backend: GET /api/progress/user/:userId - fetching all progress:", { userId });
        var progress = await db_1.db.select().from(schema_1.userProgress)
            .where((0, drizzle_orm_1.eq)(schema_1.userProgress.userId, userId));
        console.log("✅ Found progress items for user:", progress.length);
        res.json(progress);
    }
    catch (err) {
        console.error("🔥 Backend ERROR GET /api/progress/user/:userId:", err);
        res.status(500).json({ error: "Noe gikk galt ved henting av brukerprogresjon" });
    }
});
exports.default = router;
