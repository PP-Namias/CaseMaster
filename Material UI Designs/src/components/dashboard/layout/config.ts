import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

// NOTE: We did not use React Components for Icons, because
//  you may one to get the config from the server.

// NOTE: First level elements are groups.

export interface LayoutConfig {
  navItems: NavItemConfig[];
}

export const layoutConfig = {
  navItems: [
    {
      key: 'dashboards',
      title: 'Dashboards',
      items: [
        { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
        { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
        { key: 'ecommerce', title: 'E-commerce', href: paths.dashboard.eCommerce, icon: 'cube' },
        { key: 'crypto', title: 'Crypto', href: paths.dashboard.crypto, icon: 'currency-eth' },
      ],
    },
    {
      key: 'general',
      title: 'General',
      items: [
        {
          key: 'settings',
          title: 'Settings',
          href: paths.dashboard.settings.account,
          icon: 'gear',
          matcher: { type: 'startsWith', href: '/dashboard/settings' },
        },
        {
          key: 'customers',
          title: 'Customers',
          icon: 'users',
          items: [
            { key: 'customers', title: 'List customers', href: paths.dashboard.customers.list },
            { key: 'customers:create', title: 'Create customer', href: paths.dashboard.customers.create },
            { key: 'customers:details', title: 'Customer details', href: paths.dashboard.customers.details('1') },
          ],
        },
        {
          key: 'products',
          title: 'Products',
          icon: 'shopping-bag-open',
          items: [
            { key: 'products', title: 'List products', href: paths.dashboard.products.list },
            { key: 'products:create', title: 'Create product', href: paths.dashboard.products.create },
            { key: 'products:details', title: 'Product details', href: paths.dashboard.products.details('1') },
          ],
        },
        {
          key: 'orders',
          title: 'Orders',
          icon: 'shopping-cart-simple',
          items: [
            { key: 'orders', title: 'List orders', href: paths.dashboard.orders.list },
            { key: 'orders:create', title: 'Create order', href: paths.dashboard.orders.create },
            { key: 'orders:details', title: 'Order details', href: paths.dashboard.orders.details('1') },
          ],
        },
        { key: 'file-storage', title: 'File storage', href: paths.dashboard.fileStorage, icon: 'upload' },
        {
          key: 'mail',
          title: 'Mail',
          href: paths.dashboard.mail.list('inbox'),
          icon: 'envelope-simple',
          matcher: { type: 'startsWith', href: '/dashboard/mail' },
        },
      ],
    },
    

    
    {
      key: 'misc',
      title: 'Misc',
      items: [
        {
          key: 'levels:level-0',
          title: 'Level 0',
          icon: 'align-left',
          items: [
            {
              key: 'levels:level-1a',
              title: 'Level 1a',
              items: [
                {
                  key: 'levels:level-2a',
                  title: 'Level 2a',
                  items: [
                    { key: 'levels:level-3a', title: 'Level 3a' },
                    { key: 'levels:level-3b', title: 'Level 3b', disabled: true },
                  ],
                },
                { key: 'levels:level-2b', title: 'Level 2b' },
              ],
            },
            { key: 'levels:level-1b', title: 'Level 1b' },
          ],
        },
        { key: 'disabled', title: 'Disabled', disabled: true, icon: 'warning-diamond' },
        { key: 'label', title: 'Label', icon: 'file', label: 'New' },
        { key: 'blank', title: 'Blank', href: paths.dashboard.blank, icon: 'file-dashed' },
        { key: 'external', title: 'External link', href: 'https://pp-namias.github.io', external: true, icon: 'link' },
      ],
    },
  ],
} satisfies LayoutConfig;
