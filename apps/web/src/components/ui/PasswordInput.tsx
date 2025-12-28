import { useState } from "react";

export function PasswordInput(props: any) {
  const [show, setShow] = useState(false);

  return (
    <label className="space-y-1 block relative">
      <span className="text-sm text-slate-300">Senha</span>

      <input
        {...props}
        type={show ? "text" : "password"}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-slate-500"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-9 text-slate-400 hover:text-white"
      >
        {show ? "🙈" : "👁️"}
      </button>
    </label>
  );
}
