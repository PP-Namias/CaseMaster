'use client';

import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import { getFirebaseApp } from '@/lib/firebase/client';

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
