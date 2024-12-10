import * as React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import MenuItem from '@mui/material/MenuItem';

import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

export function Auth0SignOut(): React.JSX.Element {
  const { logout } = useAuth0();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      await logout();
      // This will redirect to the Auth0 and then redirect back to the app
    } catch (err) {
      logger.error('Sign out error', err);
      toast.error('Something went wrong, unable to sign out');
    }
  }, [logout]);

  return (
    <MenuItem onClick={handleSignOut} sx={{ justifyContent: 'center' }}>
      Sign out
    </MenuItem>
  );
}
