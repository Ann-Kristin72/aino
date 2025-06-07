import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  varchar,
  integer,
  boolean
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Kategori-tabell
export const kategori = pgTable('kategori', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  tittel: varchar('tittel', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasjoner for kategori
export const kategoriRelations = relations(kategori, ({ many }) => ({
  kurs: many(kurs)
}));

// Kurs-tabell
export const kurs = pgTable('kurs', {
  id: serial('id').primaryKey(),
  kategoriId: integer('kategori_id').notNull().references(() => kategori.id),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  tittel: varchar('tittel', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasjoner for kurs
export const kursRelations = relations(kurs, ({ one, many }) => ({
  kategori: one(kategori, {
    fields: [kurs.kategoriId],
    references: [kategori.id],
  }),
  nanoer: many(nano)
}));

// Nano-tabell
export const nano = pgTable('nano', {
  id: serial('id').primaryKey(),
  kursId: integer('kurs_id').notNull().references(() => kurs.id),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  tittel: varchar('tittel', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasjoner for nano
export const nanoRelations = relations(nano, ({ one, many }) => ({
  kurs: one(kurs, {
    fields: [nano.kursId],
    references: [kurs.id],
  }),
  units: many(unit)
}));

// Unit-tabell
export const unit = pgTable('unit', {
  id: serial('id').primaryKey(),
  nanoId: integer('nano_id').notNull().references(() => nano.id),
  slug: varchar('slug', { length: 50 }).notNull().unique(),
  tittel: varchar('tittel', { length: 255 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  markdown: text('markdown'),
  innholdUrl: varchar('innhold_url', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relasjoner for unit
export const unitRelations = relations(unit, ({ one }) => ({
  nano: one(nano, {
    fields: [unit.nanoId],
    references: [nano.id],
  })
})); 