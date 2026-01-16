import { Link, Outlet, useNavigate } from "react-router-dom";

export function MainLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 border-r border-white/10 p-5 flex flex-col">
        <h2 className="text-lg font-semibold mb-6 text-white">
          Roteirizador
        </h2>

        <nav className="flex flex-col gap-3 text-sm">
          <Link
            to="/dashboard"
            className="hover:text-white text-slate-300 transition"
          >
            🏠 Dashboard
          </Link>
          <Link
            to="/roteirizacao"
            className="hover:text-white text-slate-300 transition"
          >
            🗺️ Mapa
          </Link>
          <Link
            to="/users"
            className="hover:text-white text-slate-300 transition"
          >
            👤 Usuários
          </Link>
        </nav>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="mt-auto bg-red-600/20 text-red-300 hover:bg-red-600/30 border border-red-600/30 rounded-lg py-2 text-sm transition"
        >
          🚪 Sair
        </button>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
