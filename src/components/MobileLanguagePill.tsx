"use client";

import { useI18n } from "@/components/LanguageProvider";

export default function MobileLanguagePill() {
  const { language, setLanguage, t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => setLanguage(language === "en" ? "es" : "en")}
      aria-label={t("language")}
      title={language === "en" ? t("switchToSpanish") : t("switchToEnglish")}
      className="fixed bottom-4 right-4 z-50 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-md md:hidden"
    >
      {language === "en" ? "EN/ES" : "ES/EN"}
    </button>
  );
}
