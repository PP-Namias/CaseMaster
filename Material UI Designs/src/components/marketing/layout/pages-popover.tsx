import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

interface GroupConfig {
  key: string;
  title: string;
  items: Omit<NavItemConfig, 'items'>[];
}

const groups: GroupConfig[] = [
  {
    key: 'group-0',
    title: 'Dashboard',
    items: [
      { key: 'overview', title: 'Overview', href: paths.dashboard.overview },
      { key: 'customers', title: 'Customers', href: paths.dashboard.customers.list },
      { key: 'logistics', title: 'Logistics', href: paths.dashboard.logistics.metrics },
      { key: 'settings', title: 'Settings', href: paths.dashboard.settings.account },
      { key: 'file-storage', title: 'File storage', href: paths.dashboard.fileStorage },
    ],
  },
  {
    key: 'group-1',
    title: 'Marketing',
    items: [
      { key: 'blog', title: 'Blog', href: paths.dashboard.blog.list },
      { key: 'pricing', title: 'Pricing', href: paths.pricing },
      { key: 'contact', title: 'Contact', href: paths.contact },
      { key: 'checkout', title: 'Checkout', href: paths.checkout },
      { key: 'error', title: 'Error', href: paths.notFound },
    ],
  },
];

export function PagesPopover(): React.JSX.Element {
  return (
    <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', p: 3 }}>
      {groups.map((group) => {
        return (
          <Stack component="ul" key={group.key} spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            <Stack component="li" spacing={1}>
              <div>
                <Box
                  sx={{
                    border: '1px solid var(--mui-palette-divider)',
                    borderRadius: '12px',
                    boxShadow: 'var(--mui-shadows-8)',
                    display: 'inline-block',
                    p: '6px 12px',
                  }}
                >
                  <Typography variant="subtitle2">{group.title}</Typography>
                </Box>
              </div>
              <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {group.items.map((item) => {
                  return (
                    <li key={item.key}>
                      <Box
                        {...(item.href
                          ? item.external
                            ? { component: 'a', href: item.href, target: '_blank' }
                            : { component: RouterLink, href: item.href }
                          : {})}
                        sx={{
                          alignItems: 'center',
                          borderRadius: 1,
                          color: 'var(--mui-palette-text-primary)',
                          display: 'flex',
                          p: '6px 12px',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          ...(item.disabled && {
                            bgcolor: 'var(--mui-palette-action-disabledBackground)',
                            color: 'var(--mui-action-disabled)',
                            cursor: 'not-allowed',
                          }),
                          '&:hover': { ...(!item.disabled && { bgcolor: 'var(--mui-palette-action-hover)' }) },
                        }}
                      >
                        <Box sx={{ flex: '1 1 auto' }}>
                          <Typography
                            component="span"
                            sx={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                      </Box>
                    </li>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
        );
      })}
    </Box>
  );
}
