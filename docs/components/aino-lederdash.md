# 🧩 Aino-komponenter – Lederdashboard

Dette biblioteket inneholder gjenbrukbare UI-komponenter for Aino-plattformens lederdashbord. Komponentene er bygget for å være vennlige, universelt utformet og knyttet til de fem hovedmodulene i Aino.

---

## 🎯 Mål

- Skape gjenkjennelighet og trygghet
- Understøtte rollebasert navigasjon
- Vise fremdrift og status tydelig
- Integrere AI-agenter (Eira, Teknotassen)

---

## 🧱 Komponenter

### `ModuleCard`

**Bruk:** Viser én hovedmodul (f.eks. «Kvalitetssystem») i dashbordet.

**Props:**
- `title`: Navn på modul
- `description`: Kort forklaring
- `icon`: Modulikon (emoji eller svg)
- `color`: Modulens hovedfarge
- `eiraSprite`: Agent-avatar (f.eks. `eira-neutral.png`)
- `indicators`: Liste over statusikoner (f.eks. alert, progress)

---

### 📦 Eksempel

```tsx
<ModuleCard
  title="Teknotassen"
  description="Støtte til trygg teknologiinnføring"
  icon={<CogIcon />}
  color="#0CA9A3"
  eiraSprite="/sprites/teknotassen.png"
  indicators={[{ type: "progress", value: 72 }]}
/>
```

### 🎨 Designsystem

#### Farger
- Kvalitetssystem: `#2563EB` (blå)
- Innhold/Læring: `#16A34A` (grønn)
- Teknotassen: `#0CA9A3` (turkis)
- Oppgavedeling: `#9333EA` (lilla)
- Kommunikasjon: `#EA580C` (oransje)

#### Typografi
- Tittel: `Inter 18px Bold`
- Beskrivelse: `Inter 14px Regular`
- Indikatorer: `Inter 12px Medium`

#### Spacing
- Padding: `24px`
- Gap mellom elementer: `16px`
- Margin mellom kort: `24px`

#### Animasjoner
- Hover: Subtle scale (1.02) + shadow increase
- Click: Scale down (0.98)
- Eira: Breathing animation på sprite

---

## 🔄 States

### Normal
- Standard opasitet
- Lett skygge
- Nøytral Eira-sprite

### Hover
- Økt opasitet (1.0)
- Større skygge
- Eira-sprite smiler

### Disabled
- Redusert opasitet (0.6)
- Ingen skygge
- Gråtonet
- Eira-sprite "sover"

---

## 📱 Responsivitet

### Desktop (>1200px)
- 3 kort per rad
- Full funksjonalitet

### Tablet (768px-1200px)
- 2 kort per rad
- Kompakt visning av indikatorer

### Mobil (<768px)
- 1 kort per rad
- Forenklet visning
- Skjuler enkelte indikatorer

---

## ♿️ Universell utforming

- WCAG 2.1 AA-kompatibel
- Tastaturnavigasjon
- Høy kontrast-modus støtte
- Skjermleser-optimalisert
- Animasjoner kan deaktiveres 