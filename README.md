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
# 🛠️ Teknisk logg – Aino backend oppsett

> Sist oppdatert: 2025-06-08
> Ansvarlig: Ann-Kristin Johansen

## ✅ Oppsummering

Oppsett av backend, database og migrasjoner er fullført og fungerer som forventet. Prosjektet kjører lokalt på port `3001`, med fungerende ruter og databasekobling.

---

## 🚀 Teknisk gjennomføring

### Miljøvariabler

* `.env` ble oppdatert med korrekt koblingsstreng til Azure PostgreSQL:

  ```env
  DATABASE_URL=postgresql://aino:1Plomme3@aino-db-2025.postgres.database.azure.com:5432/postgres?sslmode=require
  ```
* `.env.example` ble redigert for å fjerne sensitive verdier.

### Drizzle konfigurering

* `drizzle.config.ts` oppdatert med:

  ```ts
  import type { Config } from "drizzle-kit";
  import "dotenv/config";

  export default {
    schema: "./drizzle/schema.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
      connectionString: process.env.DATABASE_URL!,
    },
  } satisfies Config;
  ```
* `pnpm drizzle-kit push` verifisert med suksess ✅

### DB-test

* Testfil `test-db.ts` bekreftet tilkobling med utskrift:

  ```
  ✅ Tilkobling OK! Tid fra DB: <timestamp>
  ```

### Lokal server

* Startes med: `pnpm dev`
* Vellykket oppstart:

  ```
  🚀 Server running on port 3001
  ```
* Helse-sjekk fungerer på: `http://localhost:3001/health`

## 📦 Avhengigheter og CLI

* Homebrew installert og `libpq` lenket via `brew link --force libpq`
* `dotenv`, `pg`, `drizzle-kit`, `tsx`, `ts-node-dev` installert

## 🧠 Erfaringer / feilkilder

* Brukernavn **kan ikke** inneholde `_` i Azure DB (f.eks. `aino_admin` feilet)
* Passord med spesialtegn må URL-encodes (`#` → `%23`, `@` → `%40`)
* Viktig å bruke riktig *database-navn* i URL (her: `postgres`, ikke `aino`)

## 🔐 Neste steg – ISO 27001

* Miljøvariabler skal **ikke** versjoneres.
* `.env.example` skal inneholde placeholder:

  ```env
  DATABASE_URL=postgresql://<user>:<pass>@<host>:<port>/<db>?sslmode=require
  ```
* Dokumenter roller og tilgangsnivå (RBAC)
* Sett opp logging og audit trail for datatilgang

---

## ✅ Git commit

```bash
git add .
git commit -m "✨ Initial backend setup with working DB connection and routes"
git push
```

---

Dette dokumentet kan brukes som logg, mal for ny oppstart eller som grunnlag for sikkerhetsrevisjoner (ISO 27001, AI Act m.m).
# 📘 Aino – Visjon, Struktur og Veikart

## 🎯 Overordnet visjon

Aino er en AI-drevet lærings- og prosessplattform designet for å redde grunnstrukturene i helse- og omsorgstjenestene. Den bygger på innsikten om at opplæring og kvalitetssikring må være lavterskel, hyperrelevant og kontinuerlig – levert i det øyeblikket kunnskap trengs.

## 🔍 Fire megatrender og tekniske løsninger

### 1. **Sikker kommunikasjon**

* **Autentisering:** BankID eller Azure AD B2C
* **Kommunikasjon:** Kryptert WebSocket-basert meldingssystem
* **Eira-deltakelse:** Veileder i samtaler, foreslår kunnskapsmoduler
* **Ikke-journalpliktig, men søkbart og anonymiserbart**

### 2. **Innholdsbasert kvalitetssystem**

* **Markdown + YAML:** Med metadata for roller, gyldighet, revisjon
* **Prosedyregenerator:** Eira + strengt malbasert input
* **Distribusjon:** QR, lenker, mobilvisning, push
* **Versjonering:** Git-basert historikk og revisjonsspor

### 3. **Oppgavetildeling og kompetansestyring**

* **Oppgaver med metadata:** Kompleksitet, krav, lenkede moduler
* **AI-agent for egnethet:** Matcher personlighet/ferdigheter til oppgaver
* **Dashboard:** Tildel oppgaver, få innsikt og forslag

### 4. **Digital prosessveileder for velferdsteknologi**

* **Prosess-stier:** Sjekklister + moduler + ansvarlig + varsler
* **AI-coach:** Eks. "TeknolTassen" eller Eira
* **Helhetlig tjenestemodell:** Basert på stegvis mestring og kompetansetilførsel

## 🧠 Agentdesign

| Agent            | Rolle                 | Stil                       |
| ---------------- | --------------------- | -------------------------- |
| **Eira**         | Veileder/fagstøtte    | Presis, tydelig, nøytral   |
| **TeknolTassen** | Teknologiintroduksjon | Ufarlig, pedagogisk, leken |
| **RekruttBot**   | Egnethetskartlegging  | Nøytral, intervjuformat    |
| **VeilederBot**  | Prosess-støtte        | Strukturert og instruktiv  |

## 📚 Kursbank og metadata

Eksempel på `README.md` med YAML:

```markdown
---
title: "Toalettbesøk – prosedyre"
target_roles:
  - assistent
  - helsefagarbeider
valid_until: 2026-12-01
tags:
  - hygiene
  - omsorg
  - hverdag
localization: "Hjemmetjeneste, avdeling B"
linked_procedures:
  - hygiene_rutiner_v2
linked_quizzes:
  - quiz_hygiene_basics
---

## Slik gjennomfører du toalettbesøk
1. Hils på bruker og forklar hva som skal skje
2. Sikre at alt nødvendig utstyr er tilgjengelig...
```

## 📦 Moduler

* `@aino/core`: Parser, innhold, metadata
* `@aino/agents`: Eira, TeknolTassen, RekruttBot m.fl.
* `@aino/frontend-dashboard`: React/Next.js 14-app
* `@aino/backend-api`: Express.js med Postgres

## ✅ Neste steg

1. Lage roadmap i GitHub Projects (epics, milepæler, tasks)
2. Verifisere metadata mot eksisterende MD-filer
3. Bygge ut `@aino/core` med parser og validering
4. Starte med første AI-agent og kursmodul

---

Dette dokumentet fungerer som grunnmuren for alle videre diskusjoner, moduler og prioriteringer i Aino-prosjektet.
# Trigger new deploy
