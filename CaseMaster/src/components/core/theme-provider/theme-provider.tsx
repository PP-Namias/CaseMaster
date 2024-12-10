'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

import { useSettings } from '@/hooks/use-settings';
import { createTheme } from '@/styles/theme/create-theme';

import { Rtl } from './rtl';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const { settings } = useSettings();

  const theme = createTheme({
    primaryColor: settings.primaryColor,
    colorScheme: settings.colorScheme,
    direction: settings.direction,
  });

  return (
    <CssVarsProvider defaultColorScheme={settings.colorScheme} defaultMode={settings.colorScheme} theme={theme}>
      <Helmet>
        <meta content={settings.colorScheme} name="color-scheme" />
      </Helmet>
      <CssBaseline />
      <Rtl direction={settings.direction}>{children}</Rtl>
    </CssVarsProvider>
  );
}
