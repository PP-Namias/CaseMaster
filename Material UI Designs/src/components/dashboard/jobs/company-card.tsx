import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SealCheck as SealCheckIcon } from '@phosphor-icons/react/dist/ssr/SealCheck';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

import { JobsCard } from './jobs-card';
import type { Job } from './types';

export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  employees: string;
  rating: number;
  isVerified: boolean;
  jobs: Job[];
}

export interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Avatar
              component={RouterLink}
              href={paths.dashboard.jobs.companies.overview('1')}
              src={company.logo}
              variant="rounded"
            />
            <Stack spacing={1}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.jobs.companies.overview('1')}
                  variant="h6"
                >
                  {company.name}
                </Link>
                <Typography variant="body2">{company.description}</Typography>
              </div>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <UsersIcon fontSize="var(--icon-fontSize-md)" />
                  <Typography color="text.secondary" noWrap variant="overline">
                    {company.employees}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <StarIcon color="var(--mui-palette-warning-main)" fontSize="var(--icon-fontSize-md)" weight="fill" />
                  <Typography color="text.secondary" noWrap variant="overline">
                    {company.rating}
                    /5
                  </Typography>
                </Stack>
                {company.isVerified ? (
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                    <SealCheckIcon
                      color="var(--mui-palette-success-main)"
                      fontSize="var(--icon-fontSize-md)"
                      weight="fill"
                    />
                    <Typography color="success" noWrap variant="overline">
                      Verified
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </Stack>
          </Stack>
          {company.jobs ? <JobsCard jobs={company.jobs} /> : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
