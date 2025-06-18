export async function getAdmins() {
  const res = await fetch("/api/admins");
  if (!res.ok) throw new Error("Failed to fetch admins");
  return res.json();
} 