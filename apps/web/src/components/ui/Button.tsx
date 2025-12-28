import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition
      hover:from-purple-500 hover:to-indigo-400
      active:scale-[0.98] active:shadow-md
      disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
    >
      {children}
    </button>
  );
}
