import { Router } from 'express';
import { parseMarkdown } from '../utils/parser';

export const libraryRouter = Router();

libraryRouter.get('/', (req, res) => {
  res.json({
    message: 'Library API endpoint'
  });
}); 