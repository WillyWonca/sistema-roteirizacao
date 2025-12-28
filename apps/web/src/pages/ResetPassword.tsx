import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";
import { PasswordField } from "../components/ui/PasswordField";
import { Button } from "../components/ui/Button";

export function ResetPassword() {
  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Crie uma nova senha para continuar."
    >
      <form className="space-y-5">
        <PasswordField
          label="Nova senha"
          placeholder="Digite a nova senha"
          autoComplete="new-password"
        />

        <PasswordField
          label="Confirmar nova senha"
          placeholder="Repita a nova senha"
          autoComplete="new-password"
        />

        <Button type="submit">Redefinir senha</Button>
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
