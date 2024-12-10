import * as React from 'react';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

import { AuthStrategy } from '@/lib/auth/strategy';
import { StrategyGuard } from '@/components/auth/strategy-guard';

export const route: RouteObject = {
  path: 'cognito',
  element: (
    <StrategyGuard expected={AuthStrategy.COGNITO}>
      <Outlet />
    </StrategyGuard>
  ),
  children: [
    {
      path: 'new-password-required',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/cognito/new-password-required');
        return { Component: Page };
      },
    },
    {
      path: 'reset-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/cognito/reset-password');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/cognito/sign-in');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/cognito/sign-up');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up-confirm',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/cognito/sign-up-confirm');
        return { Component: Page };
      },
    },
    {
      path: 'update-password',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/cognito/update-password');
        return { Component: Page };
      },
    },
  ],
};
