import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

function hasYamlMetadata(content: string) {
  return content.trim().startsWith('---');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Formidable error' });
    const category = fields.category as string;
    const file = files.file as formidable.File;
    if (!file || !category) return res.status(400).json({ error: 'Mangler fil eller kategori' });
    const content = fs.readFileSync(file.filepath, 'utf-8');
    if (!hasYamlMetadata(content)) return res.status(400).json({ error: 'Filen mangler YAML-metadata (---)' });
    const destDir = path.join(process.cwd(), 'core', 'content', category);
    fs.mkdirSync(destDir, { recursive: true });
    const destPath = path.join(destDir, file.originalFilename || file.newFilename);
    fs.writeFileSync(destPath, content);
    res.status(200).json({ ok: true });
  });
} 