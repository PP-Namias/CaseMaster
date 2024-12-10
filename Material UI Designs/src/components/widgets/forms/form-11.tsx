import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

export function Form11(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel required>Price</InputLabel>
              <OutlinedInput name="price" type="number" />
            </FormControl>
          </Grid>
          <Grid md={6} xs={12}>
            <FormControl fullWidth>
              <InputLabel>Sell price</InputLabel>
              <OutlinedInput name="salePrice" type="number" />
            </FormControl>
          </Grid>
          <Grid xs={12}>
            <FormGroup>
              <FormControlLabel control={<Checkbox defaultChecked name="isTaxable" />} label="Product is taxable" />
              <FormControlLabel control={<Checkbox name="includesTaxes" />} label="Price includes taxes" />
            </FormGroup>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained">Update</Button>
        </Box>
      </Stack>
    </Box>
  );
}
