import { db } from '../backend/drizzle/db';
import { categories } from '../backend/drizzle/schema';

const categoryList = [
  "Ernæring og kosthold",
  "Forebygging og beredskap",
  "Introduksjon til nyansatte",
  "Kommunikasjon",
  "Lokasjon og rom",
  "Lovverk",
  "Observasjon og dokumentasjon",
  "Psykisk helse og rus",
  "Smittevern og hygiene",
  "Sykdommer og tiltak",
  "Utviklingshemming",
  "Ved livets slutt",
  "Velferdsteknologi"
];

async function seed() {
  for (const name of categoryList) {
    await db.insert(categories).values({ name }).onConflictDoNothing();
  }
  console.log('✅ Seeded categories');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Error seeding categories:', err);
  process.exit(1);
}); 