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
// POST /onboarding - Opprett ny bruker og koble til rolle
router.post('/onboarding', async (req, res) => {
    try {
        var { name, email, role } = req.body;
        // Validering
        if (!name || !email || !role) {
            return res.status(400).json({
                error: 'Mangler påkrevde felter: name, email, role'
            });
        }
        // Sjekk om bruker allerede finnes
        var existingUser = await db_1.db
            .select()
            .from(schema_1.users)
            .where((0, drizzle_orm_1.eq)(schema_1.users.email, email))
            .limit(1);
        if (existingUser.length > 0) {
            return res.status(409).json({
                error: 'Bruker med denne e-postadressen finnes allerede'
            });
        }
        // Finn rolle-ID
        var roleRecord = await db_1.db
            .select()
            .from(schema_1.roles)
            .where((0, drizzle_orm_1.eq)(schema_1.roles.name, role))
            .limit(1);
        if (roleRecord.length === 0) {
            return res.status(400).json({
                error: `Ugyldig rolle: ${role}`
            });
        }
        // Opprett ny bruker
        var [newUser] = await db_1.db
            .insert(schema_1.users)
            .values({ name, email })
            .returning();
        // Koble bruker til rolle
        await db_1.db
            .insert(schema_1.userRoles)
            .values({
            userId: newUser.id,
            roleId: roleRecord[0].id
        });
        // Returner brukerdata
        res.status(201).json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: role
        });
    }
    catch (error) {
        console.error('Onboarding error:', error);
        res.status(500).json({
            error: 'Intern serverfeil under onboarding'
        });
    }
});
exports.default = router;
