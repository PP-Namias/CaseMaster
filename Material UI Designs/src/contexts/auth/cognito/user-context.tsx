'use client';

import * as React from 'react';
import { Hub } from 'aws-amplify/utils';

import type { User } from '@/types/user';

import type { UserContextValue } from '../types';

import '@/lib/auth/cognito/client';

import { getCurrentUser } from '@aws-amplify/auth';
import type { AuthUser } from '@aws-amplify/auth';

import { logger } from '@/lib/default-logger';

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    // Only run on initial mount.
    getCurrentUser()
      .then((user) => {
        setState({ user: { id: user.userId, email: user.username }, error: null, isLoading: false });
      })
      .catch(() => {
        setState({ user: null, error: null, isLoading: false });
      });
  }, []);

  React.useEffect(() => {
    function handleSignedIn(data: AuthUser): void {
      setState({ user: { id: data.userId, email: data.username }, error: null, isLoading: false });
    }

    function handleSignedOut(): void {
      setState({ user: null, error: null, isLoading: false });
    }

    const unsubscribe = Hub.listen('auth', ({ payload }): void => {
      logger.debug('[Auth] Hub event:', payload);

      if (payload.event === 'signedIn') {
        handleSignedIn(payload.data);
      }

      if (payload.event === 'signedOut') {
        handleSignedOut();
      }
    });

    return (): void => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
