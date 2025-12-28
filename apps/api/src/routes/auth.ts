import { Router, type Request, type Response } from "express";
import { db } from "../db/client";
import { users } from "../db/schema";
import { eq, or } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { sendResetEmail } from "../email"; // <<< AQUI É O IMPORT NOVO

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

type UserRole = "user" | "admin" | null;

function signToken(user: { id: string; role: UserRole }) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role ?? "user",
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

function isStrongPassword(password: string) {
  const minLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return minLength && hasLower && hasUpper && hasNumber;
}

/* ========================= REGISTER ========================= */

authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const {
      name,
      username,
      email,
      password,
      confirmPassword,
      address,
      document,
    } = req.body as any;

    if (!name || !username || !email || !password || !confirmPassword || !document) {
      return res.status(400).json({
        error:
          "Nome, nome de usuário, e-mail, senha, confirmação e documento são obrigatórios.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "As senhas não conferem." });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, com letras maiúsculas, minúsculas e números.",
      });
    }

    const [existing] = await db
      .select()
      .from(users)
      .where(
        or(
          eq(users.email, email),
          eq(users.username, username),
          eq(users.document, document)
        )
      );

    if (existing) {
      return res.status(400).json({
        error: "Já existe um usuário com este e-mail, documento ou nome de usuário.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const [created] = await db
      .insert(users)
      .values({
        name,
        username,
        email,
        document,
        address: address ?? null,
        passwordHash: hash,
        role: "user",
      })
      .returning({
        id: users.id,
        role: users.role,
      });

    const token = signToken(created);

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao criar conta." });
  }
});

/* ========================= LOGIN ========================= */

authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as any;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios." });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);

    if (!valid) {
      return res.status(401).json({ error: "Credenciais inválidas." });
    }

    const token = signToken({ id: user.id, role: user.role });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao fazer login." });
  }
});

/* ========================= REQUEST RESET ========================= */

authRouter.post("/request-reset", async (req: Request, res: Response) => {
  try {
    const { email } = req.body as any;

    if (!email) {
      return res.status(400).json({ error: "E-mail é obrigatório." });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    // resposta neutra sempre (não revela se email existe)
    if (!user) {
      return res.json({ ok: true });
    }

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    await db
      .update(users)
      .set({
        resetToken: token,
        resetTokenExpires: expires,
      })
      .where(eq(users.id, user.id));

    // <<< AQUI ESTÁ A MÁGICA DO EMAIL
    await sendResetEmail(email, token);

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Erro ao gerar link de redefinição." });
  }
});

/* ========================= RESET PASSWORD ========================= */

authRouter.post("/reset-password", async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body as any;

    if (!token || !password) {
      return res.status(400).json({
        error: "Token e nova senha são obrigatórios.",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "A senha deve ter pelo menos 8 caracteres, com letras maiúsculas, minúsculas e números.",
      });
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token));

    if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

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
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao redefinir senha." });
  }
});
