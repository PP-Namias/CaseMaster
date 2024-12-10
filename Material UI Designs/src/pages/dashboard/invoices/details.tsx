import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { InvoicePDFLink } from '@/components/dashboard/invoice/invoice-pdf-link';
import { LineItemsTable } from '@/components/dashboard/invoice/line-items-table';
import type { LineItem } from '@/components/dashboard/invoice/line-items-table';

const metadata = { title: `Details | Invoices | Dashboard | ${config.site.name}` } satisfies Metadata;

const lineItems = [
  { id: 'LI-001', name: 'Pro Subscription', quantity: 1, currency: 'USD', unitAmount: 14.99, totalAmount: 14.99 },
] satisfies LineItem[];

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
                href={paths.dashboard.invoices.list}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Invoices
              </Link>
            </div>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Stack spacing={1}>
                <Typography variant="h4">INV-001</Typography>
                <div>
                  <Chip color="warning" label="Pending" variant="soft" />
                </div>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <InvoicePDFLink invoice={undefined}>
                  <Button color="secondary">Download</Button>
                </InvoicePDFLink>
                <Button component="a" href={paths.pdf.invoice('1')} target="_blank" variant="contained">
                  Preview
                </Button>
              </Stack>
            </Stack>
          </Stack>
          <Card sx={{ p: 6 }}>
            <Stack spacing={6}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ flex: '1 1 auto' }}>
                  <Typography variant="h4">Invoice</Typography>
                </Box>
                <Box sx={{ flex: '0 0 auto' }}>
                  <DynamicLogo colorDark="light" colorLight="dark" emblem height={60} width={60} />
                </Box>
              </Stack>
              <Stack spacing={1}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography variant="subtitle2">Number:</Typography>
                  </Box>
                  <div>
                    <Typography variant="body2">INV-008</Typography>
                  </div>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography variant="subtitle2">Due date:</Typography>
                  </Box>
                  <div>
                    <Typography variant="body2">{dayjs().add(15, 'day').format('MMM D,YYYY')}</Typography>
                  </div>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography variant="subtitle2">Issue date:</Typography>
                  </Box>
                  <div>
                    <Typography variant="body2">{dayjs().subtract(1, 'hour').format('MMM D, YYYY')}</Typography>
                  </div>
                </Stack>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Box sx={{ flex: '0 1 150px' }}>
                    <Typography variant="subtitle2">Issuer VAT No:</Typography>
                  </Box>
                  <Typography variant="body2">RO4675933</Typography>
                </Stack>
              </Stack>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">Devias IO</Typography>
                    <Typography variant="body2">
                      2674 Alfred Drive
                      <br />
                      Brooklyn, New York, United States
                      <br />
                      11206
                      <br />
                      accounts@devias.io
                      <br />
                      (+1) 757 737 1980
                    </Typography>
                  </Stack>
                </Grid>
                <Grid md={6} xs={12}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle1">Billed to</Typography>
                    <Typography variant="body2">
                      Miron Vitold
                      <br />
                      Acme Inc.
                      <br />
                      1721 Bartlett Avenue
                      <br />
                      Southfield, Michigan, United States
                      <br />
                      48034
                      <br />
                      RO8795621
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <div>
                <Typography variant="h5">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(19.99)} due{' '}
                  {dayjs().add(15, 'day').format('MMM D, YYYY')}
                </Typography>
              </div>
              <Stack spacing={2}>
                <Card sx={{ borderRadius: 1, overflowX: 'auto' }} variant="outlined">
                  <LineItemsTable rows={lineItems} />
                </Card>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ flex: '0 1 150px' }}>
                      <Typography>Subtotal</Typography>
                    </Box>
                    <Box sx={{ flex: '0 1 100px', textAlign: 'right' }}>
                      <Typography>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(14.99)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ flex: '0 1 150px' }}>
                      <Typography>Tax</Typography>
                    </Box>
                    <Box sx={{ flex: '0 1 100px', textAlign: 'right' }}>
                      <Typography>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(5)}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ flex: '0 1 150px' }}>
                      <Typography variant="h6">Total</Typography>
                    </Box>
                    <Box sx={{ flex: '0 1 100px', textAlign: 'right' }}>
                      <Typography variant="h6">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(19.99)}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              <Stack spacing={1}>
                <Typography variant="h6">Notes</Typography>
                <Typography color="text.secondary" variant="body2">
                  Please make sure you have the right bank registration number as I had issues before and make sure you
                  cover transfer expenses.
                </Typography>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
