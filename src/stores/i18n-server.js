import i18next from 'i18next';
import backend from 'i18next-sync-fs-backend';

export default ({ languages, lang, i18nNamespaces = ['common'] }) => {
  i18next.use(backend).init({
    whitelist: languages,
    fallbackLng: languages[0],
    lng: lang,
    preload: languages,
    debug: process.env.NODE_ENV !== 'production',
    load: 'languageOnly',
    ns: i18nNamespaces,
    defaultNS: 'common',
    backend: { loadPath: 'src/locales/{{lng}}/{{ns}}.json' },
    react: {
      bindStore: '',
    },
  });

  return i18next;
};
