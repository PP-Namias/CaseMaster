import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Option } from '@/components/core/option';

export function Form1(): React.JSX.Element {
  return (
    <Stack spacing={2} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Full name</InputLabel>
            <OutlinedInput defaultValue="Miron Vitold" name="name" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Email address</InputLabel>
            <OutlinedInput defaultValue="miron.vitold@domain.com" name="email" type="email" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Phone number</InputLabel>
            <OutlinedInput defaultValue="(425) 434-5535" name="phone" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select defaultValue="us" name="country">
              <Option value="us">United States</Option>
              <Option value="de">Germany</Option>
              <Option value="es">Spain</Option>
            </Select>
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>State</InputLabel>
            <OutlinedInput defaultValue="Michigan" name="state" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>City</InputLabel>
            <OutlinedInput defaultValue="Southfield" name="city" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Street line 1</InputLabel>
            <OutlinedInput defaultValue="1721 Bartlett Avenue" name="line1" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Street line 2</InputLabel>
            <OutlinedInput defaultValue="" name="line2" />
          </FormControl>
        </Grid>
        <Grid md={6} xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Email verified</Typography>
            <Typography color="text.secondary" variant="body2">
              Disabling this will automatically send the user a verification email
            </Typography>
            <Switch defaultChecked name="isVerified" />
          </Stack>
        </Grid>
        <Grid md={6} xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">Discounted prices</Typography>
            <Typography color="text.secondary" variant="body2">
              This will give the user discounted prices for all products
            </Typography>
            <Switch color="primary" name="hasDiscount" />
          </Stack>
        </Grid>
      </Grid>
      <div>
        <Button variant="contained">Update customer</Button>
      </div>
    </Stack>
  );
}
