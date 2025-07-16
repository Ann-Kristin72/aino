# Aino - Learning Management System

Aino is a comprehensive learning management system designed for healthcare professionals. The system provides an intuitive interface for creating, managing, and delivering educational content.

## 🚀 Deployment Status

- **Frontend**: Deployed on Vercel (Next.js 15.3.3)
- **Backend**: Deployed on Azure App Service (Node.js)
- **Database**: Azure PostgreSQL
- **Storage**: Azure Blob Storage

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15.3.3 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Deployment**: Vercel

### Backend (Node.js)
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: Drizzle ORM with PostgreSQL
- **Deployment**: Azure App Service

## 🔧 Development

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ann-Kristin72/aino.git
   cd aino
   ```

2. **Install dependencies**
   ```bash
   # Install workspace dependencies
   pnpm install
   
   # Or install individually
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Configure database connection and other environment variables

4. **Start development servers**
   ```bash
   # Terminal 1: Start backend (port 3001)
   cd backend && npm run dev
   
   # Terminal 2: Start frontend (port 3000)
   cd frontend && npm run dev
   ```

## 📦 Build & Deploy

### Frontend (Vercel)
- Automatic deployment on push to `main` branch
- Build command: `npm run build`
- Output directory: `.next`

### Backend (Azure)
- Automatic deployment via GitHub Actions
- Build command: `npm run build`
- Runtime: Node.js 20.x

## 🌐 Live URLs

- **Frontend**: [https://aino-frontend.vercel.app](https://aino-frontend.vercel.app)
- **Backend API**: [https://aino-backend.azurewebsites.net](https://aino-backend.azurewebsites.net)

## 📚 Features

- **Content Management**: Create and manage educational courses
- **Progress Tracking**: Monitor user progress through courses
- **Role-based Access**: Different access levels for various user types
- **Media Management**: Upload and manage images and documents
- **Multi-language Support**: Norwegian and English interfaces

## 🔒 Security

- Environment-based password protection
- CORS configuration for production
- Secure database connections
- Role-based access control

## 📝 License

This project is licensed under the MIT License.

---

**Last updated**: July 6, 2025 - Deployment ready! ✅
# Trigger deploy Mon Jul 14 15:34:12 CEST 2025
# Trigger Vercel deployment Mon Jul 14 16:38:23 CEST 2025
# Trigger deployment
