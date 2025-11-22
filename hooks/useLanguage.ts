import { useEffect, useCallback } from 'react';
import { useUIStore } from '../store/uiStore';
import { dictionaries } from '../lib/i18n/translations';
import { Language } from '../types';

export const useLanguage = () => {
  // Use selectors to avoid re-rendering when other unrelated store parts change
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);

  // Set cookie when language changes to support future middleware and persistency
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Sets a cookie accessible by the server
      document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = language;
    }
  }, [language]);

  // Stable translation function
  const t = useCallback((key: string): string => {
    // @ts-ignore
    return dictionaries[language]?.[key] || key;
  }, [language]);

  return { language, setLanguage, t };
};