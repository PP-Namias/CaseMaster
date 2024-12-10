'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { dayjs } from '@/lib/dayjs';

export function Form6(): React.JSX.Element {
  return (
    <Stack divider={<Divider />} spacing={3} sx={{ p: 3 }}>
      <Stack spacing={3}>
        <FormControl>
          <InputLabel>Title</InputLabel>
          <OutlinedInput name="title" />
        </FormControl>
        <FormControl>
          <InputLabel>Description</InputLabel>
          <OutlinedInput name="description" />
        </FormControl>
        <div>
          <FormControlLabel control={<Switch name="allDay" />} label="All day" />
        </div>
        <DateTimePicker format="MMM D, YYYY hh:mm A" label="Start date" value={dayjs()} />
        <DateTimePicker format="MMM D, YYYY hh:mm A" label="End date" value={dayjs()} />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button variant="contained">Confirm</Button>
      </Stack>
    </Stack>
  );
}
