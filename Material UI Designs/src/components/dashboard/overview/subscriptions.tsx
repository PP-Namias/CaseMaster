import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ContactlessPayment as ContactlessPaymentIcon } from '@phosphor-icons/react/dist/ssr/ContactlessPayment';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

export interface Subscription {
  id: string;
  title: string;
  icon: string;
  costs: string;
  billingCycle: string;
  status: 'paid' | 'canceled' | 'expiring';
}

export interface SubscriptionsProps {
  subscriptions: Subscription[];
}

export function Subscriptions({ subscriptions }: SubscriptionsProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <ContactlessPaymentIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Our subscriptions"
      />
      <CardContent sx={{ pb: '8px' }}>
        <List disablePadding>
          {subscriptions.map((subscription) => (
            <SubscriptionItem key={subscription.id} subscription={subscription} />
          ))}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
          See all subscriptions
        </Button>
      </CardActions>
    </Card>
  );
}

function SubscriptionItem({ subscription }: { subscription: Subscription }): React.JSX.Element {
  const { label, color } = (
    {
      paid: { label: 'Paid', color: 'success' },
      canceled: { label: 'Canceled', color: 'error' },
      expiring: { label: 'Expiring', color: 'warning' },
    } as const
  )[subscription.status];

  return (
    <ListItem disableGutters>
      <ListItemAvatar>
        <Avatar
          src={subscription.icon}
          sx={{
            bgcolor: 'var(--mui-palette-background-paper)',
            boxShadow: 'var(--mui-shadows-8)',
            color: 'var(--mui-palette-text-primary)',
          }}
        />
      </ListItemAvatar>
      <ListItemText
        disableTypography
        primary={
          <Typography noWrap variant="subtitle2">
            {subscription.title}
          </Typography>
        }
        secondary={
          <Typography sx={{ whiteSpace: 'nowrap' }} variant="body2">
            {subscription.costs}{' '}
            <Typography color="text.secondary" component="span" variant="inherit">
              /{subscription.billingCycle}
            </Typography>
          </Typography>
        }
      />
      <Chip color={color} label={label} size="small" variant="soft" />
      <IconButton>
        <DotsThreeIcon weight="bold" />
      </IconButton>
    </ListItem>
  );
}
