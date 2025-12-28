import { useLanguage } from "../LanguageContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="absolute top-4 right-4 text-white flex gap-2 z-50">
      <button
        onClick={() => setLang("pt")}
        className={`px-3 py-1 rounded-xl ${
          lang === "pt" ? "bg-purple-600" : "bg-white/20"
        }`}
      >
        PT
      </button>

      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-xl ${
          lang === "en" ? "bg-purple-600" : "bg-white/20"
        }`}
      >
        EN
      </button>
    </div>
  );
}
