import * as React from 'react';

import type { UserContextValue } from '@/contexts/auth/types';
import { UserContext } from '@/contexts/auth/user-context';

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
