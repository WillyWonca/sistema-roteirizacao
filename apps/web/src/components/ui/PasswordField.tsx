import type { InputHTMLAttributes } from "react";
import { useState } from "react";

interface PasswordFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function PasswordField({ label, error, id, ...props }: PasswordFieldProps) {
  const [show, setShow] = useState(false);
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="text-sm font-medium text-slate-200"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          {...props}
          type={show ? "text" : "password"}
          className={`w-full rounded-xl border bg-white/5 px-3.5 py-2.5 pr-10 text-sm text-slate-50 shadow-sm outline-none transition
          placeholder:text-slate-500
          focus:ring-2 focus:ring-purple-500 focus:border-transparent
          ${
            error
              ? "border-red-500/70 focus:ring-red-500/80"
              : "border-white/10 hover:border-white/25"
          }`}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-slate-400 hover:text-slate-100 transition"
        >
          {show ? "Ocultar" : "Mostrar"}
        </button>
      </div>

      {error && (
        <p
          id={errorId}
          className="text-xs text-red-400 mt-0.5"
        >
          {error}
        </p>
      )}
    </div>
  );
}
