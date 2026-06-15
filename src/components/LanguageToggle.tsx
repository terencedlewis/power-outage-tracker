"use client";

import { useI18n } from "@/components/LanguageProvider";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100"
      title={language === "en" ? t("switchToSpanish") : t("switchToEnglish")}
      aria-label={t("language")}
    >
      {language === "en" ? "EN | ES" : "ES | EN"}
    </button>
  );
}
