import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({ label, error, id, ...props }: TextFieldProps) {
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

      <input
        id={inputId}
        {...props}
        className={`w-full rounded-xl border bg-white/5 px-3.5 py-2.5 text-sm text-slate-50 shadow-sm outline-none transition
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
