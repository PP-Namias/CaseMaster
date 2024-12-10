import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCartSimple';
import { Truck as TruckIcon } from '@phosphor-icons/react/dist/ssr/Truck';

import { dayjs } from '@/lib/dayjs';

export type Event = { id: string; createdAt: Date } & (
  | { type: 'order_created' }
  | { type: 'items_shipped'; carrier: string; trackingNumber: string }
  | { type: 'shipment_notice'; description: string }
  | { type: 'note_added'; author: { name: string; avatar: string }; note: string }
);

export interface EventsTimelineProps {
  events: Event[];
}

export function EventsTimeline({ events }: EventsTimelineProps): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <OutlinedInput minRows={3} multiline placeholder="Add a note" />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained">Add note</Button>
        </Box>
      </Stack>
      <Timeline
        sx={{
          m: 0,
          p: 0,
          '& .MuiTimelineItem-root': { '&::before': { display: 'none' } },
          '& .MuiTimelineSeparator-root': { minWidth: 'unset' },
          '& .MuiTimelineDot-root': { background: 'transparent', border: 0, p: 0 },
          '& .MuiTimelineConnector-root': { minHeight: '16px' },
        }}
      >
        {events.map((event, index) => (
          <TimelineItem key={event.id}>
            <EventContent connector={index !== events.length - 1} event={event} />
          </TimelineItem>
        ))}
      </Timeline>
    </Stack>
  );
}

interface EventContentProps {
  connector?: boolean;
  event: Event;
}

function EventContent({ connector, event }: EventContentProps): React.JSX.Element | null {
  const createdAt = dayjs(event.createdAt).format('MMM D, hh:mm A');

  if (event.type === 'order_created') {
    return (
      <React.Fragment>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar>
              <ShoppingCartSimpleIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
          </TimelineDot>
          {connector ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2">Order created</Typography>
          <Typography color="text.secondary" variant="caption">
            {createdAt}
          </Typography>
        </TimelineContent>
      </React.Fragment>
    );
  }

  if (event.type === 'items_shipped') {
    return (
      <React.Fragment>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar>
              <TruckIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
          </TimelineDot>
          {connector ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2">Items shipped</Typography>
          <Typography variant="body2">
            Shipped via {event.carrier} with tracking number {event.trackingNumber}.
          </Typography>
          <Typography color="text.secondary" variant="caption">
            {createdAt}
          </Typography>
        </TimelineContent>
      </React.Fragment>
    );
  }

  if (event.type === 'shipment_notice') {
    return (
      <React.Fragment>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar>
              <EnvelopeSimpleIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
          </TimelineDot>
          {connector ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2">Shipment notice sent</Typography>
          <Typography color="text.secondary" variant="caption">
            {createdAt}
          </Typography>
        </TimelineContent>
      </React.Fragment>
    );
  }

  if (event.type === 'note_added') {
    return (
      <React.Fragment>
        <TimelineSeparator>
          <TimelineDot>
            <Avatar src={event.author.avatar} />
          </TimelineDot>
          {connector ? <TimelineConnector /> : null}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="subtitle2">{event.author.name} added a note</Typography>
          <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', borderRadius: 1, p: 1 }}>
            <Typography variant="body2">{event.note}</Typography>
          </Box>
          <Typography color="text.secondary" variant="caption">
            {createdAt}
          </Typography>
        </TimelineContent>
      </React.Fragment>
    );
  }

  return null;
}
