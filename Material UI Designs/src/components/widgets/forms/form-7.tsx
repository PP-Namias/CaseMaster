import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export function Form7(): React.JSX.Element {
  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid lg={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Name</InputLabel>
            <OutlinedInput name="name" />
          </FormControl>
        </Grid>
        <Grid lg={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Company</InputLabel>
            <OutlinedInput name="companyName" />
          </FormControl>
        </Grid>
        <Grid lg={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel required>Email address</InputLabel>
            <OutlinedInput name="email" type="email" />
          </FormControl>
        </Grid>
        <Grid lg={6} xs={12}>
          <FormControl fullWidth>
            <InputLabel>Phone number</InputLabel>
            <OutlinedInput name="phone" />
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
      <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
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
