import { NextResponse } from "next/server";
import { getVisibleContentForUser } from "@aino/core/content/content.service";
import { UserProfile } from "@aino/core/types/UserProfile";

// Midlertidig mock-bruker
const mockUser: UserProfile = {
  id: "demo123",
  name: "Lena",
  email: "lena@aino.no",
  roles: ["helsefagarbeider"],
  services: ["hjemmetjeneste"],
  preferences: {
    language: "nb",
    notifications: true
  },
  lastActive: new Date().toISOString()
};

export async function GET() {
  try {
    const visibleContent = getVisibleContentForUser(mockUser);
    return NextResponse.json(visibleContent);
  } catch (error) {
    console.error('Feil ved henting av innhold:', error);
    return NextResponse.json(
      { error: 'Kunne ikke hente innhold' },
      { status: 500 }
    );
  }
} 