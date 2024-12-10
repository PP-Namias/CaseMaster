import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { Option } from '@/components/core/option';

export function Modal7(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-shadows-16)',
          maxWidth: '320px',
          mx: 'auto',
        }}
      >
        <Box sx={{ pt: 3, px: 3 }}>
          <Typography variant="h6">Settings</Typography>
        </Box>
        <Stack spacing={3} sx={{ p: 3 }}>
          <FormControl>
            <InputLabel>Theme</InputLabel>
            <Select defaultValue="light" name="theme">
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel control={<Switch />} label="RTL" />
            <FormControlLabel control={<Switch />} label="Compact" />
            <FormControlLabel control={<Switch />} label="Rounded corners" />
          </FormGroup>
          <Button variant="contained">Save settings</Button>
        </Stack>
      </Paper>
    </Box>
  );
}
