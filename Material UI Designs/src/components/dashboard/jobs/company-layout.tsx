import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { CompanyTabs } from '@/components/dashboard/jobs/company-tabs';

const metadata = { title: `Company | Jobs | Dashboard | ${config.site.name}` } satisfies Metadata;

interface Founder {
  id: string;
  name: string;
  avatar?: string;
  role: string;
}

const founders = [
  { id: 'USR-008', name: 'Jie Yan', avatar: '/assets/avatar-8.png', role: 'CEO & Co-founder' },
  { id: 'USR-005', name: 'Fran Perez', avatar: '/assets/avatar-5.png', role: 'CTO & Co-founder' },
  { id: 'USR-011', name: 'Omar Darboe', avatar: '/assets/avatar-11.png', role: 'CFO' },
] satisfies Founder[];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.jobs.browse}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Jobs
            </Link>
          </div>
          <Grid container spacing={4}>
            <Grid lg={8} xs={12}>
              <Card>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 3 }}>
                  <Avatar src="/assets/company-avatar-1.png" variant="rounded" />
                  <div>
                    <Typography variant="h6">Stripe</Typography>
                    <Typography variant="body2">
                      The new standard in online payments. Stripe is the best software platform for running an internet
                    </Typography>
                  </div>
                </Stack>
                <Divider />
                <CompanyTabs />
                <Divider />
                <CardContent>{children}</CardContent>
              </Card>
            </Grid>
            <Grid lg={4} xs={12}>
              <Card>
                <CardContent>
                  <Stack divider={<Divider />} spacing={2}>
                    <Stack spacing={2}>
                      <Typography variant="overline">About</Typography>
                      <PropertyList orientation="vertical">
                        {(
                          [
                            { key: 'Website', value: <Link variant="body2">https://stripe.com</Link> },
                            { key: 'Industry', value: 'Financial Services' },
                            { key: 'Locations', value: 'New York City, Milano, Moscow' },
                            { key: 'Company size', value: '50-100' },
                          ] satisfies { key: string; value: React.ReactNode }[]
                        ).map(
                          (item): React.JSX.Element => (
                            <PropertyItem key={item.key} name={item.key} value={item.value} />
                          )
                        )}
                      </PropertyList>
                    </Stack>
                    <Stack spacing={2}>
                      <Typography variant="overline">Founders</Typography>
                      <Stack spacing={2}>
                        {founders.map((founder) => (
                          <Stack direction="row" key={founder.id} spacing={2} sx={{ alignItems: 'center' }}>
                            <Avatar src={founder.avatar} />
                            <div>
                              <Typography variant="subtitle2">{founder.name}</Typography>
                              <Typography color="text.secondary" variant="body2">
                                {founder.role}
                              </Typography>
                            </div>
                          </Stack>
                        ))}
                      </Stack>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
