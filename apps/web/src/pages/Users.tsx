import { useEffect, useMemo, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  document: string;
  role: "admin" | "user";
  active: number;
  createdAt: string;
  emailVerifiedAt: string | null;
};

type UsersResponse = {
  items: User[];
  total: number;
  page: number;
  pageSize: number;
};

export default function Users() {
  const [items, setItems] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 5;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<User | null>(null);

  const token = localStorage.getItem("token");

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / pageSize));
  }, [total]);

  async function load(p = page, s = search) {
    setLoading(true);
    setError(null);

    try {
      const url = new URL(`${API_URL}/users`);
      url.searchParams.set("page", String(p));
      url.searchParams.set("pageSize", String(pageSize));
      if (s.trim()) url.searchParams.set("search", s.trim());

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error ?? "Erro ao carregar usuários.");
        setItems([]);
        setTotal(0);
        return;
      }

      const data = json as UsersResponse;
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch {
      setError("Falha de rede ao carregar usuários.");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  async function saveEdit() {
    if (!editing) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/users/${editing.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: editing.name,
          username: editing.username,
          email: editing.email,
          document: editing.document,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Erro ao editar usuário.");
        return;
      }

      setEditing(null);
      await load();
    } catch {
      setError("Falha ao salvar edição.");
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(user: User) {
    const nextRole = user.role === "admin" ? "user" : "admin";

    if (!confirm(`Deseja trocar a role de "${user.name}" para "${nextRole}"?`)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/users/${user.id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: nextRole }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Erro ao atualizar role.");
        return;
      }

      await load();
    } catch {
      setError("Falha ao atualizar role.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleActive(user: User) {
    const next = user.active ? 0 : 1;

    if (!confirm(`Deseja ${next ? "ativar" : "bloquear"} "${user.name}"?`)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/users/${user.id}/active`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ active: next }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Erro ao alterar status.");
        return;
      }

      await load();
    } catch {
      setError("Falha ao alterar status.");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword(user: User) {
    if (!confirm(`Deseja resetar a senha de "${user.name}"?`)) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/users/${user.id}/reset-password`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json?.error ?? "Erro ao resetar senha.");
        return;
      }

      alert("Reset de senha solicitado.");
    } catch {
      setError("Falha ao resetar senha.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [page]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white">Usuários</h1>

      <div className="flex gap-3 max-w-xl">
        <Input
          label="Buscar"
          placeholder="Nome, email, usuário..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button className="h-10 mt-6" onClick={() => { setPage(1); load(1, search); }}>
          Buscar
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-slate-200">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Usuário</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-400">
                  Carregando usuários...
                </td>
              </tr>
            )}

            {!loading && items.map(u => (
              <tr key={u.id} className="border-t border-white/10">
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.username}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3">
                  <span className={u.active ? "text-green-400" : "text-red-400"}>
                    {u.active ? "Ativo" : "Bloqueado"}
                  </span>
                </td>
                <td className="p-3 flex gap-3 text-xs">
                  <button onClick={() => setEditing(u)} className="text-blue-300">Editar</button>
                  <button onClick={() => changeRole(u)} className="text-purple-300">Role</button>
                  <button onClick={() => toggleActive(u)} className="text-yellow-300">
                    {u.active ? "Bloquear" : "Ativar"}
                  </button>
                  <button onClick={() => resetPassword(u)} className="text-red-300">Reset</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center gap-6">
        <Button disabled={page <= 1} onClick={() => setPage(p => p - 1)}>
          Anterior
        </Button>

        <span className="text-slate-300 text-sm">
          Página {page} de {totalPages}
        </span>

        <Button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)}>
          Próxima
        </Button>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-xl w-full max-w-md space-y-4 border border-white/10">
            <h2 className="text-lg font-semibold text-white">Editar usuário</h2>

            <Input label="Nome" value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })}/>
            <Input label="Username" value={editing.username} onChange={e => setEditing({ ...editing, username: e.target.value })}/>
            <Input label="Email" value={editing.email} onChange={e => setEditing({ ...editing, email: e.target.value })}/>
            <Input label="Documento" value={editing.document} onChange={e => setEditing({ ...editing, document: e.target.value })}/>

            <div className="flex justify-end gap-3">
              <Button onClick={() => setEditing(null)}>Cancelar</Button>
              <Button onClick={saveEdit}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
