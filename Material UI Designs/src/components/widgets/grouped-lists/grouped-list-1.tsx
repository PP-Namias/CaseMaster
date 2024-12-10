import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { dayjs } from '@/lib/dayjs';

interface Event {
  id: string;
  type: string;
  description: string;
  customer: { name: string; avatar?: string };
  createdAt: Date;
}

const events = [
  {
    id: 'EV-005',
    type: 'register',
    description: 'Created account',
    customer: { name: 'Kendo Jenner', avatar: '/assets/yvez.jpg' },
    createdAt: dayjs().subtract(23, 'minute').toDate(),
  },
  {
    id: 'EV-004',
    type: 'payment',
    description: 'Purchased subscription',
    customer: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg' },
    createdAt: dayjs().subtract(56, 'minute').toDate(),
  },
  {
    id: 'EV-003',
    type: 'ticket_create',
    description: 'Submitted a ticket',
    customer: { name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
    createdAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-002',
    type: 'payment',
    description: 'Purchased subscription',
    customer: { avatar: '/assets/avatar-8.png', name: 'Jie Yan' },
    createdAt: dayjs().subtract(5, 'minute').toDate(),
  },
  {
    id: 'EV-001',
    type: 'payment',
    description: 'Purchased subscription',
    customer: { name: 'PP Namias', avatar: '/assets/avatar.jpg' },
    createdAt: dayjs().subtract(5, 'minute').toDate(),
  },
] satisfies Event[];

export function GroupedList1(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            action={
              <IconButton>
                <DotsThreeIcon weight="bold" />
              </IconButton>
            }
            title="Activity"
          />
          <Divider />
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: '1 1 auto', p: 3, textAlign: 'center' }}>
              <Typography variant="h5">{new Intl.NumberFormat('en-US').format(15245)}</Typography>
              <Typography color="text.secondary" component="h4" variant="overline">
                Registered
              </Typography>
            </Box>
            <Box sx={{ flex: '1 1 auto', p: 3, textAlign: 'center' }}>
              <Typography variant="h5">{new Intl.NumberFormat('en-US').format(357)}</Typography>
              <Typography color="text.secondary" component="h4" variant="overline">
                Online
              </Typography>
            </Box>
          </Box>
          <Divider />
          <List disablePadding>
            {events.map((event, index) => (
              <ListItem divider={index < events.length - 1} key={event.id}>
                <ListItemAvatar>
                  <Avatar src={event.customer.avatar} sx={{ cursor: 'pointer' }} />
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography noWrap variant="subtitle2">
                      {event.customer.name}
                    </Typography>
                  }
                  secondary={
                    <Typography color="text.secondary" noWrap variant="body2">
                      {event.description}
                    </Typography>
                  }
                />
                <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                  {dayjs(event.createdAt).fromNow()}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Card>
      </Container>
    </Box>
  );
}
