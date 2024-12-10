'use client';

import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

export function Page(): React.JSX.Element | null {
  const { handleRedirectCallback } = useAuth0();
  const navigate = useNavigate();
  const executedRef = React.useRef<boolean>(false);
  const [displayError, setDisplayError] = React.useState<string | null>(null);

  const handle = React.useCallback(async () => {
    // Prevent rerun on DEV mode
    if (executedRef.current) {
      return;
    }

    executedRef.current = true;

    // Callback `code` and `state` are received as URL search params

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');

    if (!code || !state) {
      setDisplayError('Code or state is missing');
      return;
    }

    try {
      const appState = (await handleRedirectCallback()) as { next: string } | undefined;

      const next = appState?.next || paths.dashboard.overview;

      navigate(next);
    } catch (err) {
      logger.error(err);
      toast.error('Something went wrong');
      navigate(paths.home);
    }
  }, [handleRedirectCallback, navigate]);

  React.useEffect((): void => {
    handle().catch(logger.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  if (displayError) {
    return <Alert color="error">{displayError}</Alert>;
  }

  return null;
}
