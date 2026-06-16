"use client";

import { useI18n } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-white/18"
      title={language === "en" ? t("switchToSpanish") : t("switchToEnglish")}
      aria-label={t("language")}
    >
      {language === "en" ? "EN | ES" : "ES | EN"}
    </button>
  );
}
