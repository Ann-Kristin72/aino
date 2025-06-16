#!/bin/bash

echo "🚮 Starter opprydding av gamle frontend-filer..."

# Gå til frontend-mappen
cd frontend || exit 1

# Slett gamle komponenter og hooks relatert til bibliotek/kurs
rm -rf app/bibliotek
rm -rf app/dashboard
rm -f app/layout.tsx.backup
rm -f app/not-found.tsx.backup

# Fjern gamle hooks
find . -name "useCourse.ts" -delete
find . -name "useProgress.ts" -delete
find . -name "*Bibliotek*.tsx" -delete
find . -name "*Course*.tsx" -delete
find . -name "*Unit*.tsx" -delete

# Slett gamle komponenter hvis eksisterer
rm -rf components/bibliotek
rm -rf components/course
rm -rf components/unit
rm -rf components/dashboard

# Rydd opp i .next og cache
rm -rf .next

# Meld ferdig
echo "✅ Opprydding fullført. Klar for ny start!" 