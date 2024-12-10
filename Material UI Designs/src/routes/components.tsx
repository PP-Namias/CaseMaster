import type { RouteObject } from 'react-router-dom';

export const route: RouteObject = {
  path: 'components',
  children: [
    {
      index: true,
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/components');
        return { Component: Page };
      },
    },
    {
      path: 'buttons',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/buttons');
        return { Component: Page };
      },
    },
    {
      path: 'charts',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/charts');
        return { Component: Page };
      },
    },
    {
      path: 'colors',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/colors');
        return { Component: Page };
      },
    },
    {
      path: 'detail-lists',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/detail-lists');
        return { Component: Page };
      },
    },
    {
      path: 'forms',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/forms');
        return { Component: Page };
      },
    },
    {
      path: 'grid-lists',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/grid-lists');
        return { Component: Page };
      },
    },
    {
      path: 'grouped-lists',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/grouped-lists');
        return { Component: Page };
      },
    },
    {
      path: 'inputs',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/inputs');
        return { Component: Page };
      },
    },
    {
      path: 'modals',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/modals');
        return { Component: Page };
      },
    },
    {
      path: 'quick-stats',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/quick-stats');
        return { Component: Page };
      },
    },
    {
      path: 'tables',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/tables');
        return { Component: Page };
      },
    },
    {
      path: 'typography',
      lazy: async () => {
        const { Page } = await import('@/pages/marketing/components/typography');
        return { Component: Page };
      },
    },
  ],
};
