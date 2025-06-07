# Backend

This is the backend service for Aino, built with Express.js and TypeScript.

## Directory Structure

```
backend/
├── src/
│   ├── index.ts         # Main application entry point
│   ├── routes/          # API route handlers
│   │   ├── health.ts    # Health check endpoint
│   │   └── library.ts   # Library related endpoints
│   └── utils/
│       └── parser.ts    # Utility functions for parsing
├── drizzle/
│   ├── schema.ts        # Database schema definitions
│   └── migration.sql    # Database migrations
└── README.md
```

## Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Database

We use Drizzle ORM with PostgreSQL. Migrations are handled through the `drizzle` directory. 