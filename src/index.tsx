import React, { createContext, ReactNode, useContext, useMemo } from 'react';

const languages = ['en', 'ru', 'ro'];

type Locale = 'en' | 'ru' | 'ro';

type Props = {
  translate: Translate;
  locale: Locale;
  children: ReactNode;
};

interface Translate {
  [translationKey: string]: {
    [language in Locale]: string;
  };
}

interface TranslateUtils {
  lang: Locale;
  t: (key: string, params?: { [key: string]: string }) => string;
}

const LangContext = createContext<TranslateUtils | undefined>(undefined);

function getTranslation(translate: Translate, locale: Locale, key: string, params: any) {
  if (!translate?.[key]?.[locale]) {
    return key.toUpperCase();
  }

  return translate[key][locale].replace(/{\w+}/g, (match) => {
    const arg = match.replace(/\{|\}/g, '');

    return params[arg] || match;
  });
}

export const useTranslation = (locale: Locale, translate: Translate) =>
  useMemo<TranslateUtils>(
    () => ({
      lang: locale,
      t: (key, params) => getTranslation(translate, locale, key, params),
    }),
    [locale, translate],
  );

export function LangProvider(props: Props) {
  const { children, translate, locale } = props;

  Object.keys(translate).map((translationKey) => {
    languages.map((lang) => {
      if (!Object.prototype.hasOwnProperty.call(translate[translationKey], lang)) {
        console.log(`Missing translation for '${translationKey}' with key '${lang}'`);
      }
    });
  });

  return <LangContext.Provider value={useTranslation(locale, translate)}>{children}</LangContext.Provider>;
}

export function useIntl(): TranslateUtils {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error('use useIntl inside LangProvider');
  }

  return context;
}
