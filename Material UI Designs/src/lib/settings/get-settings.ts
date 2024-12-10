import type { Settings } from '@/types/settings';
import { logger } from '@/lib/default-logger';

/*
 * Retrieve the settings from client's localStorage.
 * This should be used in Client Components.
 */
export function getSettings(): Partial<Settings> {
  const settingsStr: string | null = window.localStorage.getItem('app.settings');
  let settings: Partial<Settings>;

  if (settingsStr) {
    try {
      settings = JSON.parse(settingsStr) as Partial<Settings>;
    } catch {
      logger.error('Unable to parse the settings');
    }
  }

  settings ||= {};

  return settings;
}
