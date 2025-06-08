# Metadata-mal for Aino-kursmoduler

Dette er standardmalen for metadata i Aino-kursmoduler. All metadata skal plasseres øverst i markdown-filen, innkapslet i YAML-frontmatter (mellom `---`).

## 📝 Eksempel på bruk

```markdown
---
# Grunnleggende informasjon
title: "Toalettbesøk – prosedyre"
description: "Detaljert prosedyre for assistanse ved toalettbesøk"
version: "1.0.0"
last_updated: "2025-06-08"

# Målgruppe og roller
target_roles:
  - assistent
  - helsefagarbeider
  - sykepleier

# Gyldighet og lokasjon
valid_from: "2025-06-08"
valid_until: "2026-12-01"
localization: "Hjemmetjeneste, avdeling B"

# Kategorisering
tags:
  - hygiene
  - omsorg
  - hverdag
  - prosedyre

# Relasjoner til andre dokumenter
linked_procedures:
  - hygiene_rutiner_v2
  - personlig_hygiene_basis
linked_quizzes:
  - quiz_hygiene_basics
  - quiz_toalettrutiner

# Opplæring og sertifisering
required_training: false
certification_required: false
estimated_duration_minutes: 15

# Metadata for AI-prosessering
ai_tags:
  - type: "prosedyre"
  - complexity: "basic"
  - priority: "high"
---

## Slik gjennomfører du toalettbesøk

1. Hils på bruker og forklar hva som skal skje
2. Sikre at alt nødvendig utstyr er tilgjengelig...
```

## 🔍 Feltbeskrivelser

### Påkrevde felter
- `title`: Tittel på dokumentet (maks 255 tegn)
- `description`: Kort beskrivelse av innholdet
- `version`: Semantisk versjonsnummer (MAJOR.MINOR.PATCH)
- `target_roles`: Liste over roller som skal ha tilgang
- `valid_from`: Startdato for gyldighet (YYYY-MM-DD)
- `valid_until`: Sluttdato for gyldighet (YYYY-MM-DD)

### Valgfrie felter
- `localization`: Spesifikk avdeling eller lokasjon
- `tags`: Liste over relevante emneord
- `linked_procedures`: Relaterte prosedyrer
- `linked_quizzes`: Tilknyttede kunnskapstester
- `required_training`: Om opplæring er påkrevd (true/false)
- `certification_required`: Om sertifisering er påkrevd (true/false)
- `estimated_duration_minutes`: Estimert tidsbruk i minutter
- `ai_tags`: Metadata for AI-prosessering

## 🤖 AI-prosessering

AI-agenten Eira bruker metadata for å:
1. Kategorisere innhold
2. Matche innhold med brukerroller
3. Foreslå relevant innhold basert på kontekst
4. Generere quiz og læringsstier

## ✅ Validering

Alle markdown-filer med denne metadatastrukturen valideres av:
1. CI/CD pipeline ved commit
2. Parser ved innlasting
3. AI-agent ved prosessering

## 📚 Beste praksis

1. Hold metadata oppdatert
2. Bruk konsistente tags
3. Sjekk gyldighet regelmessig
4. Lenk relatert innhold
5. Inkluder AI-tags for bedre matching

---

For teknisk dokumentasjon om parser og validering, se `@aino/core`-dokumentasjonen. 