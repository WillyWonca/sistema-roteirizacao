// apps/web/src/App.tsx
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { TwoFactor } from "./pages/TwoFactor";
import { Roteirizacao } from "./pages/Roteirizacao";

export default function App() {
  return (
    <Routes>
      {/* Autenticação */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* 2FA opcional */}
      <Route path="/two-factor" element={<TwoFactor />} />

      {/* App principal */}
      <Route path="/roteirizacao" element={<Roteirizacao />} />

      {/* fallback simples */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
