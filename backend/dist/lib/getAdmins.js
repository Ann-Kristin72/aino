"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmins = getAdmins;
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
async function getAdmins() {
    try {
        console.log("🔍 getAdmins: Starting query...");
        console.log("🔍 getAdmins: DATABASE_URL exists:", !!process.env.DATABASE_URL);
        const { rows } = await pool.query(`
      SELECT
        u.id,
        u.name,
        u.email,
        r.name as role
      FROM users u
      INNER JOIN user_roles ur ON u.id = ur.user_id
      INNER JOIN roles r ON ur.role_id = r.id
      WHERE r.name IN ('superadmin', 'hovedredaktør', 'redaktør')
    `);
        console.log("🔍 getAdmins: Query successful, found", rows.length, "admins");
        return rows;
    }
    catch (error) {
        console.error("🔥 getAdmins ERROR:", error);
        console.error("🔥 getAdmins ERROR details:", {
            message: error.message,
            code: error.code,
            detail: error.detail,
            hint: error.hint,
            position: error.position
        });
        throw error;
    }
}
