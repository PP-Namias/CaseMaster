import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { CheckoutForm } from '@/components/marketing/checkout/checkout-form';
import { OrderSummary } from '@/components/marketing/checkout/order-summary';

const metadata = { title: `Checkout | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Container maxWidth="lg" sx={{ py: '64px' }}>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.home}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Home
                </Link>
              </div>
              <Typography variant="h3">Checkout</Typography>
            </Stack>
            <Grid container spacing={4}>
              <Grid md={7} xs={12}>
                <CheckoutForm />
              </Grid>
              <Grid md={5} xs={12}>
                <OrderSummary />
              </Grid>
            </Grid>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    alignItems: 'center',
                    color: 'var(--mui-palette-success-main)',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <LockIcon />
                </Box>
                <Typography variant="subtitle2">Secure checkout</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                Your purchases are secured by an industry best encryption service - Stripe
              </Typography>
              <div>
                <Button color="primary" endIcon={<ArrowRightIcon />} variant="contained">
                  Complete order
                </Button>
              </div>
            </Stack>
          </Stack>
        </Container>
      </main>
    </React.Fragment>
  );
}
