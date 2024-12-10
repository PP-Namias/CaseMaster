import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Option } from '@/components/core/option';

export function ContactForm(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Name</InputLabel>
            <OutlinedInput name="name" />
          </FormControl>
        </Grid>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Company</InputLabel>
            <OutlinedInput name="companyName" />
          </FormControl>
        </Grid>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Email address</InputLabel>
            <OutlinedInput name="email" type="email" />
          </FormControl>
        </Grid>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Phone number</InputLabel>
            <OutlinedInput name="phone" />
          </FormControl>
        </Grid>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Company size</InputLabel>
            <Select defaultValue="1-10" name="companySize">
              <Option value="1-10">1-10</Option>
              <Option value="11-30">11-30</Option>
              <Option value="31-50">31-50</Option>
            </Select>
          </FormControl>
        </Grid>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Team</InputLabel>
            <Select defaultValue="" name="team">
              <Option value="engineering">Engineering</Option>
              <Option value="design">Design</Option>
            </Select>
          </FormControl>
        </Grid>
        <Grid sm={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Project budget</InputLabel>
            <Select defaultValue="20000" name="budget">
              <Option value={20000}>$20,000+</Option>
              <Option value={50000}>$50,000+</Option>
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <FormControl fullWidth>
            <InputLabel>Message</InputLabel>
            <OutlinedInput minRows={3} multiline name="message" />
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained">Let&apos;s talk</Button>
      <Typography color="text.secondary" variant="body2">
        By submitting this, you agree to the{' '}
        <Link color="text.primary" underline="always" variant="subtitle2">
          privacy policy
        </Link>{' '}
        and{' '}
        <Link color="text.primary" underline="always" variant="subtitle2">
          cookie policy
        </Link>
        .
      </Typography>
    </Stack>
  );
}
