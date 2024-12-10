import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';

export function Page(): React.JSX.Element | null {
  const { loginWithRedirect } = useAuth0();

  React.useEffect(() => {
    loginWithRedirect({
      appState: { next: paths.dashboard.overview },
      openUrl(url) {
        window.location.replace(url);
      },
    }).catch(logger.error);
  }, [loginWithRedirect]);

  return null;
}
