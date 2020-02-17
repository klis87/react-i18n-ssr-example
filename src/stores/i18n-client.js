import i18next from 'i18next';
import i18nextXHRBackend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

export default ({ languages, lang }) => {
  i18next
    .use(initReactI18next)
    .use(i18nextXHRBackend)
    .init({
      // fallbackLng: languages[0],
      languages,
      fallbackLng: false,
      lng: lang,
      defaultNS: 'common',
      ns: [],
      debug: process.env.NODE_ENV !== 'production',
      load: 'languageOnly',
      backend: {
        loadPath: '/static/{{lng}}/{{ns}}.json',
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        bindStore: '',
      },
    });

  return i18next;
};
