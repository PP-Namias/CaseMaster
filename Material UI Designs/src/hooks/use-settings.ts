import * as React from 'react';

import { SettingsContext } from '@/contexts/settings';
import type { SettingsContextValue } from '@/contexts/settings';

export function useSettings(): SettingsContextValue {
  const context = React.useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}
