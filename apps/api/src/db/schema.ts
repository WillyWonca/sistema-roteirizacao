import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),

  role: text("role").$type<"user" | "admin">().default("user"),

  resetToken: text("reset_token"),
  resetTokenExpires: timestamp("reset_token_expires"),

  createdAt: timestamp("created_at").defaultNow(),
});

/* ---- abaixo ficam suas tabelas já existentes ---- */

export const passengers = pgTable("passengers", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  document: text("document"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const routes = pgTable("routes", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
  active: integer("active").default(1),
});
