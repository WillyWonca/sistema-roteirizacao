import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordField } from "../components/ui/PasswordField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();

  const tokenFromUrl = params.get("token") ?? "";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const password = String(fd.get("password") || "").trim();
    const confirm = String(fd.get("confirm") || "").trim();

    const token =
      tokenFromUrl || String(fd.get("token") || "").trim();

    if (!token) {
      toast.error("Token não encontrado.");
      return;
    }

    if (!password || !confirm) {
      toast.error("Preencha os dois campos de senha.");
      return;
    }

    if (password !== confirm) {
      toast.error("As senhas não conferem.");
      return;
    }

    setLoading(true);
    const t = toast.loading("Redefinindo sua senha...");

    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "Erro ao redefinir senha.");

      toast.success("Senha alterada com sucesso! Faça login novamente.", {
        id: t,
      });
    } catch (err: any) {
      toast.error(err.message ?? "Erro inesperado.", { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Crie uma nova senha para continuar."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {!tokenFromUrl && (
          <PasswordField
            name="token"
            label="Token"
            placeholder="Cole o token recebido"
          />
        )}

        <PasswordField
          name="password"
          label="Nova senha"
          placeholder="Digite a nova senha"
          autoComplete="new-password"
        />

        <PasswordField
          name="confirm"
          label="Confirmar nova senha"
          placeholder="Repita a nova senha"
          autoComplete="new-password"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Redefinindo..." : "Redefinir senha"}
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
