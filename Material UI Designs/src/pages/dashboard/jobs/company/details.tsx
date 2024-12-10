import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { Description } from '@/components/dashboard/jobs/description';
import { JobsCard } from '@/components/dashboard/jobs/jobs-card';
import { MemberCard } from '@/components/dashboard/jobs/member-card';
import type { Job, Member } from '@/components/dashboard/jobs/types';

const description = `## Stripe is a technology company that builds economic infrastructure for the internet. 

Businesses of every size—from new startups to public companies—use our software to accept payments and manage their businesses online.

Stripe's software is used by millions of businesses in over 120 countries and across nearly every industry. We are a global company with a global team that is committed to building a more fair, more inclusive world.

Our mission emphasizes seeking and hiring diverse voices, including those who are traditionally underrepresented in the technology industry, and we consider this to be one of the most important values we hold close. We're a hard-working, fun, and exciting group who value intellectual curiosity and a passion for problem-solving! We have growing offices located in San Francisco, Sunnyvale, Bellevue, Los Angeles, Tokyo, Hamburg, London, and Zurich.`;

const images = [
  '/assets/company-image-1.jpg',
  '/assets/company-image-2.jpg',
  '/assets/company-image-3.jpg',
  '/assets/company-image-4.jpg',
  '/assets/company-image-5.jpg',
  '/assets/company-image-6.jpg',
] satisfies string[];

const jobs = [
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
] satisfies Job[];

const members = [
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/avatar-8.png',
    role: 'CEO & Co-founder',
    skills: ['JavaScript', 'React', 'Go'],
  },
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    role: 'CTO & Co-founder',
    skills: ['C', 'C++', 'Java'],
  },
] satisfies Member[];

export function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Description content={description} />
      <ImageList cols={3} gap={24} variant="masonry">
        {images.map((image) => (
          <ImageListItem key={image}>
            <Box alt="Gallery" component="img" src={image} sx={{ height: '100%', width: '100%' }} />
          </ImageListItem>
        ))}
      </ImageList>
      <Divider />
      <Stack spacing={3}>
        <Stack
          direction="row"
          spacing={3}
          sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <Typography variant="h6">Jobs</Typography>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.jobs.companies.overview('1')}
            sx={{ alignItems: 'center', display: 'flex', gap: 1 }}
            variant="subtitle2"
          >
            <Typography variant="subtitle2">Jobs</Typography>
            <Box sx={{ display: 'flex', flex: '0 0 auto' }}>
              <ArrowRightIcon fontSize="var(--icon-fontSize-md)" />
            </Box>
          </Link>
        </Stack>
        <JobsCard jobs={jobs} />
      </Stack>
      <Divider />
      <Stack spacing={3}>
        <Stack
          direction="row"
          spacing={3}
          sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <Typography variant="h6">Members</Typography>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.jobs.companies.overview('1')}
            sx={{ alignItems: 'center', display: 'flex', gap: 1 }}
            variant="subtitle2"
          >
            <Typography variant="subtitle2">Members</Typography>
            <Box sx={{ display: 'flex', flex: '0 0 auto' }}>
              <ArrowRightIcon fontSize="var(--icon-fontSize-md)" />
            </Box>
          </Link>
        </Stack>
        <Grid container spacing={3}>
          {members.map((member) => (
            <Grid key={member.id} sm={6} xs={12}>
              <MemberCard member={member} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
}
