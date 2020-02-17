import i18nextMiddleware from 'i18next-express-middleware';
import i18next from 'i18next';

export { default as configureServerI18n } from './i18n-server';

export const geti18nStore = req => {
  if (!req.i18n.reportNamespaces) {
    return {};
  }

  return {
    [req.language]: Object.keys(
      req.i18n.reportNamespaces.usedNamespaces,
    ).reduce((prev, current) => {
      prev[current] =
        req.i18n.services.resourceStore.data[req.language][current];
      return prev;
    }, {}),
  };
};

export const i18nMiddleware = i18nextMiddleware.handle(i18next);
