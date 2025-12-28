import { type FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { AuthContext } from "../AuthContext";
import { useLanguage } from "../LanguageContext";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const email = String(fd.get("email") || "").trim();
    const password = String(fd.get("password") || "").trim();

    if (!email || !password) {
      toast.error(t("Informe e-mail e senha."));
      return;
    }

    setLoading(true);
    const tLoading = toast.loading(t("Entrando..."));

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data?.requires2fa) {
        toast.success(t("Código enviado ao e-mail."), { id: tLoading });

        navigate("/two-factor", { state: { email } });
        return;
      }

      if (!res.ok) throw new Error(data?.error ?? t("Erro ao fazer login."));

      login(data.token);

      toast.success(t("Login realizado!"), { id: tLoading });

      navigate("/roteirizacao");
    } catch (err: any) {
      toast.error(err.message ?? t("Erro inesperado."), { id: tLoading });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={t("login_title")}
      subtitle={t("login_subtitle")}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-1">
          <label className="text-sm text-slate-200">{t("email")}</label>
          <input
            name="email"
            type="email"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder="email"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-200">{t("password")}</label>
          <input
            name="password"
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? t("Entrando...") : t("enter")}
        </button>
      </form>

      <div className="flex justify-between text-sm text-slate-300 pt-2">
        <Link to="/forgot-password" className="text-purple-300 hover:text-purple-200">
          {t("forgot_password")}
        </Link>

        <Link to="/register" className="text-purple-300 hover:text-purple-200">
          {t("register")}
        </Link>
      </div>
    </AuthLayout>
  );
}
