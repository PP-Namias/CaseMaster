import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function Inputs1(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={1}>
        <Typography variant="subtitle2">System</Typography>
        <Typography color="text.secondary" variant="body2">
          You will receive emails in your business email address
        </Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Email alerts" />
          <FormControlLabel control={<Checkbox />} label="Push notifications" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Text message" />
        </FormGroup>
      </Stack>
    </Box>
  );
}
