import { useEffect, useCallback, useState } from 'react';
import { useUIStore } from '../store/uiStore';
import { dictionaries } from '../lib/i18n/translations';
import { Language } from '../types';

export const useLanguage = () => {
  const { language: storedLanguage, setLanguage } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);

  // Fix Hydration Mismatch:
  // Server renders with default (FR). Client must match on first render.
  // We only switch to storedLanguage after the component has mounted.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const language = isMounted ? storedLanguage : Language.FR;

  // Set cookie when language changes to support future middleware and persistency
  useEffect(() => {
    if (isMounted && typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${language}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = language;
    }
  }, [language, isMounted]);

  // Wrap t in useCallback so the function reference remains stable
  const t = useCallback((key: string): string => {
    // @ts-ignore
    return dictionaries[language]?.[key] || key;
  }, [language]);

  return { language, setLanguage, t, isMounted };
};