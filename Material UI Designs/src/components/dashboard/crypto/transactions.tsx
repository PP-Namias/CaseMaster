import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ArrowsDownUp as ArrowsDownUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowsDownUp';
import { TrendDown as TrendDownIcon } from '@phosphor-icons/react/dist/ssr/TrendDown';
import { TrendUp as TrendUpIcon } from '@phosphor-icons/react/dist/ssr/TrendUp';

import { dayjs } from '@/lib/dayjs';

export type CurrencyCode = 'BTC' | 'ETH' | 'BNB';

export interface Transaction {
  id: string;
  type: 'add' | 'sub';
  description: string;
  balance: number;
  currency: CurrencyCode;
  amount: number;
  createdAt: Date;
}

export interface TransactionsProps {
  transactions: Transaction[];
}

export function Transactions({ transactions }: TransactionsProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <ArrowsDownUpIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Transactions"
      />
      <List disablePadding sx={{ '& .MuiListItem-root': { py: 2 } }}>
        {transactions.map((transaction) => (
          <ListItem divider key={transaction.id}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: transaction.type === 'add' ? 'var(--mui-palette-success-50)' : 'var(--mui-palette-error-50)',
                  color:
                    transaction.type === 'add' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)',
                }}
              >
                {transaction.type === 'add' ? (
                  <TrendUpIcon fontSize="var(--Icon-fontSize)" />
                ) : (
                  <TrendDownIcon fontSize="var(--Icon-fontSize)" />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={<Typography variant="subtitle2">{transaction.description}</Typography>}
              secondary={
                <Typography color="text.secondary" variant="body2">
                  {dayjs(transaction.createdAt).format('MM.DD.YYYY / hh:mm A')}
                </Typography>
              }
            />
            <div>
              <Typography
                color={transaction.type === 'add' ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-error-main)'}
                sx={{ textAlign: 'right', whiteSpace: 'nowrap' }}
                variant="subtitle2"
              >
                {transaction.type === 'add' ? '+' : '-'} {transaction.amount} {transaction.currency}
              </Typography>
              <Typography color="text.secondary" sx={{ textAlign: 'right' }} variant="body2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(transaction.balance)}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
      <CardActions>
        <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
          See all
        </Button>
      </CardActions>
    </Card>
  );
}
