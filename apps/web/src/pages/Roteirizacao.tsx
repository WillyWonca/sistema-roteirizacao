// apps/web/src/pages/Roteirizacao.tsx
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../AuthContext";

export function Roteirizacao() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-6xl bg-slate-900/80 border borde...3xl shadow-2xl shadow-slate-950/60 p-8 lg:p-10 backdrop-blur-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* resto do layout igual */}
      </motion.div>
    </div>
  );
}
