# AINO – Teknisk Prosjektdokumentasjon

## 1. **Oversikt og Arkitektur**

**AINO** er en moderne læringsplattform for helsesektoren, bygget med en **microservices-arkitektur** som skiller frontend og backend tydelig.

### **Teknologistakk**

#### **Frontend**
- **Framework:** Next.js 15.3.3 (React 18.3.1)
- **Styling:** Tailwind CSS v4.1.11 med PostCSS
- **State Management:** TanStack React Query v5.80.7
- **Markdown Editor:** react-markdown-editor-lite v1.3.4
- **Type Safety:** TypeScript v5
- **Build Tool:** Next.js App Router

#### **Backend**
- **Runtime:** Node.js med TypeScript
- **Framework:** Express.js v4.18.2
- **Database ORM:** Drizzle ORM v0.29.0
- **Database:** PostgreSQL med pg v8.11.3
- **Markdown Processing:** marked v15.0.12
- **Cloud Storage:** Azure Blob Storage (@azure/storage-blob v12.27.0)
- **Development:** tsx v4.6.0 for hot reload

#### **Infrastruktur**
- **Media Storage:** Azure Blob Storage (ainomedia.blob.core.windows.net)
- **Environment:** dotenv v17.0.0 for konfigurasjon
- **Package Manager:** pnpm med workspace-konfigurasjon

---

## 2. **Database-arkitektur**

### **Hovedtabeller**

#### **courses** (Hovedtabell for kurs)
```sql
- id: UUID (Primary Key)
- slug: VARCHAR(255) UNIQUE
- title: VARCHAR(255)
- category: VARCHAR(100)
- location: VARCHAR(100)
- targetUser: VARCHAR(100)
- language: VARCHAR(10) DEFAULT 'nb-NO'
- author: VARCHAR(255)
- revisionInterval: VARCHAR(50) DEFAULT '12'
- keywords: TEXT[]
- imageUrl: TEXT
- metadata: JSONB
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP
```

#### **nano** (Kapittel)
```sql
- id: UUID (Primary Key)
- courseId: UUID (Foreign Key → courses.id)
- title: VARCHAR(255)
- order: INTEGER
- createdAt: TIMESTAMP
```

#### **unit** (Innholdsenheter)
```sql
- id: UUID (Primary Key)
- nanoId: UUID (Foreign Key → nano.id)
- title: VARCHAR(255)
- body: TEXT (HTML-innhold)
- illustrationUrl: TEXT
- order: INTEGER
- createdAt: TIMESTAMP
```

#### **userProgress** (Brukerprogresjon)
```sql
- id: SERIAL (Primary Key)
- userId: VARCHAR(255)
- courseId: VARCHAR(255)
- nanoId: VARCHAR(255)
- unitId: VARCHAR(255)
- completedAt: TIMESTAMP
```

#### **Støttetabeller**
- **roles:** Brukerroller (superadmin, hovedredaktør, redaktør, etc.)
- **categories:** Kurskategorier
- **media:** Mediafiler (bilder, dokumenter)
- **users:** Brukerdata
- **userRoles:** Mange-til-mange relasjon mellom brukere og roller

---

## 3. **API-arkitektur**

### **Backend Endepunkter**

#### **Kurs-håndtering**
```
GET    /api/content              - Hent alle kurs
GET    /api/content/:slug        - Hent spesifikt kurs
POST   /api/content              - Opprett/oppdater kurs
DELETE /api/content/:id          - Slett kurs
```

#### **Brukerprogresjon**
```
GET    /api/progress/course/:courseId?userId=:userId
POST   /api/progress/unit/:unitId?userId=:userId
```

#### **Administrasjon**
```
GET    /api/roles                - Hent alle roller
GET    /api/categories           - Hent kategorier
GET    /api/admins               - Hent admin-brukere
```

### **Frontend API-integrasjon**

Frontend bruker **TanStack React Query** for:
- **Caching** av API-responser
- **Automatisk revalidering**
- **Optimistic updates**
- **Error handling**

```typescript
// Eksempel på API-hook
const { data: courses, isLoading, error } = useQuery({
  queryKey: ['courses'],
  queryFn: () => fetch('/api/content').then(res => res.json())
});
```

---

## 4. **Markdown- og Innholdsbehandling**

