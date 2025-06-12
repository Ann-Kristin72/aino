import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Params = {
  kategori: string;
  tjeneste: string;
  rolle: string;
};

type Course = {
  title: string;
  description?: string;
  path: string;
};

export default async function Page({
  params,
}: {
  params: Params;
}) {
  const { kategori, tjeneste, rolle } = params;
  const kurs = await getCoursesFor(kategori, tjeneste, rolle);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Kurs for {rolle} i {tjeneste} ({kategori})
      </h1>
      {kurs.length === 0 ? (
        <p>Ingen kurs tilgjengelig for valgt rolle og tjeneste.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kurs.map((k) => (
            <li key={k.path} className="border p-4 rounded">
              <h2 className="font-semibold text-lg">{k.title}</h2>
              <p className="text-sm text-gray-600">{k.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

async function getCoursesFor(
  kategori: string,
  tjeneste: string,
  rolle: string
): Promise<Course[]> {
  const base = path.join(process.cwd(), "..", "core", "content", kategori);
  if (!fs.existsSync(base)) {
    console.warn("Innholdsmappe ikke funnet:", base);
    return [];
  }
  const files = fs.readdirSync(base);

  return files
    .map((filename) => {
      const filePath = path.join(base, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);

      const tjenesteliste = (data.tjeneste || []).map((s: string) =>
        s.toLowerCase()
      );
      const rollerliste = (data.roller || []).map((r: string) =>
        r.toLowerCase()
      );

      const match =
        tjenesteliste.includes(tjeneste.toLowerCase()) &&
        rollerliste.includes(rolle.toLowerCase());

      if (!match) return null;

      return {
        title: data.title || filename.replace('.md', ''),
        description: data.description || '',
        path: filePath,
      };
    })
    .filter(Boolean) as Course[];
} 