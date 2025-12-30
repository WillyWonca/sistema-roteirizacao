// apps/web/src/pages/ResetPassword.tsx
import { useState, type FormEvent } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordField } from "../components/ui/PasswordField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  // token vindo do e-mail
  const initialToken = params.get("token") ?? "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const token = initialToken || String(fd.get("token") || "").trim();
    const password = String(fd.get("password") || "").trim();
    const confirmPassword = String(fd.get("confirmPassword") || "").trim();

    if (!token) {
      toast.error("Token não encontrado.");
      return;
    }

    if (!password || !confirmPassword) {
      toast.error("Informe e confirme a nova senha.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não conferem.");
      return;
    }

    const isStrong =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);

    if (!isStrong) {
      toast.error("Senha fraca. Use maiúscula, minúscula e número.");
      return;
    }

    setLoading(true);
    const t = toast.loading("Redefinindo senha...");

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "Erro ao redefinir senha.");

      toast.success("Senha redefinida! Faça login novamente.", { id: t });

      navigate("/");

    } catch (err: any) {
      toast.error(err.message ?? "Erro inesperado.", { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Defina uma nova senha para continuar"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {!initialToken && (
          <div>
            <label className="text-sm text-slate-200">Token</label>
            <input
              name="token"
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
              placeholder="Cole o token enviado por e-mail"
            />
          </div>
        )}

        <PasswordField
          name="password"
          label="Nova senha"
          placeholder="Digite a nova senha"
          autoComplete="new-password"
        />

        <PasswordField
          name="confirmPassword"
          label="Confirmar nova senha"
          placeholder="Repita a nova senha"
          autoComplete="new-password"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Redefinir senha"}
        </Button>
      </form>

      <div className="pt-3 text-center text-xs text-slate-400 border-t border-white/5 mt-4">
        <Link
          to="/"
          className="font-medium text-purple-300 hover:text-purple-200"
        >
          Voltar ao login
        </Link>
      </div>
    </AuthLayout>
  );
}
