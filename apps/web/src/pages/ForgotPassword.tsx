import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { TextField } from "../components/ui/TextField";
import { Button } from "../components/ui/Button";

export function ForgotPassword() {
  return (
    <AuthLayout
      title="Recuperar acesso"
      subtitle="Informe seu e-mail para receber o link de redefinição."
    >
      <form className="space-y-5">
        <TextField
          label="E-mail"
          type="email"
          placeholder="voce@empresa.com"
          autoComplete="email"
        />

        <Button type="submit">Enviar instruções</Button>
      </form>

      <div className="pt-3 text-center text-xs text-slate-400 border-t border-white/5 mt-4">
        <Link
          to="/"
          className="font-medium text-purple-300 hover:text-purple-200"
        >
          Voltar para o login
        </Link>
      </div>
    </AuthLayout>
  );
}
