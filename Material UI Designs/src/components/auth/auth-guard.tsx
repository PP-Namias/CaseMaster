'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import { config } from '@/config';
import { paths } from '@/paths';
import { AuthStrategy } from '@/lib/auth/strategy';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');

      switch (config.auth.strategy) {
        case AuthStrategy.CUSTOM: {
          navigate(paths.auth.custom.signIn, { replace: true });
          return;
        }
        case AuthStrategy.AUTH0: {
          navigate(paths.auth.auth0.signIn, { replace: true });
          return;
        }
        case AuthStrategy.COGNITO: {
          navigate(paths.auth.cognito.signIn, { replace: true });
          return;
        }
        case AuthStrategy.FIREBASE: {
          navigate(paths.auth.firebase.signIn, { replace: true });
          return;
        }
        case AuthStrategy.SUPABASE: {
          navigate(paths.auth.supabase.signIn, { replace: true });
          return;
        }
        default: {
          logger.error('[AuthGuard]: Unknown auth strategy');
          return;
        }
      }
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
