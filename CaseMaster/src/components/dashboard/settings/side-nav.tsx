'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { LockKey as LockKeyIcon } from '@phosphor-icons/react/dist/ssr/LockKey';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { UserCircle as UserCircleIcon } from '@phosphor-icons/react/dist/ssr/UserCircle';
import { UsersThree as UsersThreeIcon } from '@phosphor-icons/react/dist/ssr/UsersThree';

import type { NavItemConfig } from '../../../types/nav';
import { paths } from '../../../path';
import { isNavItemActive } from '../../../lib/is-nav-item-active';
import { usePathname } from '../../../hooks/use-pathname';
import { RouterLink } from '../../core/link';

// NOTE: First level elements are groups.

const navItems = [
  {
    key: 'personal',
    title: 'Settings',
    items: [
      { key: 'account', title: 'Account', href: paths.dashboard.settings.account, icon: 'user-circle' },
      { key: 'team', title: 'Staff Management', href: paths.dashboard.settings.team, icon: 'users-three' },
      { key: 'logs', title: 'System Logs', href: paths.dashboard.settings.security, icon: 'lock-key' },
    ],
  },
] satisfies NavItemConfig[];

const icons = {
  'credit-card': CreditCardIcon,
  'lock-key': LockKeyIcon,
  'plugs-connected': PlugsConnectedIcon,
  'user-circle': UserCircleIcon,
  'users-three': UsersThreeIcon,
  bell: BellIcon,
} as Record<string, Icon>;

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <div>
      <Stack
        spacing={3}
        sx={{
          flex: '0 0 auto',
          flexDirection: { xs: 'column-reverse', md: 'column' },
          position: { md: 'sticky' },
          top: '64px',
          width: { xs: '100%', md: '240px' },
        }}
      >
        <Stack component="ul" spacing={3} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {navItems.map((group) => (
            <Stack component="li" key={group.key} spacing={2}>
              {group.title ? (
                <div>
                  <Typography color="text.secondary" variant="caption">
                    {group.title}
                  </Typography>
                </div>
              ) : null}
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {group.items.map((item) => (
                  <NavItem {...item} key={item.key} pathname={pathname} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>

        
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src="/assets/avatar.jpg">AV</Avatar>
          <div>
            <Typography variant="subtitle1">PP Namias</Typography>
            <Typography color="text.secondary" variant="caption">
              pp.namias@gmail.com
            </Typography>
          </div>
        </Stack>
      </Stack>
    </div>
  );
}

interface NavItemProps extends NavItemConfig {
  pathname: string;
}

function NavItem({ disabled, external, href, icon, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, pathname, matcher: undefined });
  const Icon = icon ? icons[icon] : null;

  return (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && { color: 'var(--mui-palette-text-disabled)', cursor: 'not-allowed' }),
          ...(active && { bgcolor: 'var(--mui-palette-action-selected)', color: 'var(--mui-palette-text-primary)' }),
          '&:hover': {
            ...(!active &&
              !disabled && { bgcolor: 'var(--mui-palette-action-hover)', color: 'var(---mui-palette-text-primary)' }),
          },
        }}
        tabIndex={0}
      >
        {Icon ? (
          <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
            <Icon
              fill={active ? 'var(--mui-palette-text-primary)' : 'var(--mui-palette-text-secondary)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          </Box>
        ) : null}
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
