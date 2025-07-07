# AINO Deployment Guide

## 🚀 Miljøer og Deploy-Flyt

### Miljøstruktur
- **Development**: Lokalt (localhost:3000) - Alltid åpen
- **Staging**: staging.ainomobil.no - Alltid åpen for testing
- **Production**: ainomobil.no - Passordbeskyttet

### Git-Grener
- `main` → Produksjon (ainomobil.no)
- `staging` → Staging-miljø
- `feature/*` → Funksjonsgrener

## 🔐 Passordbeskyttelse

### Produksjon (ainomobil.no)
Passordbeskyttelse er aktivert via middleware når:
- `NODE_ENV=production` (automatisk i Azure)
- `NEXT_PUBLIC_PROTECTED=true`

**Standard credentials:**
- Brukernavn: `aino`
- Passord: `aino2025`

### Staging og Development
- **Ingen passordbeskyttelse** - alltid åpen
- `NEXT_PUBLIC_PROTECTED=false`

## ⚙️ Miljøvariabler

### Lokal utvikling (.env)
```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_AZURE_STORAGE_URL=https://ainomedia.blob.core.windows.net
NEXT_PUBLIC_AZURE_STORAGE_CONTAINER=aino-media
NEXT_PUBLIC_PROTECTED=false
BASIC_AUTH_USERNAME=aino
BASIC_AUTH_PASSWORD=aino2025
```

### Produksjon (Azure Portal)
```bash
NEXT_PUBLIC_BACKEND_URL=https://aino-backend.azurewebsites.net
NEXT_PUBLIC_AZURE_STORAGE_URL=https://ainomedia.blob.core.windows.net
NEXT_PUBLIC_AZURE_STORAGE_CONTAINER=aino-media
NEXT_PUBLIC_PROTECTED=true
BASIC_AUTH_USERNAME=aino
BASIC_AUTH_PASSWORD=aino2025
```

### Staging (Azure Portal)
```bash
NEXT_PUBLIC_BACKEND_URL=https://aino-backend.azurewebsites.net
NEXT_PUBLIC_AZURE_STORAGE_URL=https://ainomedia.blob.core.windows.net
NEXT_PUBLIC_AZURE_STORAGE_CONTAINER=aino-media
NEXT_PUBLIC_PROTECTED=false
BASIC_AUTH_USERNAME=aino
BASIC_AUTH_PASSWORD=aino2025
```

## 🔄 Deploy-Prosess

### 1. Funksjonsutvikling
```bash
git checkout -b feature/ny-funksjon
# Utvikle og teste lokalt
git push origin feature/ny-funksjon
```

### 2. Staging Deploy
```bash
# Opprett PR til staging
git checkout staging
git merge feature/ny-funksjon
git push origin staging
# Automatisk deploy til staging.ainomobil.no
```

### 3. Produksjon Deploy
```bash
# Kun etter QA på staging
git checkout main
git merge staging
git push origin main
# Automatisk deploy til ainomobil.no (med passordbeskyttelse)
```

## 🛠️ Azure Setup

### Produksjon (ainomobil.no)
1. Azure Static Web App
2. Custom domain: ainomobil.no
3. Miljøvariabler satt i Azure Portal
4. `NEXT_PUBLIC_PROTECTED=true`

### Staging (staging.ainomobil.no)
1. Ny Azure Static Web App
2. Custom domain: staging.ainomobil.no
3. Miljøvariabler satt i Azure Portal
4. `NEXT_PUBLIC_PROTECTED=false`

## 🔧 GitHub Actions

### Secrets som må settes
- `AZURE_STATIC_WEB_APPS_API_TOKEN_PRODUCTION`
- `AZURE_STATIC_WEB_APPS_API_TOKEN_STAGING`
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_AZURE_STORAGE_URL`
- `NEXT_PUBLIC_AZURE_STORAGE_CONTAINER`
- `NEXT_PUBLIC_PROTECTED`
- `BASIC_AUTH_USERNAME`
- `BASIC_AUTH_PASSWORD`

### Automatisk Deploy
- Push til `staging` → Deploy til staging-miljø
- Push til `main` → Deploy til produksjon

## 🚨 Sikkerhet

### Branch Protection
- `main` krever PR med godkjenning
- `staging` krever PR med godkjenning
- Ingen direkte push til `main`

### Miljøvariabler
- Aldri commit `.env` filer
- Bruk `.env.example` som mal
- Sett alle secrets i Azure Portal

## 📋 Checklist for Ny Deploy

### Før Deploy
- [ ] Testet lokalt
- [ ] PR til staging godkjent
- [ ] Testet på staging
- [ ] Miljøvariabler satt i Azure

### Etter Deploy
- [ ] Verifisert staging fungerer
- [ ] Verifisert produksjon fungerer
- [ ] Passordbeskyttelse aktiv på produksjon
- [ ] Staging åpen for testing

## 🆘 Feilsøking

### Passordbeskyttelse fungerer ikke
1. Sjekk `NEXT_PUBLIC_PROTECTED=true` i Azure
2. Verifiser `NODE_ENV=production`
3. Test middleware lokalt

### Deploy feiler
1. Sjekk GitHub Actions logs
2. Verifiser Azure Static Web App status
3. Sjekk miljøvariabler i Azure Portal 