import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { CourseCard } from '@/components/dashboard/academy/course-card';
import { CoursesFilters } from '@/components/dashboard/academy/courses-filters';
import { DailyProgress } from '@/components/dashboard/academy/daily-progress';
import { Help } from '@/components/dashboard/academy/help';
import type { Course } from '@/components/dashboard/academy/types';

const metadata = { title: `Browse | Academy | ${config.site.name}` } satisfies Metadata;

const courses = [
  {
    id: 'CRS-003',
    title: 'React Crash Course: Beginner',
    description: 'Introductory course for design and framework basics',
    media: '/assets/course-3.png',
    duration: '21 hours',
    progress: 90,
  },
  {
    id: 'CRS-002',
    title: 'React and Express Tutorial',
    description: 'Introductory course for design and framework basics',
    media: '/assets/course-2.png',
    duration: '14 hours',
    progress: 52,
  },
  {
    id: 'CRS-001',
    title: 'React and Redux Tutorial',
    description: 'Introductory course for design and framework basics',
    media: '/assets/course-1.png',
    duration: '78 hours',
    progress: 23,
  },
] satisfies Course[];

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
              borderRadius: '20px',
              color: 'var(--mui-palette-common-white)',
              overflow: 'hidden',
              position: 'relative',
              p: { xs: '32px 24px', md: '64px 56px', lg: '120px 80px' },
            }}
          >
            <Box
              alt="Pulse"
              component="img"
              src="/assets/pulse.svg"
              sx={{
                top: 0,
                height: 'auto',
                right: 0,
                position: 'absolute',
                width: '900px',
                zIndex: 0,
                transform: 'scaleX(-1)',
              }}
            />
            <Stack spacing={4} sx={{ position: 'relative', zIndex: 1 }}>
              <Stack spacing={1}>
                <Typography variant="h3">Find unparalleled knowledge</Typography>
                <Typography>Learn from the top-tier creatives and leading experts in AI</Typography>
              </Stack>
              <CoursesFilters />
            </Stack>
          </Box>
          <Stack spacing={1}>
            <Typography variant="h6">Welcome back, Sofia</Typography>
            <Typography color="text.secondary" variant="body2">
              Nice progress so far, keep it up!
            </Typography>
          </Stack>
          <Grid container spacing={4}>
            <Grid md={8} xs={12}>
              <DailyProgress timeCurrent={20} timeGoal={35} />
            </Grid>
            <Grid md={4} xs={12}>
              <Help />
            </Grid>
          </Grid>
          <Stack spacing={4}>
            <Typography variant="h6">My courses</Typography>
            <Grid container spacing={4}>
              {courses.map((course) => (
                <Grid key={course.id} md={4} xs={12}>
                  <CourseCard course={course} />
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
