import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang = "pt" | "en";
type Dictionary = Record<string, string>;

const pt: Dictionary = {
  // LOGIN
  login_title: "Entrar",
  login_subtitle: "Acesse sua conta para gerenciar a roteirização",
  email: "E-mail",
  password: "Senha",
  forgot_password: "Esqueci minha senha",
  register: "Criar conta",
  enter: "Entrar",

  // REGISTER
  register_title: "Criar conta",
  register_subtitle: "Leva menos de um minuto",
  full_name: "Nome completo",
  full_name_placeholder: "Seu nome",
  username: "Nome de usuário",
  username_placeholder: "como você quer ser identificado",
  address: "Endereço",
  address_placeholder: "Rua, número, bairro, cidade",
  document: "Documento (CPF, RG, etc.)",
  document_placeholder: "Apenas um documento por conta",
  password_placeholder: "Senha forte",
  confirm_password: "Confirmar senha",
  confirm_password_placeholder: "Repita a senha",
  already_have_account: "Já possui conta?",
  login_link: "Entrar",
  creating_account_label: "Criando conta...",
  create_account_button: "Criar conta",

  // FORGOT PASSWORD
  forgot_title: "Recuperar acesso",
  forgot_subtitle: "Informe seu e-mail para receber o link de redefinição.",
  send_instructions: "Enviar instruções",
  sending: "Enviando...",
  back_to_login: "Voltar para o login",

  // MENSAGENS / TOASTS / ERROS
  error_fill_required: "Preencha todos os campos obrigatórios.",
  error_passwords_mismatch: "As senhas não conferem.",
  error_password_weak: "A senha deve ter 8+ caracteres, maiúscula, minúscula e número.",
  toast_creating_account: "Criando sua conta...",
  toast_account_created: "Conta criada com sucesso! Faça login para continuar.",
  error_inform_email: "Informe o e-mail.",
  toast_generating_reset_link: "Gerando link de recuperação...",
  toast_reset_email_sent: "Se o e-mail existir, enviamos o link de redefinição.",
  error_reset_request: "Erro ao solicitar redefinição.",
  error_unexpected: "Erro inesperado.",
};

const en: Dictionary = {
  // LOGIN
  login_title: "Sign in",
  login_subtitle: "Access your account to manage routing",
  email: "Email",
  password: "Password",
  forgot_password: "Forgot password",
  register: "Create account",
  enter: "Sign in",

  // REGISTER
  register_title: "Create account",
  register_subtitle: "It takes less than a minute",
  full_name: "Full name",
  full_name_placeholder: "Your name",
  username: "Username",
  username_placeholder: "how you want to be identified",
  address: "Address",
  address_placeholder: "Street, number, neighborhood, city",
  document: "Document (ID, passport, etc.)",
  document_placeholder: "Only one document per account",
  password_placeholder: "Strong password",
  confirm_password: "Confirm password",
  confirm_password_placeholder: "Repeat the password",
  already_have_account: "Already have an account?",
  login_link: "Sign in",
  creating_account_label: "Creating account...",
  create_account_button: "Create account",

  // FORGOT PASSWORD
  forgot_title: "Recover access",
  forgot_subtitle: "Enter your email to receive the reset link.",
  send_instructions: "Send instructions",
  sending: "Sending...",
  back_to_login: "Back to login",

  // MESSAGES / TOASTS / ERRORS
  error_fill_required: "Fill in all required fields.",
  error_passwords_mismatch: "Passwords do not match.",
  error_password_weak: "Password must be 8+ characters with upper, lower case and a number.",
  toast_creating_account: "Creating your account...",
  toast_account_created: "Account created successfully! Please log in to continue.",
  error_inform_email: "Enter your email.",
  toast_generating_reset_link: "Generating recovery link...",
  toast_reset_email_sent: "If the email exists, we sent the reset link.",
  error_reset_request: "Error requesting password reset.",
  error_unexpected: "Unexpected error.",
};

const dictionaries = { pt, en };

type LanguageContextType = {
  lang: Lang;
  t: (key: string) => string;
  setLang: (l: Lang) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: "pt",
  t: (k) => k,
  setLang: () => {},
});

export function useLanguage() {
  return useContext(LanguageContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "pt" || saved === "en") {
      setLang(saved);
    }
  }, []);

  function change(l: Lang) {
    setLang(l);
    localStorage.setItem("lang", l);
  }

  function t(key: string) {
    return dictionaries[lang][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, t, setLang: change }}>
      {children}
    </LanguageContext.Provider>
  );
}
