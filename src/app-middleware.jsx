import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Layout from 'components/common/layout';
import {
  configureServerI18n,
  geti18nStore,
  i18nMiddleware,
} from 'stores/server';
import languages, { initialLanguage } from './languages';
import './stores/i18n-server';

configureServerI18n({
  languages,
  lang: initialLanguage,
  i18nNamespaces: ['common', 'booking', 'cart'],
});

const router = express.Router();

router.get('/favicon.ico', (req, res) => {
  res.status(404).send();
});

router.get('/', (req, res) => {
  res.redirect(301, '/en');
});

router.use(compression(), i18nMiddleware, (req, res) => {
  const html = renderToString(<Layout req={req} />);
  res.render('index', {
    html,
    i18nStore: JSON.stringify(geti18nStore(req)),
  });
});

export default () => router;
