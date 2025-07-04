import express from 'express';
import { db } from '../drizzle/db';
import { users, userRoles, roles } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

const router = express.Router();

// POST /onboarding - Opprett ny bruker og koble til rolle
router.post('/onboarding', async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validering
    if (!name || !email || !role) {
      return res.status(400).json({ 
        error: 'Mangler påkrevde felter: name, email, role' 
      });
    }

    // Sjekk om bruker allerede finnes
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        error: 'Bruker med denne e-postadressen finnes allerede' 
      });
    }

    // Finn rolle-ID
    const roleRecord = await db
      .select()
      .from(roles)
      .where(eq(roles.name, role))
      .limit(1);

    if (roleRecord.length === 0) {
      return res.status(400).json({ 
        error: `Ugyldig rolle: ${role}` 
      });
    }

    // Opprett ny bruker
    const [newUser] = await db
      .insert(users)
      .values({ name, email })
      .returning();

    // Koble bruker til rolle
    await db
      .insert(userRoles)
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

  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ 
      error: 'Intern serverfeil under onboarding' 
    });
  }
});

export default router; 