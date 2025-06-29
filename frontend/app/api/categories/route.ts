export async function GET() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
  const res = await fetch(`${BACKEND_URL}/api/categories`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
} 