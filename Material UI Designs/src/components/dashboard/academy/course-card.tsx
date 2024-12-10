import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';

import type { Course } from './types';

export interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps): React.JSX.Element {
  return (
    <Card variant="outlined">
      <CardMedia
        component={RouterLink}
        href={paths.dashboard.academy.details('1')}
        image={course.media}
        sx={{ height: '180px' }}
      />
      <CardContent>
        <Stack spacing={1}>
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.academy.details('1')}
            underline="none"
            variant="subtitle1"
          >
            {course.title}
          </Link>
          <Typography color="text.secondary" variant="body2">
            {course.description}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <ClockIcon fontSize="var(--icon-fontSize-sm)" />
            <Typography color="text.secondary" variant="caption">
              {course.duration}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <LinearProgress value={course.progress} variant="determinate" />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <Button
          color="secondary"
          component={RouterLink}
          endIcon={<ArrowRightIcon />}
          href={paths.dashboard.academy.details('1')}
        >
          Continue
        </Button>
      </Box>
    </Card>
  );
}
