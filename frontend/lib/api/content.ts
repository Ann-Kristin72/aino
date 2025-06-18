export async function getContent() {
  const res = await fetch("/api/content");
  if (!res.ok) throw new Error("Failed to fetch content");
  return res.json();
} 