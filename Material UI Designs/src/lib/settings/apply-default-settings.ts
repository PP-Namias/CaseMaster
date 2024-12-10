import type { Settings } from '@/types/settings';
import { config } from '@/config';

export function applyDefaultSettings(settings: Partial<Settings>): Settings {
  return {
    colorScheme: config.site.colorScheme,
    primaryColor: config.site.primaryColor,
    direction: 'ltr',
    navColor: 'evident',
    layout: 'vertical',
    ...settings,
  };
}
