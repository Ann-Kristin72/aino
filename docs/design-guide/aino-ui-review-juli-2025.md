# Forbedringsforslag – Min Aino dashboard (UI-vurdering juli 2025)

Denne evalueringen gjelder `min-aino` etter implementering av ny fargepalett. Uttrykket er helhetlig, varmt og oversiktlig – men vi anbefaler noen justeringer for ytterligere forbedring.

---

## ✅ Det som fungerer godt

- Gradient-bakgrunn: Vennlig, myk og harmonisk med kortfargene.
- Struktur: Kortene er ryddig plassert i to kolonner og matcher logoens palett.
- Visuell stil: Eira + snakkeboble skaper god tilstedeværelse.
- Farger: Nå 100 % synkronisert med Aino-logoen og `standard-color-palette.md`.

---

## Forslag til forbedring

### 2. Typografi

| Element      | Nåværende | Forslag               | Begrunnelse                        |
|--------------|-----------|------------------------|------------------------------------|
| Overskrifter | Sans-serif | `font-nunito`          | Vennlig, rund og lesbar            |
| Brødtekst    | Sans-serif | `font-inter`           | UI-optimalisert og moderne         |
| UI-elementer | Sans-serif | `font-inter`           | Holder systemfølelse i knapper     |

> Tips: Legg til `Nunito` og `Inter` via Tailwind `extend.fontFamily`.

---

### 3. Snakkeboble (Eira-komponenten)

| Problem | Snakkeboblen er litt bred – lite mobilvennlig |
|---------|-----------------------------------------------|
| Løsning | Legg til `max-w-md` eller `max-w-lg`          |

---

### 4. Hover-effekter på kort

| Nå | Ingen hover-effekt               |
|----|----------------------------------|
| Ønsket | `hover:shadow-lg` og `transition-all` |

Gir bedre interaktiv følelse ved musover.

---

### 5. Heading «Kjernefunksjoner»

| Nå | Litt anonym – drukner mot innholdet |
|----|-------------------------------------|
| Forslag | Bruk `text-xl font-semibold` + ikon (🧩 / 📚) |

---

### 6. Spacing mellom snakkeboble og kort

| Nå | Litt tett, særlig på mindre skjermer |
|----|--------------------------------------|
| Løsning | Legg til `mt-6` eller `gap-y-6` mellom seksjoner |

---

## ⏭️ Neste steg

Disse justeringene vil ytterligere styrke:
- Universell utforming
- Lesbarhet og taktil tilbakemelding
- Helhetlig systemfølelse

---

📁 Legg denne filen i: `docs/design-guide/aino-ui-review-juli-2025.md`  
📣 Del gjerne med Cursor eller frontendteamet for oppfølging.

---

_Designagent: Eira.stil – juli 2025_ 