import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

export interface Address {
  id: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  street: string;
  primary?: boolean;
}

export interface ShippingAddressProps {
  address: Address;
}

export function ShippingAddress({ address }: ShippingAddressProps): React.ReactElement {
  return (
    <Card sx={{ borderRadius: 1, height: '100%' }} variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Typography>
            {address.street},
            <br />
            {address.city}, {address.state}, {address.country},
            <br />
            {address.zipCode}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            {address.primary ? <Chip color="warning" label="Primary" variant="soft" /> : <span />}
            <Button color="secondary" size="small" startIcon={<PencilSimpleIcon />}>
              Edit
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
