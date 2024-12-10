import * as React from 'react';
import { Outlet } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import { Layout as ChatLayout } from '@/components/dashboard/chat/layout';
import { Layout as JobCompanyLayout } from '@/components/dashboard/jobs/company-layout';
import { Layout as DashboardLayout } from '@/components/dashboard/layout/layout';
import { Layout as MailLayout } from '@/components/dashboard/mail/layout';
import { Layout as SettingsLayout } from '@/components/dashboard/settings/layout';
import { Layout as SocialProfileLayout } from '@/components/dashboard/social/profile-layout';

export const route: RouteObject = {
  path: 'dashboard',
  element: (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ),
  children: [
    {
      index: true,
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/overview');
        return { Component: Page };
      },
    },
    {
      path: 'academy',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/academy/browse');
            return { Component: Page };
          },
        },
        {
          path: 'courses/:courseId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/academy/courses/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'analytics',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/analytics');
        return { Component: Page };
      },
    },
    {
      path: 'blank',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/blank');
        return { Component: Page };
      },
    },
    {
      path: 'blog',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/blog/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/blog/create');
            return { Component: Page };
          },
        },
        {
          path: ':postId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/blog/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'calendar',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/calendar');
        return { Component: Page };
      },
    },
    {
      path: 'chat',
      element: (
        <ChatLayout>
          <Outlet />
        </ChatLayout>
      ),
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/chat/blank');
            return { Component: Page };
          },
        },
        {
          path: 'compose',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/chat/compose');
            return { Component: Page };
          },
        },
        {
          path: ':threadType/:threadId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/chat/thread');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'crypto',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/crypto');
        return { Component: Page };
      },
    },
    {
      path: 'customers',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/create');
            return { Component: Page };
          },
        },
        {
          path: ':customerId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/customers/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'e-commerce',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/e-commerce');
        return { Component: Page };
      },
    },
    {
      path: 'file-storage',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/file-storage');
        return { Component: Page };
      },
    },
    {
      path: 'invoices',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/invoices/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/invoices/create');
            return { Component: Page };
          },
        },
        {
          path: ':invoiceId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/invoices/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'jobs',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/jobs/browse');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/jobs/create');
            return { Component: Page };
          },
        },
        {
          path: 'companies/:companyId',
          element: (
            <JobCompanyLayout>
              <Outlet />
            </JobCompanyLayout>
          ),
          children: [
            {
              index: true,
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/jobs/company/details');
                return { Component: Page };
              },
            },
            {
              path: 'activity',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/jobs/company/activity');
                return { Component: Page };
              },
            },
            {
              path: 'assets',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/jobs/company/assets');
                return { Component: Page };
              },
            },
            {
              path: 'reviews',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/jobs/company/reviews');
                return { Component: Page };
              },
            },
            {
              path: 'team',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/jobs/company/team');
                return { Component: Page };
              },
            },
          ],
        },
      ],
    },
    {
      path: 'logistics',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/logistics/metrics');
            return { Component: Page };
          },
        },
        {
          path: 'fleet',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/logistics/fleet');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'mail',
      element: (
        <MailLayout>
          <Outlet />
        </MailLayout>
      ),
      children: [
        {
          path: ':labelId',
          children: [
            {
              index: true,
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/mail/threads');
                return { Component: Page };
              },
            },
            {
              path: ':threadId',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/mail/thread');
                return { Component: Page };
              },
            },
          ],
        },
      ],
    },
    {
      path: 'orders',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/create');
            return { Component: Page };
          },
        },
        {
          path: ':orderId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/orders/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'products',
      children: [
        {
          index: true,
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/list');
            return { Component: Page };
          },
        },
        {
          path: 'create',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/create');
            return { Component: Page };
          },
        },
        {
          path: ':productId',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/products/details');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'settings',
      element: (
        <SettingsLayout>
          <Outlet />
        </SettingsLayout>
      ),
      children: [
        {
          path: 'account',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/account');
            return { Component: Page };
          },
        },
        {
          path: 'billing',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/billing');
            return { Component: Page };
          },
        },
        {
          path: 'notifications',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/notifications');
            return { Component: Page };
          },
        },
        {
          path: 'security',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/security');
            return { Component: Page };
          },
        },
        {
          path: 'team',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/team');
            return { Component: Page };
          },
        },
        {
          path: 'integrations',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/settings/integrations');
            return { Component: Page };
          },
        },
      ],
    },
    {
      path: 'social',
      children: [
        {
          path: 'feed',
          lazy: async () => {
            const { Page } = await import('@/pages/dashboard/social/feed');
            return { Component: Page };
          },
        },
        {
          path: 'profile',
          element: (
            <SocialProfileLayout>
              <Outlet />
            </SocialProfileLayout>
          ),
          children: [
            {
              index: true,
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/social/timeline');
                return { Component: Page };
              },
            },
            {
              path: 'connections',
              lazy: async () => {
                const { Page } = await import('@/pages/dashboard/social/connections');
                return { Component: Page };
              },
            },
          ],
        },
      ],
    },
    {
      path: 'tasks',
      lazy: async () => {
        const { Page } = await import('@/pages/dashboard/tasks');
        return { Component: Page };
      },
    },
  ],
};
