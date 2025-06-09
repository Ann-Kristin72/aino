import express from 'express';
import { readFile } from 'fs/promises';
import { join } from 'path';

const router = express.Router();

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const contentPath = join(process.cwd(), '..', '@aino/core/content', `${slug}.md`);
    
    const content = await readFile(contentPath, 'utf-8');
    res.json({ content });
  } catch (error) {
    console.error('Error reading content:', error);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

export { router as contentRouter }; 