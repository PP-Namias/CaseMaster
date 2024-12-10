import * as React from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { usePathname } from '@/hooks/use-pathname';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

// NOTE: First level elements are groups.

const navItems = [
  {
    key: 'group-0',
    items: [
      { key: 'home', title: 'Home', href: paths.home },
      { key: 'components', title: 'Components', href: paths.components.index },
      {
        key: 'dashboard',
        title: 'Dashboard',
        items: [
          { key: 'overview', title: 'Overview', href: paths.dashboard.overview },
          { key: 'analytics', title: 'Customers', href: paths.dashboard.customers.list },
          { key: 'logistics', title: 'Logistics', href: paths.dashboard.logistics.metrics },
          { key: 'settings', title: 'Settings', href: paths.dashboard.settings.account },
          { key: 'file-storage', title: 'File storage', href: paths.dashboard.fileStorage },
        ],
      },
      {
        key: 'marketing',
        title: 'Marketing',
        items: [
          { key: 'blog', title: 'Blog', href: paths.dashboard.blog.list },
          { key: 'pricing', title: 'Pricing', href: paths.pricing },
          { key: 'contact', title: 'Contact', href: paths.contact },
          { key: 'checkout', title: 'Checkout', href: paths.checkout },
          { key: 'error', title: 'Error', href: paths.notFound },
        ],
      },
      { key: 'docs', title: 'Docs', href: paths.docs, external: true },
    ],
  },
] satisfies NavItemConfig[];

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
}

export function MobileNav({ onClose, open = false }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': {
          '--MobileNav-background': 'var(--mui-palette-background-paper)',
          '--MobileNav-color': 'var(--mui-palette-text-primary)',
          '--NavGroup-title-color': 'var(--mui-palette-neutral-400)',
          '--NavItem-color': 'var(--mui-palette-text-secondary)',
          '--NavItem-hover-background': 'var(--mui-palette-action-hover)',
          '--NavItem-active-background': 'var(--mui-palette-action-selected)',
          '--NavItem-active-color': 'var(--mui-palette-text-primary)',
          '--NavItem-disabled-color': 'var(--mui-palette-text-disabled)',
          '--NavItem-icon-color': 'var(--mui-palette-neutral-500)',
          '--NavItem-icon-active-color': 'var(--mui-palette-primary-main)',
          '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
          '--NavItem-expand-color': 'var(--mui-palette-neutral-400)',
          bgcolor: 'var(--MobileNav-background)',
          color: 'var(--MobileNav-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          zIndex: 'var(--MobileNav-zIndex)',
        },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
            <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
          </Box>
          <IconButton onClick={onClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Box component="nav">
          <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {renderNavGroups({ items: navItems, onClose, pathname })}
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function renderNavGroups({
  items,
  onClose,
  pathname,
}: {
  items: NavItemConfig[];
  onClose?: () => void;
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    acc.push(
      <Stack component="li" key={curr.key} spacing={1.5}>
        {curr.title ? (
          <div>
            <Typography sx={{ color: 'var(--NavGroup-title-color)', fontSize: '0.875rem', fontWeight: 500 }}>
              {curr.title}
            </Typography>
          </div>
        ) : null}
        <div>{renderNavItems({ depth: 0, items: curr.items, onClose, pathname })}</div>
      </Stack>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

function renderNavItems({
  depth = 0,
  items = [],
  onClose,
  pathname,
}: {
  depth: number;
  items?: NavItemConfig[];
  onClose?: () => void;
  pathname: string;
}): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { items: childItems, key, ...item } = curr;

    const forceOpen = childItems
      ? Boolean(childItems.find((childItem) => childItem.href && pathname.startsWith(childItem.href)))
      : false;

    acc.push(
      <NavItem depth={depth} forceOpen={forceOpen} key={key} onClose={onClose} pathname={pathname} {...item}>
        {childItems ? renderNavItems({ depth: depth + 1, items: childItems, onClose, pathname }) : null}
      </NavItem>
    );

    return acc;
  }, []);

  return (
    <Stack component="ul" data-depth={depth} spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  children?: React.ReactNode;
  depth: number;
  forceOpen?: boolean;
  onClose?: () => void;
  pathname: string;
}

function NavItem({
  children,
  depth,
  disabled,
  external,
  forceOpen = false,
  href,
  matcher,
  onClose,
  pathname,
  title,
}: NavItemProps): React.JSX.Element {
  const [open, setOpen] = React.useState<boolean>(forceOpen);
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const ExpandIcon = open ? CaretDownIcon : CaretRightIcon;
  const isBranch = children && !href;
  const showChildren = Boolean(children && open);

  return (
    <Box component="li" data-depth={depth} sx={{ userSelect: 'none' }}>
      <Box
        {...(isBranch
          ? {
              onClick: (): void => {
                setOpen(!open);
              },
              onKeyUp: (event: React.KeyboardEvent<HTMLElement>): void => {
                if (event.key === 'Enter' || event.key === ' ') {
                  setOpen(!open);
                }
              },
              role: 'button',
            }
          : {
              ...(href
                ? {
                    component: external ? 'a' : RouterLink,
                    href,
                    target: external ? '_blank' : undefined,
                    rel: external ? 'noreferrer' : undefined,
                    onClick: (): void => {
                      onClose?.();
                    },
                  }
                : { role: 'button' }),
            })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          p: '12px',
          textDecoration: 'none',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
          ...(open && { color: 'var(--NavItem-open-color)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'var(--NavItem-hover-background)', color: 'var(--NavItem-hover-color)' }),
          },
        }}
        tabIndex={0}
      >
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {isBranch ? <ExpandIcon fontSize="var(--icon-fontSize-sm)" /> : null}
      </Box>
      {showChildren ? <Box sx={{ pl: '20px' }}>{children}</Box> : null}
    </Box>
  );
}
