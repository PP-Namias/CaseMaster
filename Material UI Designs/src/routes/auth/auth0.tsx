import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { AuthStrategy } from '@/lib/auth/strategy';
import { StrategyGuard } from '@/components/auth/strategy-guard';

export const route: RouteObject = {
  path: 'auth0',
  element: (
    <StrategyGuard expected={AuthStrategy.AUTH0}>
      <Outlet />
    </StrategyGuard>
  ),
  children: [
    {
      path: 'callback',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/auth0/callback');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/auth0/sign-in');
        return { Component: Page };
      },
    },
  ],
};
