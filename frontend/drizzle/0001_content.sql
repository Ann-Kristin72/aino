CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  content_md TEXT NOT NULL,
  metadata JSONB,
  status TEXT DEFAULT 'draft',
  last_reviewed TIMESTAMP,
  next_review_due TIMESTAMP,
  author_type TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 