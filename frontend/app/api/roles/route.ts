import { NextResponse } from "next/server";

// Use environment variable or fallback to production backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://aino-backend.azurewebsites.net';

export async function GET() {
  try {
    console.log("✅ Frontend API: GET /api/roles - calling backend...");
    console.log("🌐 Backend URL:", BACKEND_URL);
    
    const response = await fetch(`${BACKEND_URL}/api/roles`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log("✅ Roles fetched successfully:", result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("🔥 Frontend API ERROR /api/roles:", err);
    // Return fallback roles if API fails
    return NextResponse.json([
      { id: 1, name: "superadmin" },
      { id: 2, name: "hovedredaktør" },
      { id: 3, name: "redaktør" },
      { id: 4, name: "veileder" },
      { id: 5, name: "assistent" },
      { id: 6, name: "prosjektleder" },
      { id: 7, name: "avdelingsleder" },
      { id: 8, name: "sykepleier" },
      { id: 9, name: "fagsykepleier" },
      { id: 10, name: "helsefagarbeider" }
    ], { status: 500 });
  }
} 