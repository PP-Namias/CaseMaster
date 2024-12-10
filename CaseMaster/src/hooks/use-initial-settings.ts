import * as React from 'react';

import type { Settings } from '@/types/settings';
import { applyDefaultSettings } from '@/lib/settings/apply-default-settings';
import { getSettings as getPersistedSettings } from '@/lib/settings/get-settings';

export function useInitialSettings(): Settings {
  const [state, setState] = React.useState<Partial<Settings>>({});

  React.useEffect(() => {
    const settings = getPersistedSettings();

    setState(settings);
  }, []);

  return applyDefaultSettings(state);
}
