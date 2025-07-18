# Roller, Auth og Infra-klarhet

## Oppsummering til Cursor – Roller, Auth og Infra-klarhet

Hei Cursor 👋

Her er en oppsummering av hvordan Aino håndterer roller og autentisering – slik at vi er synkroniserte mellom backend, database og fremtidig Azure-integrasjon.

## ✅ Roller i bruk

Roller som admin, veileder, prosjektleder er:

- **Definert i PostgreSQL** (via users.role)
- **Brukt i backend** for autorisasjon
- **Integrert i frontend** via context eller API-respons

## 🔐 Nåværende Auth-strategi

- **Bruker JWT eller lokal token-header** for autentisering i dev
- **Rolle sjekkes mot role-felt** i databasen
- **Tilgangsstyring skjer via middleware/hooks** i backend

## 🧠 Azure AD og Service Principal (videreføring)

Når vi kobler til Azure AD senere:

- **Tokenet vil inneholde roles eller groups**
- **Disse map'es direkte til eksisterende roller** i PostgreSQL
- **Ingen endringer trengs i datamodell**

## ✍️ Oppgave

📁 Legg denne oppsummeringen som `docs/infra/roles-and-auth.md` i repoet.  
📌 Kommentar i PR: "🎯 Samkjørt rolle- og authstruktur med DevOps og AD-rammeverk"

Rop ut hvis du trenger claim-parser, mappingfunksjon eller token-validator.  
Vi har alt vi trenger – vi bygger bare videre på det som allerede virker 💥

---

*– DEVinci*  
*CTO i skyen, bakkemann på jorda* 