import React, { Suspense } from 'react';
import { useSSR, I18nextProvider } from 'react-i18next';

import { initialLanguage } from 'languages';
import Spinner from 'components/common/spinner';
import Home from 'components/home';
import Header from './header';

const MaybeSuspence = ({ children }) => {
  return typeof window === 'undefined' ? (
    children
  ) : (
    <Suspense fallback={<Spinner />}>{children}</Suspense>
  );
};

const Providers = ({ i18nStore, req, children }) => {
  if (i18nStore) {
    useSSR(i18nStore, initialLanguage);
  }

  if (req) {
    return <I18nextProvider i18n={req.i18n}>{children}</I18nextProvider>;
  }

  return children;
};

const Layout = ({ i18nStore, req }) => {
  return (
    <Providers i18nStore={i18nStore} req={req}>
      <MaybeSuspence>
        <Header />
      </MaybeSuspence>
      <MaybeSuspence fallback={null}>
        <Home />
      </MaybeSuspence>
    </Providers>
  );
};

export default Layout;
