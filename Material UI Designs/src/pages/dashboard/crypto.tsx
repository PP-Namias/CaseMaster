import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { AccountUpgrade } from '@/components/dashboard/crypto/account-upgrade';
import { CreditCard } from '@/components/dashboard/crypto/credit-card';
import { CurrencyConverter } from '@/components/dashboard/crypto/currency-converter';
import { CurrentBalance } from '@/components/dashboard/crypto/current-balance';
import { DigitalWallet } from '@/components/dashboard/crypto/digital-wallet';
import { Transactions } from '@/components/dashboard/crypto/transactions';

const metadata = { title: `Crypto | Dashboard | ${config.site.name}` } satisfies Metadata;

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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Crypto</Typography>
            </Box>
            <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add wallet
              </Button>
            </div>
          </Stack>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'grid',
                  gap: 3,
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', xl: '1fr 1fr 1fr 500px' },
                }}
              >
                <DigitalWallet
                  amount={0.7568}
                  color="var(--mui-palette-primary-main)"
                  currency="BTC"
                  data={[
                    56, 61, 64, 60, 63, 61, 60, 68, 66, 64, 77, 60, 65, 51, 72, 80, 74, 67, 77, 83, 94, 95, 89, 100, 94,
                    104, 101, 105, 104, 103, 107, 120,
                  ]}
                  diff={34.1}
                  trend="up"
                  value={16213.2}
                />

                <DigitalWallet
                  amount={2.0435}
                  color="var(--mui-palette-primary-main)"
                  currency="ETH"
                  data={[
                    65, 64, 70, 76, 82, 80, 85, 78, 82, 95, 93, 80, 112, 102, 105, 95, 98, 102, 104, 99, 101, 100, 109,
                    106, 111, 105, 108, 102, 118, 129,
                  ]}
                  diff={14.2}
                  trend="up"
                  value={9626.8}
                />
                <DigitalWallet
                  amount={25.1602}
                  color="var(--mui-palette-primary-main)"
                  currency="BNB"
                  data={[
                    99, 101, 104, 98, 99, 99, 102, 103, 100, 101, 99, 101, 101, 98, 95, 97, 98, 92, 94, 93, 95, 82, 78,
                    75, 80, 78, 76, 54, 45, 32, 31, 27,
                  ]}
                  diff={18}
                  trend="down"
                  value={6640}
                />
                <CreditCard
                  card={{
                    id: 'CRD-001',
                    brand: 'mastercard',
                    cardNumber: '5823 4492 2385 1102',
                    expiryDate: '05/28',
                    holderName: 'PP Namias',
                  }}
                />
              </Box>
            </Grid>
            <Grid md={8} xs={12}>
              <CurrentBalance
                data={[
                  { name: 'USD', value: 10076.81, color: 'var(--mui-palette-success-main)' },
                  { name: 'BTC', value: 16213.2, color: 'var(--mui-palette-warning-main)' },
                  { name: 'ETH', value: 9626.8, color: 'var(--mui-palette-primary-main)' },
                ]}
              />
            </Grid>
            <Grid md={4} xs={12}>
              <CurrencyConverter />
            </Grid>
            <Grid md={8} xs={12}>
              <Transactions
                transactions={[
                  {
                    id: 'TX-003',
                    description: 'Buy BTC',
                    type: 'add',
                    balance: 643,
                    currency: 'BTC',
                    amount: 0.2105,
                    createdAt: dayjs().subtract(2, 'day').subtract(1, 'hour').subtract(32, 'minute').toDate(),
                  },
                  {
                    id: 'TX-002',
                    description: 'Buy BTC',
                    type: 'add',
                    balance: 2344,
                    currency: 'BTC',
                    amount: 0.1337,
                    createdAt: dayjs().subtract(3, 'day').subtract(1, 'hour').subtract(43, 'minute').toDate(),
                  },
                  {
                    id: 'TX-001',
                    description: 'Sell BTC',
                    type: 'sub',
                    balance: 4805,
                    currency: 'BTC',
                    amount: 0.2105,
                    createdAt: dayjs().subtract(6, 'day').subtract(1, 'hour').subtract(32, 'minute').toDate(),
                  },
                ]}
              />
            </Grid>
            <Grid md={4} xs={12}>
              <AccountUpgrade />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
