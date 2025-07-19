export async function GET() {
  // Use environment variable or fallback to production backend URL
  // Extract base URL without /api suffix to avoid double /api
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.ainomobil.no/api';
const BACKEND_URL = BASE_URL.endsWith('/api') ? BASE_URL.replace('/api', '') : BASE_URL;
  
  try {
    const res = await fetch(`${BACKEND_URL}/api/categories`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    
    if (!res.ok) {
      throw new Error(`Backend responded with status: ${res.status}`);
    }
    
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (error) {
    console.error('API /categories error:', error);
    return new Response(JSON.stringify({ error: 'Kunne ikke hente kategorier' }), {
      status: 500,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
} 