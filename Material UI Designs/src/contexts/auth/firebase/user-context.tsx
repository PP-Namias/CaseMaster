'use client';

import * as React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

import type { User } from '@/types/user';
import { getFirebaseAuth } from '@/lib/auth/firebase/client';
import { logger } from '@/lib/default-logger';

import type { UserContextValue } from '../types';

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      logger.debug('[Auth] onAuthStateChanged:', user);

      setState((prev) => ({
        ...prev,
        user: user
          ? ({
              id: user.uid,
              email: user.email ?? undefined,
              name: user.displayName ?? undefined,
              avatar: user.photoURL ?? undefined,
            } satisfies User)
          : null,
        error: null,
        isLoading: false,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  return <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
