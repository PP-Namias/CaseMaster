import { use } from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { logger } from '@/lib/default-logger';

export const i18n = use(Backend)
  .use(initReactI18next)
  .init({ lng: 'en', fallbackLng: 'en', interpolation: { escapeValue: false } })
  .catch((err) => {
    logger.error('Failed to initialize i18n', err);
  });
