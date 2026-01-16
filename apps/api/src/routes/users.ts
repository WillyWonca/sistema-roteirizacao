import { Router, Request, Response } from "express";
import { db } from "../db/client";
import { users } from "../db/schema";
import { requireAuth, requireAdmin } from "../middleware/auth";
import { ilike, or, sql, eq, and, ne } from "drizzle-orm";

export const usersRouter = Router();

function getCurrentUserId(req: Request): string | null {
  const u = (req as any).user;
  return u?.id ?? null;
}

function isUuid(v: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
}

/* =====================================================
   LIST USERS
===================================================== */
usersRouter.get("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const search = String(req.query.search || "");
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize || 10)));
    const offset = (page - 1) * pageSize;

    const where = search
      ? or(
          ilike(users.name, `%${search}%`),
          ilike(users.email, `%${search}%`),
          ilike(users.username, `%${search}%`),
          ilike(users.document, `%${search}%`)
        )
      : undefined;

    const items = await db.select({
      id: users.id,
      name: users.name,
      username: users.username,
      email: users.email,
      document: users.document,
      role: users.role,
      active: users.active,
      createdAt: users.createdAt,
      emailVerifiedAt: users.emailVerifiedAt,
    })
    .from(users)
    .where(where)
    .limit(pageSize)
    .offset(offset)
    .orderBy(users.createdAt);

    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(where);

    return res.json({ items, total: Number(count), page, pageSize });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar usuários." });
  }
});

/* =====================================================
   GET USER BY ID
===================================================== */
usersRouter.get("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) return res.status(400).json({ error: "ID inválido." });

    const [user] = await db.select({
      id: users.id,
      name: users.name,
      username: users.username,
      email: users.email,
      document: users.document,
      role: users.role,
      active: users.active,
      createdAt: users.createdAt,
      emailVerifiedAt: users.emailVerifiedAt,
    })
    .from(users)
    .where(eq(users.id, id));

    if (!user) return res.status(404).json({ error: "Usuário não encontrado." });

    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
});

/* =====================================================
   UPDATE USER DATA
===================================================== */
usersRouter.patch("/:id", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, username, email, document } = req.body;

    if (!isUuid(id)) return res.status(400).json({ error: "ID inválido." });
    if (!name || !username || !email || !document)
      return res.status(400).json({ error: "Campos obrigatórios." });

    const existing = await db.select({ id: users.id })
      .from(users)
      .where(and(
        or(
          eq(users.email, email),
          eq(users.username, username),
          eq(users.document, document)
        ),
        ne(users.id, id)
      ));

    if (existing.length) {
      return res.status(400).json({ error: "Dados já utilizados por outro usuário." });
    }

    const updated = await db.update(users)
      .set({ name, username, email, document })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    if (!updated.length) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar usuário." });
  }
});

/* =====================================================
   UPDATE ROLE
===================================================== */
usersRouter.patch("/:id/role", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!isUuid(id)) return res.status(400).json({ error: "ID inválido." });
    if (!["admin", "user"].includes(role))
      return res.status(400).json({ error: "Role inválido." });

    const me = getCurrentUserId(req);
    if (id === me)
      return res.status(400).json({ error: "Você não pode alterar sua própria role." });

    const updated = await db.update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    if (!updated.length)
      return res.status(404).json({ error: "Usuário não encontrado." });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar role." });
  }
});

/* =====================================================
   RESET PASSWORD
===================================================== */
usersRouter.post("/:id/reset-password", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!isUuid(id)) return res.status(400).json({ error: "ID inválido." });

    const me = getCurrentUserId(req);
    if (id === me)
      return res.status(400).json({ error: "Você não pode resetar sua própria senha." });

    const updated = await db.update(users)
      .set({ resetToken: null, resetTokenExpires: null })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    if (!updated.length)
      return res.status(404).json({ error: "Usuário não encontrado." });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao resetar senha." });
  }
});

/* =====================================================
   TOGGLE ACTIVE
===================================================== */
usersRouter.patch("/:id/active", requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    if (!isUuid(id)) return res.status(400).json({ error: "ID inválido." });

    const me = getCurrentUserId(req);
    if (id === me)
      return res.status(400).json({ error: "Você não pode se bloquear." });

    const updated = await db.update(users)
      .set({ active })
      .where(eq(users.id, id))
      .returning({ id: users.id });

    if (!updated.length)
      return res.status(404).json({ error: "Usuário não encontrado." });

    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar status." });
  }
});
