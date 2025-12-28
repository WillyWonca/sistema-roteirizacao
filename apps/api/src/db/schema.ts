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
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  document: text("document").notNull().unique(),
  address: text("address"),
  passwordHash: text("password_hash").notNull(),
  role: text("role").$type<"user" | "admin">().default("user"),
  resetToken: text("reset_token"),
  resetTokenExpires: timestamp("reset_token_expires"),
  createdAt: timestamp("created_at").defaultNow(),
  twoFactorEnabled: integer("two_factor_enabled").default(0),
  twoFactorCode: text("two_factor_code"),
  twoFactorExpires: timestamp("two_factor_expires"),
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
