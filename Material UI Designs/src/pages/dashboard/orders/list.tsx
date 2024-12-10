import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { OrderModal } from '@/components/dashboard/order/order-modal';
import { OrdersFilters } from '@/components/dashboard/order/orders-filters';
import type { Filters } from '@/components/dashboard/order/orders-filters';
import { OrdersPagination } from '@/components/dashboard/order/orders-pagination';
import { OrdersSelectionProvider } from '@/components/dashboard/order/orders-selection-context';
import { OrdersTable } from '@/components/dashboard/order/orders-table';
import type { Order } from '@/components/dashboard/order/orders-table';

const metadata = { title: `List | Orders | Dashboard | ${config.site.name}` } satisfies Metadata;

const orders = [
  {
    id: 'ORD-005',
    customer: { name: 'PP Namias', avatar: '/assets/Namias.png', email: 'penjani.inyene@domain.com' },
    lineItems: 1,
    paymentMethod: { type: 'visa', last4: '4011' },
    currency: 'USD',
    totalAmount: 56.7,
    status: 'pending',
    createdAt: dayjs().subtract(3, 'hour').toDate(),
  },
  {
    id: 'ORD-004',
    customer: { name: 'Jie Yan', avatar: '/assets/avatar-8.png', email: 'jie.yan@domain.com' },
    lineItems: 1,
    paymentMethod: { type: 'amex', last4: '5678' },
    currency: 'USD',
    totalAmount: 49.12,
    status: 'completed',
    createdAt: dayjs().subtract(6, 'hour').toDate(),
  },
  {
    id: 'ORD-003',
    customer: { name: 'Fran Perez', avatar: '/assets/avatar-5.png', email: 'fran.perez@domain.com' },
    lineItems: 2,
    paymentMethod: { type: 'applepay' },
    currency: 'USD',
    totalAmount: 18.75,
    status: 'canceled',
    createdAt: dayjs().subtract(7, 'hour').toDate(),
  },
  {
    id: 'ORD-002',
    customer: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg', email: 'carson.darrin@domain.com' },
    lineItems: 1,
    paymentMethod: { type: 'googlepay' },
    currency: 'USD',
    totalAmount: 49.99,
    status: 'rejected',
    createdAt: dayjs().subtract(1, 'hour').subtract(1, 'day').toDate(),
  },
  {
    id: 'ORD-001',
    customer: { name: 'Miron Vitold', avatar: '/assets/avatar-1.png', email: 'miron.vitold@domain.com' },
    lineItems: 2,
    paymentMethod: { type: 'mastercard', last4: '4242' },
    currency: 'USD',
    totalAmount: 94.01,
    status: 'completed',
    createdAt: dayjs().subtract(3, 'hour').subtract(1, 'day').toDate(),
  },
] satisfies Order[];

export function Page(): React.JSX.Element {
  const { customer, id, previewId, sortDir, status } = useExtractSearchParams();

  const sortedOrders = applySort(orders, sortDir);
  const filteredOrders = applyFilters(sortedOrders, { customer, id, status });

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Orders</Typography>
            </Box>
            <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add
              </Button>
            </div>
          </Stack>
          <OrdersSelectionProvider orders={filteredOrders}>
            <Card>
              <OrdersFilters filters={{ customer, id, status }} sortDir={sortDir} />
              <Divider />
              <Box sx={{ overflowX: 'auto' }}>
                <OrdersTable rows={filteredOrders} />
              </Box>
              <Divider />
              <OrdersPagination count={filteredOrders.length} page={0} />
            </Card>
          </OrdersSelectionProvider>
        </Stack>
      </Box>
      <OrderModal open={Boolean(previewId)} />
    </React.Fragment>
  );
}

function useExtractSearchParams(): {
  customer?: string;
  id?: string;
  previewId?: string;
  sortDir?: 'asc' | 'desc';
  status?: string;
} {
  const [searchParams] = useSearchParams();

  return {
    customer: searchParams.get('customer') || undefined,
    id: searchParams.get('id') || undefined,
    previewId: searchParams.get('previewId') || undefined,
    sortDir: (searchParams.get('sortDir') || undefined) as 'asc' | 'desc' | undefined,
    status: searchParams.get('status') || undefined,
  };
}

// Sorting and filtering has to be done on the server.

function applySort(row: Order[], sortDir: 'asc' | 'desc' | undefined): Order[] {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

function applyFilters(row: Order[], { customer, id, status }: Filters): Order[] {
  return row.filter((item) => {
    if (customer) {
      if (!item.customer?.name?.toLowerCase().includes(customer.toLowerCase())) {
        return false;
      }
    }

    if (id) {
      if (!item.id?.toLowerCase().includes(id.toLowerCase())) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    return true;
  });
}
