import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { AuthStrategy } from '@/lib/auth/strategy';
import { StrategyGuard } from '@/components/auth/strategy-guard';

export const route: RouteObject = {
  path: 'firebase',
  element: (
    <StrategyGuard expected={AuthStrategy.FIREBASE}>
      <Outlet />
    </StrategyGuard>
  ),
  children: [
    {
      path: 'recovery-link-sent',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/firebase/recovery-link-sent');
        return { Component: Page };
      },
    },
    {
      path: 'reset-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/firebase/reset-password');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/firebase/sign-in');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/firebase/sign-up');
        return { Component: Page };
      },
    },
    {
      path: 'update-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/firebase/update-password');
        return { Component: Page };
      },
    },
  ],
};