### **Markdown-parsing Pipeline**

#### **1. Fil-parsing (MarkdownCourseParser)**
```typescript
// Strukturert parsing av markdown-filer
interface ParsedCourse {
  metadata: CourseMetadata;
  title: string;
  slug: string;
  nano: ParsedNano[];
}
```

#### **2. Metadata-ekstraksjon**
```markdown
//:- {
  "category": "Ernæring",
  "location": "Institusjon", 
  "targetUser": "Pleieassistenter",
  "language": "nb-NO",
  "author": "Evelyn",
  "revisionInterval": "6"
}
```

#### **3. Hierarkisk struktur**
- **#** = Kurs-tittel
- **##** = Nano (kapittel)
- **###** = Unit (innholdsenhet)

### **HTML-konvertering**
```typescript
// Markdown → HTML med marked
private static convertMarkdownToHtml(markdown: string): string {
  return marked(markdown, {
    gfm: true,
    breaks: true
  });
}
```

---

## 5. **Bildehåndtering og Azure Integration**

### **ImageProcessor-klassen**

#### **Automatisk bilde-migrering**
```typescript
// Prosesserer markdown-innhold og migrerer bilder
static async processMarkdownImages(markdownContent: string): Promise<{
  processedContent: string;
  migratedImages: string[];
}>
```

#### **Bilde-migreringsflyt**
1. **Parse** markdown for bilde-referanser
2. **Download** bilder fra eksterne URL-er
3. **Upload** til Azure Blob Storage
4. **Erstatt** URL-er i innholdet
5. **Cache** med unike filnavn (UUID)

#### **Støttede bilde-formater**
- JPEG/JPG
- PNG
- GIF
- WebP
- SVG
- BMP

### **ImageUrlConverter-klassen**

#### **URL-konvertering**
```typescript
// Konverterer gamle URL-er til Azure-format
static convertImageUrl(imageUrl: string): string {
  // Skillaid → Azure Blob Storage
  // Relative paths → Absolute Azure URLs
  // CDN URLs → Direct Azure URLs
}
```

#### **Støttede URL-formater**
- `skillaidmedia.blob.core.windows.net` → `ainomedia.blob.core.windows.net`
- `skillaid-cdn.azureedge.net` → `ainomedia.blob.core.windows.net`
- Relative paths → Absolute Azure URLs

---

## 6. **Frontend-arkitektur**

### **Next.js App Router-struktur**

```
app/
├── admin/
│   ├── skrivestue/
│   │   ├── page.tsx              # Hovedadmin-side
│   │   └── writer/
│   │       ├── page.tsx          # Markdown-editor
│   │       ├── MarkdownEditor.tsx
│   │       ├── PreviewPane.tsx
│   │       └── MetadataPanel.tsx
│   └── layout.tsx
├── skrivestuen/
│   ├── kurs/
│   │   └── [slug]/
│   │       └── page.tsx          # Kurs-visning
│   └── [category]/
│       └── [location]/
│           └── [targetUser]/
│               └── page.tsx      # Filtrert kurs-listing
└── api/
    ├── content/
    │   ├── route.ts              # Kurs API
    │   └── [slug]/
    │       └── route.ts          # Enkelt kurs API
    └── progress/
        └── course/
            └── [courseId]/
                └── route.ts      # Progresjon API
```

### **Komponent-arkitektur**

#### **Admin-komponenter**
- **SkriveStueLayout:** Hovedlayout for admin
- **MarkdownEditor:** Rich text editor med preview
- **MetadataPanel:** Kurs-metadata redigering
- **ImportExportPanel:** Fil-import/export

#### **Bruker-komponenter**
- **CategoryGrid:** Kategori-basert navigasjon
- **ContentCard:** Kurs-kort med metadata
- **EiraDynamic:** AI-assistent integrasjon

### **Styling med Tailwind CSS v4**

#### **Konfigurasjon**
```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom color palette
      }
    }
  }
}
```

#### **Responsive Design**
- **Mobile-first** tilnærming
- **Breakpoints:** sm, md, lg, xl, 2xl
- **Custom components** med Tailwind utilities

---

## 7. **Miljøkonfigurasjon**

