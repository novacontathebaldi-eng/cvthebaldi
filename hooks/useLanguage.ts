import { useEffect, useCallback } from 'react';
import { useUIStore } from '../store/uiStore';
import { dictionaries } from '../lib/i18n/translations';
import { Language } from '../types';

export const useLanguage = () => {
  const { language, setLanguage } = useUIStore();

  // Set cookie when language changes to support future middleware and persistency
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Sets a cookie accessible by the server
      document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = language;
    }
  }, [language]);

  // Wrap t in useCallback so the function reference remains stable unless language changes
  const t = useCallback((key: string): string => {
    // @ts-ignore
    return dictionaries[language]?.[key] || key;
  }, [language]);

  return { language, setLanguage, t };
};