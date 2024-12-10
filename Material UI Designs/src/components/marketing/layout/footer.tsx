import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

interface GroupConfig {
  key: string;
  title: string;
  items: NavItemConfig[];
}

const groups = [
  {
    key: 'menu',
    title: 'Menu',
    items: [
      { key: 'components', title: 'Components', href: paths.components.index },
      { key: 'dashboard', title: 'Dashboard', href: paths.dashboard.overview },
      { key: 'documentation', title: 'Documentation', external: true, href: paths.docs },
    ],
  },
  {
    key: 'legal',
    title: 'Legal',
    items: [
      { key: 'terms-and-conditions', title: 'Terms & Conditions' },
      { key: 'privacy-policy', title: 'License' },
      { key: 'contact', title: 'Contact' },
    ],
  },
  {
    key: 'social',
    title: 'Social',
    items: [
      { key: 'instagram', title: 'Instagram' },
      { key: 'linkedin', title: 'LinkedIn' },
    ],
  },
] satisfies GroupConfig[];

export function Footer(): React.JSX.Element {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'var(--mui-palette-background-default)',
        borderTop: '1px solid var(--mui-palette-divider)',
        pb: 6,
        pt: { md: 15, xs: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid md={3} sm={4} sx={{ order: { xs: 4, md: 1 } }} xs={12}>
            <Stack spacing={1}>
              <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
              <Typography color="text.secondary" variant="caption">
                © 2024 Devias IO
              </Typography>
            </Stack>
          </Grid>
          {groups.map((section, index) => (
            <Grid key={section.key} md={3} sm={4} sx={{ order: { md: index + 2, xs: index + 1 } }} xs={12}>
              <Typography color="text.secondary" variant="overline">
                {section.title}
              </Typography>
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {section.items.map((item) => (
                  <NavItem {...item} key={item.key} />
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 6 }} />
        <Typography color="text.secondary" variant="caption">
          All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

interface NavItemProps extends NavItemConfig {}

function NavItem({ href, external, title }: NavItemProps): React.JSX.Element {
  return (
    <Stack direction="row" key={title} spacing={2} sx={{ alignItems: 'center' }}>
      <Box sx={{ bgcolor: 'var(--mui-palette-primary-main)', height: '2px', width: '12px' }} />
      <Link
        {...(href ? (external ? { component: 'a', href, target: '_blank' } : { component: RouterLink, href }) : {})}
        color="text.primary"
        variant="subtitle2"
      >
        {title}
      </Link>
    </Stack>
  );
}