### **Backend (.env)**
```env
# Database
DATABASE_URL=postgresql://...

# Azure Storage
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=ainomedia;AccountKey=...;EndpointSuffix=core.windows.net
AZURE_STORAGE_URL=https://ainomedia.blob.core.windows.net
AZURE_STORAGE_CONTAINER=aino-media

# Server
PORT=3001
NODE_ENV=development
```

### **Frontend (.env)**
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001

# Image Domains (Next.js)
NEXT_PUBLIC_IMAGE_DOMAINS=ainomedia.blob.core.windows.net

# Environment
NODE_ENV=development
```

---

## 8. **Utviklingsarbeidsflyt**

### **Lokal utvikling**
```bash
# Backend
cd backend
npm run dev          # Starter på port 3001

# Frontend  
cd frontend
npm run dev          # Starter på port 3000
```

### **Database-migreringer**
```bash
# Generer migrasjon
npx drizzle-kit generate

# Kjør migrasjoner
npx drizzle-kit migrate
```

### **Bilde-migrering**
```bash
# Import eksisterende kurs med bilde-migrering
npm run import-courses
```

---

## 9. **Sikkerhet og Autentisering**

### **Rollebasert tilgangskontroll**
- **10 definerte roller** (superadmin → helsefagarbeider)
- **Hierarkisk tillatelse-system**
- **API-endepunkt beskyttelse**

### **Azure Storage sikkerhet**
- **Connection string** autentisering
- **Container-level** tilgangskontroll
- **HTTPS-only** tilgang

---

## 10. **Performance og Optimalisering**

### **Frontend**
- **Next.js Image Optimization**
- **React Query caching**
- **Code splitting** med App Router
- **Static generation** hvor mulig

### **Backend**
- **Connection pooling** med pg
- **Efficient queries** med Drizzle ORM
- **Azure CDN** for media-filer

### **Database**
- **Indexed queries** på slug og metadata
- **Efficient joins** med foreign keys
- **JSONB** for fleksibel metadata

---

## 11. **Deployment og DevOps**

### **Miljøer**
- **Development:** Lokal utvikling
- **Staging:** Test-miljø (planlagt)
- **Production:** Azure-hosting (planlagt)

### **Build-prosess**
```bash
# Backend
npm run build        # TypeScript compilation
npm start           # Production server

# Frontend
npm run build       # Next.js build
npm start          # Production server
```

---

## 12. **Fremtidige Utvidelser**

### **Planlagte funksjoner**
- **Real-time collaboration** med WebSockets
- **Advanced search** med full-text indexing
- **Analytics dashboard** for kurs-engasjement
- **Mobile app** med React Native
- **AI-powered content suggestions**

### **Tekniske forbedringer**
- **GraphQL API** for mer fleksible queries
- **Microservices** oppdeling
- **Event-driven architecture** med message queues
- **Advanced caching** med Redis

---

## 13. **Feilsøking og Vedlikehold**

### **Vanlige problemer**
1. **Port conflicts:** Sjekk at port 3001 er ledig for backend
2. **Azure connection:** Verifiser connection string
3. **Database connection:** Sjekk DATABASE_URL
4. **Image loading:** Verifiser Azure container permissions

### **Logging**
- **Backend:** Console.log med emoji-indikatorer
- **Frontend:** Browser DevTools
- **Database:** Drizzle query logging

### **Monitoring**
- **API response times**
- **Database query performance**
- **Azure Storage usage**
- **Error rates og exceptions**

---

## 14. **Konklusjon**

AINO er en robust, moderne læringsplattform bygget med beste praksis innen web-utvikling. Arkitekturen støtter skalerbarhet, vedlikeholdbarhet og fremtidige utvidelser.

**Nøkkelfunksjoner:**
- ✅ **Full CRUD** for kurs og innhold
- ✅ **Automatisk bilde-migrering** til Azure
- ✅ **Rollebasert tilgangskontroll**
- ✅ **Responsive design** med Tailwind CSS
- ✅ **Type-safe** utvikling med TypeScript
- ✅ **Efficient database** med Drizzle ORM
- ✅ **Modern frontend** med Next.js 15

**Teknisk gjeld:** Ingen kjent teknisk gjeld. Alle komponenter er oppdaterte og følger moderne standarder.

---

*Dokumentasjon oppdatert: 6. juli 2025*
*Versjon: 1.0* 