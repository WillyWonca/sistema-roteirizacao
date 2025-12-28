import { type FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import toast from "react-hot-toast";
import { useLanguage } from "../LanguageContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const name = String(fd.get("name") || "").trim();
    const username = String(fd.get("username") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const address = String(fd.get("address") || "").trim();
    const document = String(fd.get("document") || "").trim();
    const password = String(fd.get("password") || "").trim();
    const confirmPassword = String(fd.get("confirmPassword") || "").trim();

    if (!name || !username || !email || !document || !password || !confirmPassword) {
      toast.error(t("error_fill_required"));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("error_passwords_mismatch"));
      return;
    }

    const isStrong =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);

    if (!isStrong) {
      toast.error(t("error_password_weak"));
      return;
    }

    setLoading(true);

    const tId = toast.loading(t("toast_creating_account"));

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          username,
          email,
          address,
          document,
          password,
          confirmPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? t("Erro ao criar conta."));
      }

      toast.success(t("toast_account_created"), {
        id: tId,
      });

      navigate("/");
    } catch (err: any) {
      toast.error(err.message ?? t("error_unexpected"), { id: tId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={t("register_title")}
      subtitle={t("register_subtitle")}
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="text-sm text-slate-200">{t("full_name")}</label>
          <input
            name="name"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder={t("full_name_placeholder")}
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">{t("username")}</label>
          <input
            name="username"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder={t("username_placeholder")}
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">{t("email")}</label>
          <input
            name="email"
            type="email"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder="voce@empresa.com"
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">{t("address")}</label>
          <input
            name="address"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder={t("address_placeholder")}
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">{t("document")}</label>
          <input
            name="document"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder={t("document_placeholder")}
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">{t("password")}</label>
          <input
            name="password"
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder={t("password_placeholder")}
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">
            {t("confirm_password")}
          </label>
          <input
            name="confirmPassword"
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder={t("confirm_password_placeholder")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 rounded-xl py-3 font-semibold text-white shadow-lg shadow-green-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t("creating_account_label") : t("create_account_button")}
        </button>
      </form>

      <p className="text-center text-sm text-slate-300 pt-3">
        {t("already_have_account")}{" "}
        <Link className="text-purple-300" to="/">
          {t("login_link")}
        </Link>
      </p>
    </AuthLayout>
  );
}
