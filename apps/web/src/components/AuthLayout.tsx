import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#05060f] via-[#050916] to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative w-full max-w-md"
      >
        {/* glow */}
        <div className="absolute -inset-1 rounded-[26px] bg-gradient-to-br from-purple-600/40 via-indigo-500/20 to-transparent blur-2xl opacity-70" />

        {/* glass card */}
        <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_30px_120px_rgba(0,0,0,0.8)] px-7 py-8 space-y-6">
          <header className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-white">{title}</h1>

            {subtitle && (
              <p className="text-slate-400 text-sm">{subtitle}</p>
            )}
          </header>

          {children}
        </div>
      </motion.div>
    </div>
  );
}
