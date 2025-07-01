import { Pool } from "pg";

import { config } from "dotenv";
config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function getAdmins() {
  try {
    console.log("🔍 getAdmins: Starting query...");
    console.log("🔍 getAdmins: DATABASE_URL exists:", !!process.env.DATABASE_URL);
    
    const { rows } = await pool.query(`
      SELECT
        users.id,
        users.name,
        users.email,
        roles.name as role
      FROM users
      INNER JOIN user_roles ON users.id = user_roles.user_id
      INNER JOIN roles ON user_roles.role_id = roles.id
      WHERE roles.name IN ('superadmin', 'hovedredaktør', 'redaktør');
    `);

    console.log("🔍 getAdmins: Query successful, found", rows.length, "admins");
    return rows;
  } catch (error: any) {
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