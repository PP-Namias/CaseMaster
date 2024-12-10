import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';

type NotificationType = 'message' | 'invite' | 'payout';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  amount: number;
}

const notifications = [
  { id: 'EV-003', type: 'invite', message: 'to send service quotes', amount: 6 },
  { id: 'EV-002', type: 'message', message: 'from clients', amount: 2 },
  { id: 'EV-001', type: 'payout', message: 'that needs your confirmation', amount: 1 },
] satisfies Notification[];

const icons: Record<NotificationType, React.JSX.Element> = {
  invite: <PaperPlaneTiltIcon />,
  message: <EnvelopeSimpleIcon />,
  payout: <CreditCardIcon />,
};

export function GroupedList4(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <List>
          {notifications.map((notification, index) => (
            <ListItem divider={index < notifications.length - 1} key={notification.id}>
              <ListItemIcon>{icons[notification.type]}</ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography noWrap variant="subtitle2">
                    {new Intl.NumberFormat('en-US').format(notification.amount)} {notification.type}s{' '}
                    {notification.message}
                  </Typography>
                }
              />
              <Tooltip title="View">
                <IconButton>
                  <ArrowRightIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Card>
    </Box>
  );
}
