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
      className="fixed bottom-4 right-4 z-50 rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-3 py-1.5 text-xs font-semibold text-[color:var(--foreground)] shadow-[0_12px_24px_rgba(18,42,60,0.12)] md:hidden"
    >
      {language === "en" ? "EN/ES" : "ES/EN"}
    </button>
  );
}
