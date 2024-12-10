import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

export function DetailList3(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Order info" />
        <Divider />
        <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '16px 24px' }}>
          {(
            [
              {
                key: 'Customer',
                value: (
                  <Typography variant="subtitle2">
                    Miron Vitold
                    <br />
                    1721 Bartlett Avenue
                    <br />
                    Southfield, Michigan, United States
                  </Typography>
                ),
              },
              { key: 'ID', value: 'ORD-001' },
              { key: 'Date', value: dayjs().subtract(34, 'minute').format('MMM D, YYYY hh:mm A') },
              { key: 'Promotion Code', value: 'N/A' },
              {
                key: 'Total Amount',
                value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(94.01),
              },
              {
                key: 'Status',
                value: (
                  <Select defaultValue="pending" name="status" sx={{ maxWidth: '100%', width: '240px' }}>
                    <Option value="pending">Pending</Option>
                    <Option value="completed">Completed</Option>
                    <Option value="canceled">Canceled</Option>
                  </Select>
                ),
              },
            ] satisfies { key: string; value: React.ReactNode }[]
          ).map(
            (item): React.JSX.Element => (
              <PropertyItem key={item.key} name={item.key} value={item.value} />
            )
          )}
        </PropertyList>
        <Divider />
        <CardActions>
          <Button color="secondary" startIcon={<ReceiptIcon />}>
            Resend invoice
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
