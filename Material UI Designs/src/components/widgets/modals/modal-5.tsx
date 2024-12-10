import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ChatText as ChatTextIcon } from '@phosphor-icons/react/dist/ssr/ChatText';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { ShoppingCartSimple as ShoppingCartSimpleIcon } from '@phosphor-icons/react/dist/ssr/ShoppingCartSimple';

import { dayjs } from '@/lib/dayjs';

type NotificationType = 'item_shipped' | 'new_message' | 'order_placed';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  createdAt: Date;
}

const notifications = [
  {
    id: 'EV-004',
    type: 'order_placed',
    title: 'Your order is placed',
    description: 'Shipment will be sent soon',
    createdAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'EV-003',
    type: 'new_message',
    title: 'New message received',
    description: 'You have 32 unread messages',
    createdAt: dayjs().subtract(1, 'day').toDate(),
  },
  {
    id: 'EV-002',
    type: 'item_shipped',
    title: 'Your item is shipped',
    description: 'Go to order history to see details',
    createdAt: dayjs().subtract(3, 'day').toDate(),
  },
  {
    id: 'EV-001',
    type: 'new_message',
    title: 'New message received',
    description: 'You have 32 unread messages',
    createdAt: dayjs().subtract(7, 'day').toDate(),
  },
] satisfies Notification[];

const icons: Record<NotificationType, React.JSX.Element> = {
  item_shipped: <ShoppingCartSimpleIcon fontSize="var(--Icon-fontSize)" />,
  new_message: <ChatTextIcon fontSize="var(--Icon-fontSize)" />,
  order_placed: <CreditCardIcon fontSize="var(--Icon-fontSize)" />,
};

export function Modal5(): React.JSX.Element {
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
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Notifications</Typography>
        </Box>
        <List disablePadding>
          {notifications.map((notification) => (
            <ListItem divider key={notification.id}>
              <ListItemAvatar>
                <Avatar
                  sx={{ bgcolor: 'var(--mui-palette-primary-main)', color: 'var(--mui-palette-primary-contrastText)' }}
                >
                  {icons[notification.type]}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography noWrap variant="subtitle2">
                    {notification.title}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" noWrap variant="body2">
                    {notification.description}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
          <Button color="secondary" size="small">
            Mark all as read
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
