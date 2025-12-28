import { useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { TextField } from "../components/ui/TextField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function TwoFactor() {
  const navigate = useNavigate();
  const location = useLocation();

  // e-mail vem da tela de login
  const email = (location.state as any)?.email ?? "";

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const code = String(fd.get("code") || "").trim();

    if (!email) {
      toast.error("E-mail não encontrado. Refazer login.");
      navigate("/");
      return;
    }

    if (!code) {
      toast.error("Informe o código recebido.");
      return;
    }

    setLoading(true);
    const t = toast.loading("Validando código...");

    try {
      const res = await fetch(`${API_URL}/auth/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "Erro ao validar código.");

      localStorage.setItem("token", data.token);

      toast.success("Login realizado com sucesso!", { id: t });

      navigate("/roteirizacao");
    } catch (err: any) {
      toast.error(err.message ?? "Erro inesperado.", { id: t });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Verificação em duas etapas"
      subtitle="Digite o código enviado ao seu e-mail."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField
          name="code"
          label="Código de verificação"
          placeholder="123456"
          inputMode="numeric"
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Validando..." : "Confirmar código"}
        </Button>
      </form>
    </AuthLayout>
  );
}
