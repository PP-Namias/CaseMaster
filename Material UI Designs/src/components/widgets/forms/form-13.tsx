import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';

const paymentMethods = [
  { label: 'Credit card', value: 'credit_card' },
  { label: 'PayPal', value: 'paypal' },
] as const;

export interface StepIconProps {
  number: number;
}

function StepIcon({ number }: StepIconProps): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: '50%',
        display: 'flex',
        height: '40px',
        justifyContent: 'center',
        width: '40px',
      }}
    >
      <Typography variant="h6">{number}</Typography>
    </Box>
  );
}

export function Form13(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={6}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <StepIcon number={1} />
            <Typography variant="h6">Billing address</Typography>
          </Stack>
          <Grid container spacing={3}>
            <Grid sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>First name</InputLabel>
                <OutlinedInput name="firstName" />
              </FormControl>
            </Grid>
            <Grid sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput name="lastName" />
              </FormControl>
            </Grid>
            <Grid sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <OutlinedInput name="state" />
              </FormControl>
            </Grid>
            <Grid sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <OutlinedInput name="city" />
              </FormControl>
            </Grid>
            <Grid sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Street line 1</InputLabel>
                <OutlinedInput name="line1" />
              </FormControl>
            </Grid>
            <Grid sm={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Street line 2 (optional)</InputLabel>
                <OutlinedInput name="line2" />
              </FormControl>
            </Grid>
            <Grid sm={3} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Zip code</InputLabel>
                <OutlinedInput name="zipCode" />
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <StepIcon number={2} />
            <Typography variant="h6">Shipping address</Typography>
          </Stack>
          <div>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Same as billing address" />
          </div>
        </Stack>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <StepIcon number={3} />
            <Typography variant="h6">Payment method</Typography>
          </Stack>
          <Stack spacing={3}>
            <RadioGroup defaultValue="credit_card" name="paymentMethod" row>
              {paymentMethods.map((paymentMethod) => (
                <FormControlLabel
                  control={<Radio />}
                  key={paymentMethod.value}
                  label={paymentMethod.label}
                  value={paymentMethod.value}
                />
              ))}
            </RadioGroup>
            <Grid container>
              <Grid container sm={6} spacing={3} xs={12}>
                <Grid xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Name on card</InputLabel>
                    <OutlinedInput name="cardHolder" />
                  </FormControl>
                </Grid>
                <Grid xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Card number</InputLabel>
                    <OutlinedInput name="cardNumber" />
                  </FormControl>
                </Grid>
                <Grid sm={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Expire date</InputLabel>
                    <OutlinedInput name="cardExp" placeholder="MM/YY" />
                  </FormControl>
                </Grid>
                <Grid sm={6} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Security code</InputLabel>
                    <OutlinedInput name="cardCvv" />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
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
    </Box>
  );
}
