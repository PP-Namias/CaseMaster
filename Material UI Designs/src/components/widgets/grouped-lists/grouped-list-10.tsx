import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadSimple as DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';

import { dayjs } from '@/lib/dayjs';

interface Event {
  id: string;
  type: string;
  subject: string;
  description: string;
  createdAt: Date;
}

const events = [
  {
    id: 'EV-003',
    type: 'upload_file',
    subject: 'Project author',
    description: 'has uploaded a new file',
    createdAt: dayjs().subtract(23, 'minute').toDate(),
  },
  {
    id: 'EV-002',
    type: 'join_team',
    subject: 'Adrian Stefan',
    description: 'joined team as a Front-End Developer',
    createdAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-001',
    type: 'join_team',
    subject: 'Alexandru Robert',
    description: 'joined team as a Full Stack Developer',
    createdAt: dayjs().subtract(9, 'hour').toDate(),
  },
] satisfies Event[];

export function GroupedList10(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        {events.map((event) => (
          <Card key={event.id}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto', p: 2 }}>
              <Avatar
                sx={{ bgcolor: 'var(--mui-palette-primary-main)', color: 'var(--mui-palette-primary-contrastText)' }}
              >
                <DownloadSimpleIcon />
              </Avatar>
              <div>
                <Typography variant="body2">
                  <Link color="text.primary" variant="subtitle2">
                    {event.subject}
                  </Link>{' '}
                  {event.description}
                </Typography>
                <div>
                  <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                    {dayjs(event.createdAt).fromNow()}
                  </Typography>
                </div>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
