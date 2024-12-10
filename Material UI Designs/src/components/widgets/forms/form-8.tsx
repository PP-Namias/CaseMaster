'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { dayjs } from '@/lib/dayjs';

export function Form8(): React.JSX.Element {
  const tags = ['Full-Time'] satisfies string[];

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5">Please select one option</Typography>
          <Typography color="text.secondary" variant="body1">
            Proin tincidunt lacus sed ante efficitur efficitur. Quisque aliquam fringilla velit sit amet euismod.
          </Typography>
        </Stack>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel required>Project name</InputLabel>
            <OutlinedInput name="name" />
          </FormControl>
          <Stack spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Tags</InputLabel>
              <OutlinedInput
                endAdornment={
                  <Button color="secondary" size="small">
                    Add
                  </Button>
                }
                name="name"
              />
            </FormControl>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" />
              ))}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <DatePicker format="MMM D, YYYY" label="Start date" value={dayjs()} />
            <DatePicker format="MMM D, YYYY" label="End date" value={dayjs()} />
          </Stack>
        </Stack>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained">Next</Button>
        </Box>
      </Stack>
    </Box>
  );
}
