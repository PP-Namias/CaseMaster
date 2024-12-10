'use client';

import * as React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import type { User } from '@/types/user';
import { config } from '@/config';
import { paths } from '@/paths';

import type { UserContextValue } from '../types';

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

function UserProviderImpl({ children }: UserProviderProps): React.JSX.Element {
  const { user, error, isLoading } = useAuth0();

  return (
    <UserContext.Provider
      value={{ user: user ? (user as User) : null, error: error ? error.message : null, isLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  return (
    <Auth0Provider
      authorizationParams={{ redirect_uri: `${window.location.origin}${paths.auth.auth0.callback}` }}
      cacheLocation="localstorage"
      clientId={config.auth0.clientId!}
      domain={config.auth0.domain!}
      skipRedirectCallback
    >
      <UserProviderImpl>{children}</UserProviderImpl>
    </Auth0Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
