# aino
# 🧠 Aino

**Aino** er en modulær, AI-drevet plattform for kvalitetssikring, kunnskapsdeling, kursadministrasjon og velferdsteknologisk støtte – bygget med moderne webteknologi og full ISO 27001/AIAkt-kompatibilitet.

## 🚀 Teknisk arkitektur

- **Monorepo** med `frontend/` (Next.js 14) og `backend/` (Express.js + TypeScript)
- CI/CD med GitHub Actions
- Azure Key Vault for secrets
- PostgreSQL som database
- AI-veileder **Eira** integrert med RAG

## 📚 Hovedmoduler

- **Bibliotek**: Markdown-parser med 13 kategorier og fallback
- **Kurs**: Strukturert `kurs → nanoer → units`, med metadata og visning
- **Dashboards**:
  - For assistenter, helsefagarbeidere og sykepleiere
  - For avdelingsledere, fagsykepleiere og prosjektledere

## 👤 Brukerroller

- Assistent
- Helsefagarbeider
- Sykepleier
- Fagsykepleier
- Avdelingsleder
- Prosjektleder (velferdsteknologi)

## 🧪 Lokal utvikling

```bash
# Start backend
cd backend && pnpm dev

# Start frontend
cd frontend && pnpm dev
