import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { healthRouter } from './routes/health';
import { libraryRouter } from './routes/library';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/health', healthRouter);
app.use('/api/library', libraryRouter);

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
}); 