import { promises as fs } from 'fs';
import path from 'path';
import { BaseCard } from '../../../../../../components/ui/BaseCard';
import { notFound } from 'next/navigation';

const basePath = path.join(process.cwd(), '..', '@aino/core/content');

export default async function RollePage({ params }: { params: { kategori: string; tjeneste: string; rolle: string } }) {
  const decodedKategori = decodeURIComponent(params.kategori);
  const decodedTjeneste = decodeURIComponent(params.tjeneste);
  const decodedRolle = decodeURIComponent(params.rolle);
  
  console.log('Rolle fra URL:', decodedRolle);
  
  try {
    const coursePath = path.join(basePath, decodedKategori, decodedTjeneste);
    const files = await fs.readdir(coursePath, { withFileTypes: true });
    
    const courses = files
      .filter(file => file.isFile() && file.name.endsWith('.md'))
      .map(file => ({
        title: path.basename(file.name, '.md'),
        path: path.join(decodedKategori, decodedTjeneste, file.name)
      }));
      
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-6">Kurs for {decodedRolle} i {decodedKategori}</h1>
        <div className="grid gap-4">
          {courses.map(course => (
            <BaseCard key={course.path}>
              <h2 className="text-lg font-semibold">{course.title}</h2>
            </BaseCard>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Feil ved henting av kurs:', error);
    return notFound();
  }
} 