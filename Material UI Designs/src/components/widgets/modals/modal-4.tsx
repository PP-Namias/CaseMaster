import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { Presence } from '@/components/core/presence';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  lastActivity?: Date;
}

const contacts = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    status: 'online',
    lastActivity: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'USR-003',
    name: 'Cj Juliane',
    avatar: '/assets/CJ.jpg',
    status: 'away',
    lastActivity: dayjs().subtract(15, 'minute').toDate(),
  },
  { id: 'USR-005', name: 'Fran Perez', avatar: '/assets/avatar-5.png', status: 'busy', lastActivity: dayjs().toDate() },
  {
    id: 'USR-006',
    name: 'Iulia Albu',
    avatar: '/assets/avatar-6.png',
    status: 'online',
    lastActivity: dayjs().toDate(),
  },
  { id: 'USR-008', name: 'Jie Yan', avatar: '/assets/avatar-8.png', status: 'online', lastActivity: dayjs().toDate() },
  {
    id: 'USR-009',
    name: 'Kendo Jenner',
    avatar: '/assets/yvez.jpg',
    status: 'offline',
    lastActivity: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    status: 'online',
    lastActivity: dayjs().toDate(),
  },
  {
    id: 'USR-007',
    name: 'Nasimiyu Danai',
    avatar: '/assets/avatar-7.png',
    status: 'busy',
    lastActivity: dayjs().toDate(),
  },
  {
    id: 'USR-011',
    name: 'Omar Darobe',
    avatar: '/assets/avatar-11.png',
    status: 'offline',
    lastActivity: dayjs().toDate(),
  },
  {
    id: 'USR-004',
    name: 'PP Namias',
    avatar: '/assets/Namias.png',
    status: 'online',
    lastActivity: dayjs().subtract(6, 'hour').toDate(),
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/avatar-2.png',
    status: 'away',
    lastActivity: dayjs().toDate(),
  },
] satisfies Contact[];

export function Modal4(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-shadows-16)',
          maxWidth: '320px',
          mx: 'auto',
        }}
      >
        <Box sx={{ px: 3, py: 2 }}>
          <Typography variant="h6">Contacts</Typography>
        </Box>
        <Box sx={{ maxHeight: '320px', overflowY: 'auto', px: 1, pb: 2 }}>
          <List disablePadding sx={{ '& .MuiListItemButton-root': { borderRadius: 1 } }}>
            {contacts.map((contact) => (
              <ListItem disablePadding key={contact.id}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src={contact.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography noWrap variant="subtitle2">
                        {contact.name}
                      </Typography>
                    }
                  />
                  {contact.status !== 'offline' ? <Presence size="small" status={contact.status} /> : null}
                  {contact.status === 'offline' && Boolean(contact.lastActivity) ? (
                    <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                      {dayjs(contact.lastActivity).fromNow()}
                    </Typography>
                  ) : null}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
}
