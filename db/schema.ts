import { pgTable, varchar, text, timestamp, index, uniqueIndex, integer } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  shortCode: varchar('short_code', { length: 10 }).notNull(),
  originalUrl: text('original_url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
}, (table) => ({
  shortCodeIdx: uniqueIndex('short_code_idx').on(table.shortCode),
  userIdIdx: index('user_id_idx').on(table.userId),
}));

// TypeScript type inference
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
