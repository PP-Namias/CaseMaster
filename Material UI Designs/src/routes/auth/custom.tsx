import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { AuthStrategy } from '@/lib/auth/strategy';
import { StrategyGuard } from '@/components/auth/strategy-guard';

export const route: RouteObject = {
  path: 'custom',
  element: (
    <StrategyGuard expected={AuthStrategy.CUSTOM}>
      <Outlet />
    </StrategyGuard>
  ),
  children: [
    {
      path: 'reset-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/custom/reset-password');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/custom/sign-in');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/custom/sign-up');
        return { Component: Page };
      },
    },
  ],
};
