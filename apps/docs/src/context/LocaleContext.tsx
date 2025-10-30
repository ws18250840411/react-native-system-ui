import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export type Locale = 'zh-CN' | 'en-US';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: Locale;
};

export function LocaleProvider({
  children,
  defaultLocale = 'zh-CN',
}: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'zh-CN' ? 'en-US' : 'zh-CN'));
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
    }),
    [locale, toggleLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}
