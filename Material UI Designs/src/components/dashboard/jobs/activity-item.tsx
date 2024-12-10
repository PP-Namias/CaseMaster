import * as React from 'react';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

export type Event = { id: string; createdAt: Date } & (
  | { type: 'new_company'; author: { name: string; avatar?: string }; company: { name: string } }
  | { type: 'new_member'; author: { name: string; avatar?: string }; member: { name: string } }
  | { type: 'new_job'; author: { name: string; avatar?: string }; job: { title: string } }
);

interface ActivityItemProps {
  connector: boolean;
  event: Event;
}

export function ActivityItem({ event, connector }: ActivityItemProps): React.JSX.Element {
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot>{event.author ? <Avatar src={event.author.avatar} /> : null}</TimelineDot>
        {connector ? <TimelineConnector /> : null}
      </TimelineSeparator>
      <TimelineContent>
        <ActivityContent event={event} />
        <Typography color="text.secondary" variant="caption">
          {dayjs(event.createdAt).format('MMM D, hh:mm A')}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

interface ActivityContentProps {
  event: Event;
}

function ActivityContent({ event }: ActivityContentProps): React.JSX.Element {
  if (event.type === 'new_company') {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="subtitle2">
          {event.author.name}
        </Typography>{' '}
        <Typography component="span" variant="inherit">
          created
        </Typography>{' '}
        <Typography component="span" variant="subtitle2">
          {event.company.name}
        </Typography>{' '}
        company
      </Typography>
    );
  }

  if (event.type === 'new_member') {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="subtitle2">
          {event.author.name}
        </Typography>{' '}
        <Typography component="span" variant="inherit">
          added
        </Typography>{' '}
        <Typography component="span" variant="subtitle2">
          {event.member.name}
        </Typography>{' '}
        <Typography component="span" variant="inherit">
          as a team member
        </Typography>
      </Typography>
    );
  }

  if (event.type === 'new_job') {
    return (
      <Typography variant="body2">
        <Typography component="span" variant="subtitle2">
          {event.author.name}
        </Typography>{' '}
        <Typography component="span" variant="inherit">
          added a new job
        </Typography>{' '}
        <Link variant="subtitle2">{event.job.title}</Link>
      </Typography>
    );
  }

  return <div />;
}
