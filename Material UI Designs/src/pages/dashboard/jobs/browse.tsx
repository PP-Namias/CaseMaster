import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { CompanyCard } from '@/components/dashboard/jobs/company-card';
import type { Company } from '@/components/dashboard/jobs/company-card';
import { JobsFilters } from '@/components/dashboard/jobs/jobs-filters';

const metadata = { title: `Browse | Jobs | Dashboard | ${config.site.name}` } satisfies Metadata;

const companies = [
  {
    id: 'COM-004',
    name: 'Vercel',
    logo: '/assets/company-Namias.png',
    description: 'Develop. Preview. Ship. For the best frontend teams.',
    rating: 4.5,
    employees: '10-20',
    isVerified: true,
    jobs: [
      {
        id: 'JOB-005',
        title: 'Remote React / React Native Developer',
        currency: 'USD',
        budgetMin: 55000,
        budgetMax: 75000,
        isRemote: true,
        publishedAt: dayjs().subtract(24, 'minute').toDate(),
      },
      {
        id: 'JOB-006',
        title: 'Senior Golang Backend Engineer',
        currency: 'USD',
        budgetMin: 80000,
        budgetMax: 160000,
        country: 'Germany',
        state: 'Bavaria',
        city: 'Munich',
        publishedAt: dayjs().subtract(45, 'minute').subtract(2, 'hour').toDate(),
      },
    ],
  },
  {
    id: 'COM-003',
    name: 'Auth0',
    logo: '/assets/company-CJ.jpg',
    description: 'Secure access for everyone. But not just anyone.',
    rating: 4.3,
    employees: '50-100',
    isVerified: false,
    jobs: [
      {
        id: 'JOB-004',
        title: 'Remote React / React Native Developer',
        currency: 'USD',
        budgetMin: 87000,
        budgetMax: 135000,
        isRemote: true,
        publishedAt: dayjs().subtract(1, 'hour').toDate(),
      },
    ],
  },
  {
    id: 'COM-002',
    name: 'Google Cloud',
    logo: '/assets/company-avatar-2.png',
    description: 'Build, modernize, and scale your applications with Google Cloud.',
    rating: 4.5,
    employees: '1-10',
    isVerified: false,
    jobs: [
      {
        id: 'JOB-003',
        title: 'Senior Backend Engineer',
        currency: 'USD',
        budgetMin: 150000,
        budgetMax: 210000,
        isRemote: true,
        publishedAt: dayjs().subtract(39, 'minute').subtract(7, 'hour').subtract(5, 'day').toDate(),
      },
    ],
  },
  {
    id: 'COM-001',
    name: 'Stripe',
    logo: '/assets/company-avatar-1.png',
    description: 'The new standard in online payments',
    rating: 4.9,
    employees: '50-100',
    isVerified: true,
    jobs: [
      {
        id: 'JOB-001',
        title: 'Senior React Developer',
        currency: 'USD',
        budgetMin: 94000,
        budgetMax: 140000,
        isRemote: true,
        publishedAt: dayjs().subtract(49, 'minute').subtract(2, 'hour').subtract(7, 'day').toDate(),
      },
      {
        id: 'JOB-002',
        title: 'Senior Ruby Engineer',
        currency: 'USD',
        budgetMin: 120000,
        budgetMax: 145000,
        isRemote: true,
        publishedAt: dayjs().subtract(10, 'minute').subtract(7, 'hour').subtract(8, 'day').toDate(),
      },
    ],
  },
] satisfies Company[];

export function Page(): React.JSX.Element {
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
          <Box
            sx={{
              bgcolor: 'var(--mui-palette-neutral-900)',
              borderRadius: 1,
              color: 'var(--mui-palette-common-white)',
              px: 4,
              py: 8,
            }}
          >
            <Grid container sx={{ alignItems: 'center' }}>
              <Grid sm={7} xs={12}>
                <Stack spacing={3}>
                  <Stack spacing={2}>
                    <Typography color="inherit" variant="h3">
                      Reach 50K+ potential candidates.
                    </Typography>
                    <Typography color="neutral.400" variant="body1">
                      Post your job today for free. Promotions start at $99.
                    </Typography>
                  </Stack>
                  <div>
                    <Button
                      color="primary"
                      component={RouterLink}
                      href={paths.dashboard.jobs.create}
                      variant="contained"
                    >
                      Post a job
                    </Button>
                  </div>
                </Stack>
              </Grid>
              <Grid sm={5} sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                <Box
                  alt="Shield"
                  component="img"
                  src="/assets/iconly-glass-shield.svg"
                  sx={{ height: 'auto', width: '200px' }}
                />
              </Grid>
            </Grid>
          </Box>
          <JobsFilters />
          {companies.map((company) => (
            <CompanyCard company={company} key={company.id} />
          ))}
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center', px: 3 }}>
            <IconButton disabled>
              <CaretLeftIcon />
            </IconButton>
            <IconButton>
              <CaretRightIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
