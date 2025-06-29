# 🧠 Aino - Frontend og Design Utfordringer

## 📋 **Teknisk Arkitektur - Oppsummering**

### **🏗️ Prosjektstruktur**
- **Monorepo** med pnpm workspace
- **Frontend**: Next.js 15.3.3 (App Router) + React 19
- **Backend**: Tom mappe (backend/ er tom)
- **Database**: PostgreSQL på Azure med Drizzle ORM
- **Styling**: Tailwind CSS v4

### **🔧 Teknologistakk**
```
Frontend:
├── Next.js 15.3.3 (App Router)
├── React 19 + React DOM 19
├── TypeScript 5
├── Tailwind CSS 4.1.10
├── TanStack React Query 5.80.7
├── Drizzle ORM 0.44.2
├── Zod 3.25.64 (validering)
└── PostgreSQL driver

Database:
├── PostgreSQL (Azure)
├── Drizzle ORM
├── Schema: users, roles, userRoles, library
└── Migrations via drizzle-kit
```

### **📁 Mappestruktur**
```
aino/
├── frontend/          # Next.js app
│   ├── app/          # App Router pages
│   ├── components/   # UI komponenter
│   ├── lib/          # Utilities
│   └── drizzle/      # Database schema
├── backend/          # Tom (mangler)
├── drizzle/          # Database migrasjoner
├── docs/            # Dokumentasjon
└── @aino/core/      # Delte komponenter
```

## 🚨 **Kritiske Mangler og Problemer**

### **1. Backend mangler helt**
- `backend/` mappen er tom
- Ingen API-server å kjøre
- Frontend må håndtere database direkte

### **2. Database Schema er begrenset**
- Kun 4 tabeller: users, roles, userRoles, library
- Mangler content, admins, og andre nødvendige tabeller

### **3. API Routes er ufullstendige**
- `/api/admins` - fungerer
- `/api/roles` - fungerer  
- `/api/content` - feiler (mangler content tabell)
- `/api/media` - eksisterer men ikke implementert

## 🎨 **Design- og Frontend Utfordringer**

### **1. Tailwind CSS Problemer**
```
[Error: Cannot apply unknown utility class `bg-gray-50`. 
Are you using CSS modules or similar and missing `@reference`?]
```
- **Problem**: Tailwind CSS v4 hadde problemer med utility classes
- **Årsak**: Ny versjon av Tailwind med endret syntax
- **Løsning**: Måtte oppdatere til riktig Tailwind-konfigurasjon

### **2. Komponent-import Feil**
```
Module not found: Can't resolve '@/lib/api/admins'
Module not found: Can't resolve '@tanstack/react-query'
```
- **Problem**: Manglende API-helper filer
- **Årsak**: Komponenter refererte til filer som ikke eksisterte
- **Løsning**: Måtte lage manglende API-filer og installere dependencies

### **3. Client/Server Component Konflikter**
```
Error: You're importing a class component. It only works in a Client Component 
but none of its parents are marked with "use client"
```
- **Problem**: Next.js App Router krever eksplisitt "use client" directive
- **Årsak**: Klassiske React-komponenter i Server Components
- **Løsning**: Måtte legge til "use client" eller konvertere til funksjonelle komponenter

### **4. Database Tabell Mangler**
```
Error: relation "content" does not exist
```
- **Problem**: Frontend prøvde å hente fra ikke-eksisterende tabeller
- **Årsak**: Database schema var ikke synkronisert med kode
- **Løsning**: Måtte opprette manglende tabeller og migrasjoner

### **5. Next.js Config Problemer**
```
Invalid next.config.js options detected: 
Unrecognized key(s) in object: 'swcMinify'
```
- **Problem**: Utdaterte Next.js konfigurasjon
- **Årsak**: swcMinify er ikke lenger nødvendig i Next.js 15
- **Løsning**: Måtte oppdatere next.config.js

### **6. Port-konflikter**
```
Port 3000 is in use, using available port 3001 instead
```
- **Problem**: Flere server-instanser kjørte samtidig
- **Årsak**: Ikke riktig avsluttet tidligere prosesser
- **Løsning**: Måtte kjøre `pkill -f node` for å rydde opp

### **7. Webpack Cache Problemer**
```
[Error: ENOENT: no such file or directory, stat '...webpack/server-development/2.pack.gz']
```
- **Problem**: Korrupt webpack cache
- **Årsak**: Ufullstendig bygg eller avbrutt prosess
- **Løsning**: Måtte rydde .next cache

### **8. Async/Await API Route Problemer**
```
Error: Route "/api/admins/[id]" used `params.id`. 
`params` should be awaited before using its properties.
```
- **Problem**: Next.js 15 krever async params
- **Årsak**: Utdatert API route syntax
- **Løsning**: Måtte oppdatere til `const id = await params.id`

## 🔧 **Hvordan Dette Ble Løst**

### **1. Git Reset til Stabil Versjon**
```bash
git reset --hard origin/main
```
- Rullet tilbake til siste fungerende versjon
- Fjernet alle eksperimentelle endringer

### **2. Dependency Opprydding**
```bash
pnpm install
```
- Sikret at alle dependencies var riktig installert
- Oppdaterte lockfile

### **3. Server Restart**
```bash
cd frontend && pnpm dev
```
- Startet på nytt med ren cache
- Brukte riktig port (3000)

## 📊 **Status Nå**

✅ **Fungerer:**
- Frontend starter på http://localhost:3000
- Database-tilkobling fungerer
- `/api/admins` API fungerer
- Grunnleggende routing fungerer

❌ **Mangler fortsatt:**
- Backend server
- Content management system
- Admin dashboard funksjonalitet
- Eira AI-integrasjon

## 💡 **Lærdommer**

1. **Inkrementell utvikling** - ikke gjør for mange endringer samtidig
2. **Git commits** - commit ofte for å kunne rulle tilbake
3. **Dependency management** - hold dependencies oppdatert
4. **Testing** - test hver endring før neste
5. **Cache management** - rydd cache ved problemer

## 🚀 **Forslag til Veikart**

### **Fase 1: Stabilisering (1-2 uker)**
1. **Lage backend server** (Express.js + TypeScript)
2. **Utvide database schema** med manglende tabeller
3. **Fikse API routes** og error handling
4. **Teste full funksjonalitet**

### **Fase 2: Funksjonalitet (2-3 uker)**
1. **Implementere admin dashboard** fullt ut
2. **Lage content management system**
3. **Brukerautentisering og roller**
4. **Eira AI-integrasjon**

### **Fase 3: Avansert (3-4 uker)**
1. **AI-agenter (Eira, Teknotassen)**
2. **Kurs- og læringssystem**
3. **Kommunikasjonsmodul**
4. **Rapportering og analytics**

---

*Dokumentet oppdatert: $(date)*
*Ansvarlig: Ann-Kristin Johansen* 