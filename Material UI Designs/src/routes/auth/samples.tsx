import type { RouteObject } from 'react-router-dom';

export const route: RouteObject = {
  path: 'samples',
  children: [
    {
      path: 'reset-password/centered',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/reset-password/centered');
        return { Component: Page };
      },
    },
    {
      path: 'reset-password/split',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/reset-password/split');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in/centered',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/sign-in/centered');
        return { Component: Page };
      },
    },
    {
      path: 'sign-in/split',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/sign-in/split');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up/centered',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/sign-up/centered');
        return { Component: Page };
      },
    },
    {
      path: 'sign-up/split',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/sign-up/split');
        return { Component: Page };
      },
    },
    {
      path: 'update-password/centered',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/update-password/centered');
        return { Component: Page };
      },
    },
    {
      path: 'update-password/split',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/update-password/split');
        return { Component: Page };
      },
    },
    {
      path: 'verify-code/centered',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/verify-code/centered');
        return { Component: Page };
      },
    },
    {
      path: 'verify-code/split',
      lazy: async () => {
        const { Page } = await import('@/pages/auth/samples/verify-code/split');
        return { Component: Page };
      },
    },
  ],
};
