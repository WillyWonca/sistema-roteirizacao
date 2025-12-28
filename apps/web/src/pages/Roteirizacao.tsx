// apps/web/src/pages/Roteirizacao.tsx
import { motion } from "framer-motion"

export function Roteirizacao() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-6xl bg-slate-900/80 border border-slate-800/80 rounded-3xl shadow-2xl shadow-slate-950/60 p-8 lg:p-10 backdrop-blur-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <header className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight">
              Painel de roteirização
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Aqui depois vamos montar a tela de rotas, escalas, passageiros etc.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-1.5 text-xs text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Versão inicial · layout ok, lógica vem depois
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
            <h2 className="text-sm font-medium text-slate-200 mb-3">
              Escalas do dia
            </h2>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                <span>Manhã</span>
                <span className="text-xs text-slate-400">12 rotas · 184 passageiros</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                <span>Tarde</span>
                <span className="text-xs text-slate-400">9 rotas · 142 passageiros</span>
              </li>
              <li className="flex items-center justify-between rounded-xl bg-slate-900 px-3 py-2">
                <span>Noite</span>
                <span className="text-xs text-slate-400">6 rotas · 91 passageiros</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4">
            <h2 className="text-sm font-medium text-slate-200 mb-3">
              Próximos passos
            </h2>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-slate-300">
              <li>Conectar listagem de rotas reais</li>
              <li>Vincular passageiros e pontos</li>
              <li>Adicionar filtros por escala, horário e veículo</li>
            </ol>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// export default também, para não dar mais erro de import
export default Roteirizacao
