import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { TextField } from "../components/ui/TextField";
import { Button } from "../components/ui/Button";
import toast from "react-hot-toast";
import { useLanguage } from "../LanguageContext";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "").trim();

    if (!email) {
      toast.error(t("error_inform_email"));
      return;
    }

    setLoading(true);
    const tId = toast.loading(t("toast_generating_reset_link"));

    try {
      const res = await fetch(`${API_URL}/auth/request-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data?.error ?? t("error_reset_request"));

      toast.success(t("toast_reset_email_sent"), {
        id: tId,
      });
    } catch (err: any) {
      toast.error(err.message ?? t("error_unexpected"), { id: tId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title={t("forgot_title")}
      subtitle={t("forgot_subtitle")}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <TextField
          name="email"
          label={t("email")}
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
        />

        <Button type="submit" disabled={loading}>
          {loading ? t("sending") : t("send_instructions")}
        </Button>
      </form>

      <div className="pt-3 text-center text-xs text-slate-400 border-t border-white/5 mt-4">
        <Link
          to="/"
          className="font-medium text-purple-300 hover:text-purple-200"
        >
          {t("back_to_login")}
        </Link>
      </div>
    </AuthLayout>
  );
}
