import { NextResponse } from "next/server";

// Use environment variable or fallback to production backend URL
// Extract base URL without /api suffix to avoid double /api
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
const BACKEND_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;

export async function GET() {
  try {
    console.log("✅ Frontend API: GET /api/roles - calling backend...");
    console.log("🌐 Backend URL:", BACKEND_URL);
    console.log("🔧 Environment check:", {
          hasBackendUrl: !!process.env.NEXT_PUBLIC_API_BASE_URL,
    backendUrl: process.env.NEXT_PUBLIC_API_BASE_URL
    });
    
    const response = await fetch(`${BACKEND_URL}/api/roles`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });
    
    console.log("📡 Response status:", response.status);
    console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Backend error response:", errorText);
      throw new Error(`Backend responded with status: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log("✅ Roles fetched successfully:", result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("🔥 Frontend API ERROR /api/roles:", err);
    console.error("🔥 Error details:", {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      name: err instanceof Error ? err.name : 'Unknown'
    });
    
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