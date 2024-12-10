import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { ActivityItem } from '@/components/dashboard/jobs/activity-item';
import type { Event } from '@/components/dashboard/jobs/activity-item';

const events = [
  {
    id: 'EV-004',
    createdAt: dayjs().subtract(7, 'minute').subtract(5, 'hour').subtract(1, 'day').toDate(),
    type: 'new_job',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    job: { title: 'Remote React / React Native Developer' },
  },
  {
    id: 'EV-003',
    createdAt: dayjs().subtract(18, 'minute').subtract(3, 'hour').subtract(5, 'day').toDate(),
    type: 'new_job',
    author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
    job: { title: 'Senior Golang Backend Engineer' },
  },
  {
    id: 'EV-002',
    createdAt: dayjs().subtract(41, 'minute').subtract(5, 'hour').subtract(7, 'day').toDate(),
    type: 'new_member',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    member: { name: 'Omar Darboe' },
  },
  {
    id: 'EV-001',
    createdAt: dayjs().subtract(7, 'minute').subtract(8, 'hour').subtract(7, 'day').toDate(),
    type: 'new_company',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    company: { name: 'Stripe' },
  },
] satisfies Event[];

export function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">Activity</Typography>
      </div>
      <Stack spacing={3}>
        <Timeline
          sx={{
            m: 0,
            p: 0,
            '& .MuiTimelineItem-root': { '&::before': { display: 'none' } },
            '& .MuiTimelineDot-root': { background: 'transparent', border: 0, p: 0 },
            '& .MuiTimelineConnector-root': { minHeight: '30px' },
          }}
        >
          {events.map((event, index) => (
            <ActivityItem connector={index < events.length - 1} event={event} key={event.id} />
          ))}
        </Timeline>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="secondary">Load more</Button>
        </Box>
      </Stack>
    </Stack>
  );
}
