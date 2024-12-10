/// <reference types="vite/client" />

interface ImportMetaEnv {
  // App
  VITE_SITE_URL?: string;
  VITE_SITE_VERSION?: string;
  VITE_VERCEL_URL?: string;

  // Logger
  VITE_LOG_LEVEL?: string;

  // Auth
  VITE_AUTH_STRATEGY?: string;

  // Auth0
  VITE_AUTH0_DOMAIN?: string;
  VITE_AUTH0_CLIENT_ID?: string;

  // AWS Cognito
  VITE_COGNITO_IDENTITY_POOL_ID?: string;
  VITE_COGNITO_USER_POOL_CLIENT_ID?: string;
  VITE_COGNITO_USER_POOL_ID?: string;

  // Firebase
  VITE_FIREBASE_API_KEY?: string;
  VITE_FIREBASE_AUTH_DOMAIN?: string;
  VITE_FIREBASE_PROJECT_ID?: string;
  VITE_FIREBASE_STORAGE_BUCKET?: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID?: string;
  VITE_FIREBASE_APP_ID?: string;

  // Supabase
  VITE_SUPABASE_REF_ID?: string;
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;

  // Mapbox
  VITE_MAPBOX_API_KEY?: string;

  // Google Tag Manager
  VITE_GOOGLE_TAG_MANAGER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
