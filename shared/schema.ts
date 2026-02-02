import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const responses = pgTable("responses", {
  id: serial("id").primaryKey(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertResponseSchema = createInsertSchema(responses).omit({
  id: true,
  createdAt: true,
});

export type Response = typeof responses.$inferSelect;
export type InsertResponse = z.infer<typeof insertResponseSchema>;

export const imageCategories = ["cute", "baddie", "beautiful", "sanskari"] as const;
export type ImageCategory = typeof imageCategories[number];

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertImageSchema = createInsertSchema(images).omit({
  id: true,
  createdAt: true,
});

export type Image = typeof images.$inferSelect;
export type InsertImage = z.infer<typeof insertImageSchema>;
