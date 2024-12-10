import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { CreditCard as CreditCardIcon } from '@phosphor-icons/react/dist/ssr/CreditCard';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

import { PlanCard } from './plan-card';
import type { Plan, PlanId } from './plan-card';

const plans = [
  { id: 'startup', name: 'Startup', currency: 'USD', price: 0 },
  { id: 'standard', name: 'Standard', currency: 'USD', price: 14.99 },
  { id: 'business', name: 'Business', currency: 'USD', price: 29.99 },
] satisfies Plan[];

export function Plans(): React.JSX.Element {
  const currentPlanId = 'standard' satisfies PlanId;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <CreditCardIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        subheader="You can upgrade and downgrade whenever you want."
        title="Change plan"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <Stack spacing={3}>
            <Grid container spacing={3}>
              {plans.map((plan) => (
                <Grid key={plan.id} md={4} xs={12}>
                  <PlanCard isCurrent={plan.id === currentPlanId} plan={plan} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="contained">Upgrade plan</Button>
            </Box>
          </Stack>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Billing details</Typography>
              <Button color="secondary" startIcon={<PencilSimpleIcon />}>
                Edit
              </Button>
            </Stack>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                {(
                  [
                    { key: 'Name', value: 'PP Namias' },
                    { key: 'Country', value: 'Germany' },
                    { key: 'State', value: 'Brandenburg' },
                    { key: 'City', value: 'Berlin' },
                    { key: 'Zip Code', value: '667123' },
                    { key: 'Card Number', value: '**** 1111' },
                  ] satisfies { key: string; value: React.ReactNode }[]
                ).map(
                  (item): React.JSX.Element => (
                    <PropertyItem key={item.key} name={item.key} value={item.value} />
                  )
                )}
              </PropertyList>
            </Card>
            <Typography color="text.secondary" variant="body2">
              We cannot refund once you purchased a subscription, but you can always{' '}
              <Link variant="inherit">cancel</Link>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
