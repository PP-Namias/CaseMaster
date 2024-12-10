import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export function Newsletter(): React.JSX.Element {
  return (
    <Card sx={{ boxShadow: 'var(--mui-shadows-16)', py: 10, px: 8 }}>
      <Grid container spacing={3}>
        <Grid md={6} sx={{ order: { xs: 1, md: 0 } }} xs={12}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="h4">Join the developer list</Typography>
              <Typography color="text.secondary" variant="body2">
                Subscribe to our newsletter to make sure you don&apos;t miss anything.
              </Typography>
            </Stack>
            <FormControl>
              <InputLabel>Email address</InputLabel>
              <OutlinedInput name="email" type="email" />
            </FormControl>
            <Button size="large" variant="contained">
              Subscribe
            </Button>
          </Stack>
        </Grid>
        <Grid md={6} sx={{ display: 'flex', justifyContent: 'center' }} xs={12}>
          <Box component="img" src="/assets/iconly-glass-volume.svg" sx={{ maxWidth: '100%', width: '260px' }} />
        </Grid>
      </Grid>
    </Card>
  );
}
