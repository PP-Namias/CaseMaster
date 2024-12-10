'use client';

import * as React from 'react';
import type { Session } from '@supabase/supabase-js';

import type { User } from '@/types/user';
import { logger } from '@/lib/default-logger';
import { createClient as createSupabaseClient } from '@/lib/supabase/client';

import type { UserContextValue } from '../types';

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [supabaseClient] = React.useState(createSupabaseClient());

  const [state, setState] = React.useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  React.useEffect(() => {
    function handleInitialSession(session: Session | null): void {
      const user = session?.user;

      setState((prev) => ({
        ...prev,
        user: user
          ? ({
              id: user.id ?? undefined,
              email: user.email ?? undefined,
              name: (user.user_metadata?.full_name as string) ?? undefined,
              avatar: (user.user_metadata?.avatar_url as string) ?? undefined,
            } satisfies User)
          : null,
        error: null,
        isLoading: false,
      }));
    }

    function handleSignedIn(session: Session | null): void {
      const user = session?.user;

      setState((prev) => ({
        ...prev,
        user: user
          ? ({
              id: user.id ?? undefined,
              email: user.email ?? undefined,
              name: (user.user_metadata?.full_name as string) ?? undefined,
              avatar: (user.user_metadata?.avatar_url as string) ?? undefined,
            } satisfies User)
          : null,
        error: null,
        isLoading: false,
      }));
    }

    function handleSignedOut(): void {
      setState((prev) => ({ ...prev, user: null, error: null, isLoading: false }));
    }

    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      logger.debug('[Auth] onAuthStateChange:', event, session);

      if (event === 'INITIAL_SESSION') {
        handleInitialSession(session);
      }

      if (event === 'SIGNED_IN') {
        handleSignedIn(session);
      }

      if (event === 'SIGNED_OUT') {
        handleSignedOut();
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabaseClient]);

  return <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
