import '@babel/polyfill';
import React from 'react';
import { hydrate } from 'react-dom';

import 'stores/i18n-client';
import { configureClientI18n } from 'stores';
import Layout from 'components/common/layout';
import languages from './languages';

configureClientI18n({ languages });

const renderApp = () => {
  hydrate(
    <Layout i18nStore={window.I18N_STORE} />,
    document.getElementById('root'),
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('components/common/layout', renderApp);
}
