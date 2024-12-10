import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { ShieldWarning as ShieldWarningIcon } from '@phosphor-icons/react/dist/ssr/ShieldWarning';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';
import { Notifications } from '@/components/dashboard/customer/notifications';
import { Payments } from '@/components/dashboard/customer/payments';
import type { Address } from '@/components/dashboard/customer/shipping-address';
import { ShippingAddress } from '@/components/dashboard/customer/shipping-address';

const metadata = { title: `Details | Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
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
          <Stack spacing={3}>
            <div>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.customers.list}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Customers
              </Link>
            </div>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Avatar src="/assets/avatar-1.png" sx={{ '--Avatar-size': '64px' }}>
                  MV
                </Avatar>
                <div>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography variant="h4">Miron Vitold</Typography>
                    <Chip
                      icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                      label="Active"
                      size="small"
                      variant="outlined"
                    />
                  </Stack>
                  <Typography color="text.secondary" variant="body1">
                    miron.vitold@domain.com
                  </Typography>
                </div>
              </Stack>
              <div>
                <Button endIcon={<CaretDownIcon />} variant="contained">
                  Action
                </Button>
              </div>
            </Stack>
          </Stack>
          <Grid container spacing={4}>
            <Grid lg={4} xs={12}>
              <Stack spacing={4}>
                <Card>
                  <CardHeader
                    action={
                      <IconButton>
                        <PencilSimpleIcon />
                      </IconButton>
                    }
                    avatar={
                      <Avatar>
                        <UserIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Basic details"
                  />
                  <PropertyList
                    divider={<Divider />}
                    orientation="vertical"
                    sx={{ '--PropertyItem-padding': '12px 24px' }}
                  >
                    {(
                      [
                        { key: 'Customer ID', value: <Chip label="USR-001" size="small" variant="soft" /> },
                        { key: 'Name', value: 'Miron Vitold' },
                        { key: 'Email', value: 'miron.vitold@domain.com' },
                        { key: 'Phone', value: '(425) 434-5535' },
                        { key: 'Company', value: 'Devias IO' },
                        {
                          key: 'Quota',
                          value: (
                            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                              <LinearProgress sx={{ flex: '1 1 auto' }} value={50} variant="determinate" />
                              <Typography color="text.secondary" variant="body2">
                                50%
                              </Typography>
                            </Stack>
                          ),
                        },
                      ] satisfies { key: string; value: React.ReactNode }[]
                    ).map(
                      (item): React.JSX.Element => (
                        <PropertyItem key={item.key} name={item.key} value={item.value} />
                      )
                    )}
                  </PropertyList>
                </Card>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar>
                        <ShieldWarningIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Security"
                  />
                  <CardContent>
                    <Stack spacing={1}>
                      <div>
                        <Button color="error" variant="contained">
                          Delete account
                        </Button>
                      </div>
                      <Typography color="text.secondary" variant="body2">
                        A deleted customer cannot be restored. All data will be permanently removed.
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Stack>
            </Grid>
            <Grid lg={8} xs={12}>
              <Stack spacing={4}>
                <Payments
                  ordersValue={2069.48}
                  payments={[
                    {
                      currency: 'USD',
                      amount: 500,
                      invoiceId: 'INV-005',
                      status: 'completed',
                      createdAt: dayjs().subtract(5, 'minute').subtract(1, 'hour').toDate(),
                    },
                    {
                      currency: 'USD',
                      amount: 324.5,
                      invoiceId: 'INV-004',
                      status: 'refunded',
                      createdAt: dayjs().subtract(21, 'minute').subtract(2, 'hour').toDate(),
                    },
                    {
                      currency: 'USD',
                      amount: 746.5,
                      invoiceId: 'INV-003',
                      status: 'completed',
                      createdAt: dayjs().subtract(7, 'minute').subtract(3, 'hour').toDate(),
                    },
                    {
                      currency: 'USD',
                      amount: 56.89,
                      invoiceId: 'INV-002',
                      status: 'completed',
                      createdAt: dayjs().subtract(48, 'minute').subtract(4, 'hour').toDate(),
                    },
                    {
                      currency: 'USD',
                      amount: 541.59,
                      invoiceId: 'INV-001',
                      status: 'completed',
                      createdAt: dayjs().subtract(31, 'minute').subtract(5, 'hour').toDate(),
                    },
                  ]}
                  refundsValue={324.5}
                  totalOrders={5}
                />
                <Card>
                  <CardHeader
                    action={
                      <Button color="secondary" startIcon={<PencilSimpleIcon />}>
                        Edit
                      </Button>
                    }
                    avatar={
                      <Avatar>
                        <CreditCardIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Billing details"
                  />
                  <CardContent>
                    <Card sx={{ borderRadius: 1 }} variant="outlined">
                      <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '16px' }}>
                        {(
                          [
                            { key: 'Credit card', value: '**** 4142' },
                            { key: 'Country', value: 'United States' },
                            { key: 'State', value: 'Michigan' },
                            { key: 'City', value: 'Southfield' },
                            { key: 'Address', value: '1721 Bartlett Avenue, 48034' },
                            { key: 'Tax ID', value: 'EU87956621' },
                          ] satisfies { key: string; value: React.ReactNode }[]
                        ).map(
                          (item): React.JSX.Element => (
                            <PropertyItem key={item.key} name={item.key} value={item.value} />
                          )
                        )}
                      </PropertyList>
                    </Card>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader
                    action={
                      <Button color="secondary" startIcon={<PlusIcon />}>
                        Add
                      </Button>
                    }
                    avatar={
                      <Avatar>
                        <HouseIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    }
                    title="Shipping addresses"
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      {(
                        [
                          {
                            id: 'ADR-001',
                            country: 'United States',
                            state: 'Michigan',
                            city: 'Lansing',
                            zipCode: '48933',
                            street: '480 Haven Lane',
                            primary: true,
                          },
                          {
                            id: 'ADR-002',
                            country: 'United States',
                            state: 'Missouri',
                            city: 'Springfield',
                            zipCode: '65804',
                            street: '4807 Lighthouse Drive',
                          },
                        ] satisfies Address[]
                      ).map((address) => (
                        <Grid key={address.id} md={6} xs={12}>
                          <ShippingAddress address={address} />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
                <Notifications
                  notifications={[
                    {
                      id: 'EV-002',
                      type: 'Refund request approved',
                      status: 'pending',
                      createdAt: dayjs().subtract(34, 'minute').subtract(5, 'hour').subtract(3, 'day').toDate(),
                    },
                    {
                      id: 'EV-001',
                      type: 'Order confirmation',
                      status: 'delivered',
                      createdAt: dayjs().subtract(49, 'minute').subtract(11, 'hour').subtract(4, 'day').toDate(),
                    },
                  ]}
                />
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
