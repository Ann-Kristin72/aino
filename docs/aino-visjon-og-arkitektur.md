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