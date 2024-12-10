import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CalendarBlank as CalendarBlankIcon } from '@phosphor-icons/react/dist/ssr/CalendarBlank';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { dayjs } from '@/lib/dayjs';

export interface Event {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

export function Events({ events }: EventsProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <CalendarBlankIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        subheader="Based on the linked bank accounts"
        title="Upcoming events"
      />
      <CardContent sx={{ py: '8px' }}>
        <List disablePadding>
          {events.map((event) => (
            <EventItem event={event} key={event.id} />
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
          See all events
        </Button>
      </CardActions>
    </Card>
  );
}

export interface EventItemProps {
  event: Event;
}

function EventItem({ event }: EventItemProps): React.JSX.Element {
  return (
    <ListItem disableGutters key={event.id}>
      <ListItemAvatar>
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-level1)',
            borderRadius: 1.5,
            flex: '0 0 auto',
            p: '4px 8px',
            textAlign: 'center',
          }}
        >
          <Typography variant="caption">{dayjs(event.createdAt).format('MMM').toUpperCase()}</Typography>
          <Typography variant="h6">{dayjs(event.createdAt).format('D')}</Typography>
        </Box>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography noWrap variant="subtitle2">
            {event.title}
          </Typography>
        }
        secondary={
          <Typography color="text.secondary" noWrap variant="body2">
            {event.description}
          </Typography>
        }
      />
      <IconButton>
        <CalendarBlankIcon />
      </IconButton>
    </ListItem>
  );
}

export interface EventsProps {
  events: Event[];
}
