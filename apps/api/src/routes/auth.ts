import { Router } from "express";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// REGISTER
authRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (exists.length > 0)
    return res.status(400).json({ error: "email already registered" });

  const hash = await bcrypt.hash(password, 10);

  await db.insert(users).values({
    name,
    email,
    passwordHash: hash,
  });

  return res.json({ ok: true });
});

// LOGIN
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [user] = await db.select().from(users).where(eq(users.email, email));

  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: "invalid credentials" });

  const token = jwt.sign(
    { sub: user.id, role: user.role },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.json({ token });
});

// ME
authRouter.get("/me", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);

  const [, token] = auth.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return res.json(decoded);
  } catch {
    return res.sendStatus(401);
  }
});

// REQUEST RESET
authRouter.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 15 * 60 * 1000);

  await db
    .update(users)
    .set({
      resetToken: token,
      resetTokenExpires: expires,
    })
    .where(eq(users.email, email));

  console.log("RESET LINK: http://localhost:5173/reset/" + token);

  return res.json({ ok: true });
});

// RESET PASSWORD
authRouter.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.resetToken, token));

  if (!user) return res.status(400).json({ error: "invalid token" });

  if (!user.resetTokenExpires || user.resetTokenExpires < new Date())
    return res.status(400).json({ error: "expired token" });

  const hash = await bcrypt.hash(password, 10);

  await db
    .update(users)
    .set({
      passwordHash: hash,
      resetToken: null,
      resetTokenExpires: null,
    })
    .where(eq(users.id, user.id));

  return res.json({ ok: true });
});
