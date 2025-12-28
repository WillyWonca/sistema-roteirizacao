import { Link } from "react-router-dom";
import { AuthLayout } from "../components/AuthLayout";

export default function Login() {
  return (
    <AuthLayout
      title="Entrar"
      subtitle="Acesse sua conta para gerenciar a roteirização"
    >
      <form className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-slate-200">E-mail</label>
          <input
            type="email"
            className="w-full bg-white/10 border border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="seu@email.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-slate-200">Senha</label>
          <input
            type="password"
            className="w-full bg-white/10 border border-white/20 focus:border-white/30 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl py-3 font-semibold text-white shadow-lg shadow-purple-900/40"
        >
          Entrar
        </button>
      </form>
      <div className="flex justify-between text-sm text-slate-300 pt-2">
        <Link to="/forgot-password" className="text-purple-300 hover:text-purple-200">
          Esqueci minha senha
        </Link>

        <Link to="/register" className="text-purple-300 hover:text-purple-200">
          Criar conta
        </Link>
      </div>
    </AuthLayout>
  );
}
