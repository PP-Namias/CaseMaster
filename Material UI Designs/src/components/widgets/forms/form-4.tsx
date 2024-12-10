import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

export function Form4(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack divider={<Divider />} spacing={2}>
        <Grid container spacing={3}>
          <Grid sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <OutlinedInput name="password" type="password" />
            </FormControl>
          </Grid>
          <Grid sm={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Confirm password</InputLabel>
              <OutlinedInput name="passwordConfirm" type="password" />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button variant="contained">Change password</Button>
        </Box>
      </Stack>
    </Box>
  );
}
