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
  console.log('📨 API-kall mottatt: /api/content');
  
  try {
    console.log('👤 Henter innhold for bruker:', mockUser.name);
    const visibleContent = getVisibleContentForUser(mockUser);
    console.log(`✅ Fant ${visibleContent.length} innholdselementer`);
    
    return NextResponse.json({
      success: true,
      data: visibleContent
    });
  } catch (error) {
    console.error('❌ Feil ved henting av innhold:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Kunne ikke hente innhold',
        details: error instanceof Error ? error.message : 'Ukjent feil'
      },
      { status: 500 }
    );
  }
} 