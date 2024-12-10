import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

interface Message {
  id: string;
  content: string;
  author: { name: string; avatar?: string; status: 'online' | 'offline' | 'away' | 'busy' };
  createdAt: Date;
}

const messages = [
  {
    id: 'MSG-005',
    content: 'Hello, we spoke earlier on the phone',
    author: { name: 'Alcides Antonio', avatar: '/assets/avatar-10.png', status: 'online' },
    createdAt: dayjs().subtract(2, 'minute').toDate(),
  },
  {
    id: 'MSG-004',
    content: 'Is the job still available?',
    author: { name: 'Kendo Jenner', avatar: '/assets/yvez.jpg', status: 'online' },
    createdAt: dayjs().subtract(56, 'minute').toDate(),
  },
  {
    id: 'MSG-003',
    content: "What is a screening task? I'd like to",
    author: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg', status: 'offline' },
    createdAt: dayjs().subtract(23, 'minute').subtract(3, 'hour').toDate(),
  },
  {
    id: 'MSG-002',
    content: 'Still waiting for feedback',
    author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png', status: 'online' },
    createdAt: dayjs().subtract(6, 'minute').subtract(8, 'hour').toDate(),
  },
  {
    id: 'MSG-001',
    content: 'Need more information about current campaigns',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png', status: 'offline' },
    createdAt: dayjs().subtract(18, 'minute').subtract(10, 'hour').toDate(),
  },
] satisfies Message[];

export function GroupedList7(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', display: 'flex', justifyContent: 'center', p: 3 }}>
      <Card sx={{ maxWidth: '363px' }}>
        <CardHeader title="Inbox" />
        <Box sx={{ overflowX: 'auto' }}>
          <List
            disablePadding
            sx={{
              p: 1,
              '& .MuiListItemButton-root': { borderRadius: 1 },
              '& .MuiBadge-dot': {
                border: '2px solid var(--mui-palette-background-paper)',
                borderRadius: '50%',
                bottom: '5px',
                height: '12px',
                right: '5px',
                width: '12px',
              },
            }}
          >
            {messages.map((message) => (
              <ListItem disablePadding key={message.id}>
                <ListItemButton>
                  <ListItemAvatar>
                    {message.author.status === 'online' ? (
                      <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} color="success" variant="dot">
                        <Avatar src={message.author.avatar} />
                      </Badge>
                    ) : (
                      <Avatar src={message.author.avatar} />
                    )}
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography noWrap variant="subtitle2">
                        {message.author.name}
                      </Typography>
                    }
                    secondary={
                      <Typography color="text.secondary" noWrap variant="body2">
                        {message.content}
                      </Typography>
                    }
                  />
                  <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                    {dayjs(message.createdAt).fromNow()}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <CardActions>
          <Button color="secondary" size="small">
            Go to chat
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
