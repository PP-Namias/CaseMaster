import { AuthStrategy } from './lib/auth/strategy';
import { getSiteURL } from './lib/get-site-url';
import { LogLevel } from './lib/logger';
import type { ColorScheme, PrimaryColor } from './styles/theme/types';

export interface Config {
  site: {
    name: string;
    description: string;
    colorScheme: ColorScheme;
    primaryColor: PrimaryColor;
    themeColor: string;
    url: string;
    version: string;
  };
  logLevel: keyof typeof LogLevel;
  auth: { strategy: keyof typeof AuthStrategy };
  auth0: { domain?: string; clientId?: string };
  cognito: { identityPoolId?: string; userPoolClientId?: string; userPoolId?: string };
  firebase: {
    apiKey?: string;
    appId?: string;
    authDomain?: string;
    messagingSenderId?: string;
    projectId?: string;
    storageBucket?: string;
  };
  supabase: { url?: string; anonKey?: string };
  mapbox: { apiKey?: string };
  gtm?: { id?: string };
}

export const config = {
  site: {
    name: 'Devias Kit Pro',
    description: '',
    colorScheme: 'light',
    themeColor: '#090a0b',
    primaryColor: 'neonBlue',
    url: getSiteURL(),
    version: import.meta.env.VITE_SITE_VERSION || '0.0.0',
  },
  logLevel: (import.meta.env.VITE_LOG_LEVEL as keyof typeof LogLevel) || LogLevel.ALL,
  auth: { strategy: (import.meta.env.VITE_AUTH_STRATEGY as keyof typeof AuthStrategy) || AuthStrategy.CUSTOM },
  auth0: { domain: import.meta.env.VITE_AUTH0_DOMAIN, clientId: import.meta.env.VITE_AUTH0_CLIENT_ID },
  cognito: {
    identityPoolId: import.meta.env.VITE_COGNITO_IDENTITY_POOL_ID,
    userPoolClientId: import.meta.env.VITE_COGNITO_USER_POOL_CLIENT_ID,
    userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  },
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  },
  supabase: { url: import.meta.env.VITE_SUPABASE_URL, anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY },
  mapbox: { apiKey: import.meta.env.VITE_MAPBOX_API_KEY },
  gtm: { id: import.meta.env.VITE_GOOGLE_TAG_MANAGER_ID },
} satisfies Config;
