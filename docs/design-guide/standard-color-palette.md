# Aino Standard Color Palette

## Oversikt
Dette dokumentet definerer den offisielle standard-paletten for Aino-plattformen. Disse fargene skal brukes konsistent på tvers av alle komponenter og sider.

## Standard-Palett

### Primære Farger

| Farge | Hex-kode | Bruk |
|-------|----------|------|
| Aino Orange | `#FF9F6B` | Kvalitetssystem, SkriveStuen |
| Aino Light Green | `#CBCCAC` | Oppgavedeling |
| Aino Teal | `#549D91` | Sikker kommunikasjon |
| Aino Yellow | `#FDBD5D` | Prosessveiledning (Teknotassen) |
| Aino Dark Teal | `#3D897D` | Tilgangsstyring Kunde |
| Aino Light Teal | `#76BBB9` | SkriveStuen |

## Implementering

### Frontend
Fargene er implementert i `frontend/app/min-aino/page.tsx` som inline styles for å unngå endringer i Tailwind konfigurasjonen.

### Komponenter
- `AdminCard` komponenten støtter nå `backgroundColor` prop for å bruke standard-paletten
- Alle kort på min-aino siden bruker disse fargene

## Viktige Noter

1. **Konsistens**: Disse fargene skal brukes eksakt som definert - ikke endre hex-kodene
2. **Tilgjengelighet**: Tekst på kortene er hvit for god kontrast mot alle bakgrunnsfargene
3. **Hover-effekter**: Beholdt eksisterende hover-effekter (brightness-105, shadow-lg, scale-105)

## Fremtidig Bruk

Når nye komponenter eller sider lages, skal denne standard-paletten brukes for å opprettholde visuell konsistens på tvers av Aino-plattformen.

---

**Sist oppdatert**: $(date)
**Implementert av**: Development Team
**Godkjent av**: Design Team 