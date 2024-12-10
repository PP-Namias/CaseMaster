import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { AuthStrategy } from '@/lib/auth/strategy';
import { StrategyGuard } from '@/components/auth/strategy-guard';

export const route: RouteObject = {
  path: 'supabase',
  element: (
    <StrategyGuard expected={AuthStrategy.SUPABASE}>
      <Outlet />
    </StrategyGuard>
  ),
  children: [
    {
      path: 'callback',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/callback');
        return { Component: Page };
      },
    },
    {
      path: 'recovery-link-sent',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/recovery-link-sent');
        return { Component: Page };
      },
    },
    {
      path: 'reset-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/reset-password');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/sign-in');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/sign-up');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up-confirm',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/sign-up-confirm');
        return { Component: Page };
      },
    },
    {
      path: 'update-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/supabase/update-password');
        return { Component: Page };
      },
    },
  ],
};
