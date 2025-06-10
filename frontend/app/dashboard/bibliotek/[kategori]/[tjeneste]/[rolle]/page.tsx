import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface CourseMeta {
  title: string;
  description: string;
  audience: string[];
  context: string[];
  category: string;
}

function getCourses(category: string, tjeneste: string, rolle: string): CourseMeta[] {
  const contentDir = path.join(process.cwd(), '../../../@aino/core/content');
  const courses: CourseMeta[] = [];
  fs.readdirSync(contentDir).forEach((dir) => {
    const readmePath = path.join(contentDir, dir, 'README.md');
    if (fs.existsSync(readmePath)) {
      const file = fs.readFileSync(readmePath, 'utf8');
      const { data } = matter(file);
      if (
        data.category?.toLowerCase() === category &&
        data.context?.includes(tjeneste) &&
        data.audience?.includes(rolle)
      ) {
        courses.push({
          title: data.title,
          description: data.description,
          audience: data.audience,
          context: data.context,
          category: data.category,
        });
      }
    }
  });
  return courses;
}

export default function Page({ params }: { params: { kategori: string, tjeneste: string, rolle: string } }) {
  return (
    <div>
      Kurs for {params.rolle} i {params.tjeneste} ({params.kategori})
    </div>
  );
} 