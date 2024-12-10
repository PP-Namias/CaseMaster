import * as React from 'react';
import type { EventContentArg } from '@fullcalendar/core';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

export interface EventContentProps extends EventContentArg {
  event: EventContentArg['event'] & { extendedProps: { description?: string; priority?: 'high' | 'medium' | 'low' } };
}

export function EventContent(arg: EventContentProps): React.JSX.Element {
  const { priority = 'low' } = arg.event.extendedProps;

  const color =
    priority === 'high'
      ? 'var(--mui-palette-error-main)'
      : priority === 'medium'
        ? 'var(--mui-palette-warning-main)'
        : 'transparent';

  const startTime = arg.event.start ? dayjs(arg.event.start).format('h:mm A') : null;
  const endTime = arg.event.end ? dayjs(arg.event.end).format('h:mm A') : null;

  return (
    <Paper
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        boxShadow: 'var(--mui-shadows-1)',
        borderRadius: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <Stack direction="row" spacing={1}>
        <Box sx={{ bgcolor: color, flex: '0 0 auto', width: '4px' }} />
        <div>
          {!arg.event.allDay ? (
            <Typography noWrap variant="body2">
              {startTime} - {endTime}
            </Typography>
          ) : null}
          <Typography noWrap variant="body2">
            {arg.event.title}
          </Typography>
        </div>
      </Stack>
    </Paper>
  );
}
