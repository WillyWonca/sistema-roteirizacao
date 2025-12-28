import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";

export default function Register() {
  return (
    <AuthLayout
      title="Criar conta"
      subtitle="Leva menos de um minuto"
    >
      <form className="space-y-4">
        <div>
          <label className="text-sm text-slate-200">Nome</label>
          <input
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">E-mail</label>
          <input
            type="email"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
            placeholder="email@email.com"
          />
        </div>

        <div>
          <label className="text-sm text-slate-200">Senha</label>
          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white"
          />
        </div>

        <button className="w-full bg-green-600 hover:bg-green-500 rounded-xl py-3 font-semibold text-white shadow-lg shadow-green-900/30">
          Criar conta
        </button>
      </form>

      <p className="text-center text-sm text-slate-300 pt-3">
        Já possui conta?{" "}
        <Link className="text-purple-300" to="/">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
