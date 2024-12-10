import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Option } from '@/components/core/option';

interface LineItem {
  id: string;
  product: string;
  image: string;
  quantity: number;
  currency: string;
  unitAmount: number;
}

const lineItems = [
  {
    id: 'LI-001',
    image: '/assets/product-1.png',
    product: 'Erbology Aloe Vera',
    quantity: 1,
    currency: 'USD',
    unitAmount: 24,
  },
  {
    id: 'LI-002',
    product: 'Lancome Rouge',
    image: '/assets/product-2.png',
    quantity: 1,
    currency: 'USD',
    unitAmount: 95,
  },
] satisfies LineItem[];

export function Form14(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Card variant="outlined">
        <Stack spacing={2} sx={{ p: 3 }}>
          <div>
            <Typography variant="h6">Order summary</Typography>
          </div>
          <List disablePadding>
            {lineItems.map((lineItem) => (
              <ListItem disableGutters key={lineItem.id}>
                <ListItemAvatar>
                  <Box
                    sx={{
                      alignItems: 'center',
                      borderRadius: '8px',
                      display: 'flex',
                      height: '100px',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      width: '100px',
                    }}
                  >
                    <Box
                      alt={lineItem.product}
                      component="img"
                      src={lineItem.image}
                      sx={{ height: 'auto', width: '100%' }}
                    />
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography noWrap variant="subtitle2">
                      {lineItem.product}
                    </Typography>
                  }
                  secondary={
                    <Typography color="text.secondary" sx={{ mt: 1 }} variant="body1">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: lineItem.currency }).format(
                        lineItem.unitAmount
                      )}
                    </Typography>
                  }
                />
                <Select defaultValue={lineItem.quantity} name="quantity">
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                  <Option value={3}>3</Option>
                </Select>
              </ListItem>
            ))}
          </List>
          <Stack spacing={2}>
            <OutlinedInput placeholder="Discount code" />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="button">Apply coupon</Button>
            </Box>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Subtotal</Typography>
              <Typography variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(119)}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Shipping tax</Typography>
              <Typography variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(20)}
              </Typography>
            </Stack>
            <Divider />
            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Total</Typography>
              <Typography variant="subtitle2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(139)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Box>
  );
}
