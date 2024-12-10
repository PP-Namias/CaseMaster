'use client';

import { initializeApp } from 'firebase/app';
import type { FirebaseApp } from 'firebase/app';

import { config } from '@/config';

// This executes on the client only, so we can cache the app instance.
let appInstance: FirebaseApp;

export function getFirebaseApp(): FirebaseApp {
  if (appInstance) {
    return appInstance;
  }

  appInstance = initializeApp({
    apiKey: config.firebase.apiKey,
    authDomain: config.firebase.authDomain,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId: config.firebase.appId,
  });

  return appInstance;
}
