'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';

export function Form5(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <div>
          <FormControlLabel control={<Switch color="primary" />} label="Schedule publish" />
        </div>
        <DateTimePicker<Dayjs> label="Start date" value={dayjs()} />
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select defaultValue="" name="category">
            <Option value="">Select a category</Option>
            <Option value="Healthcare">Healthcare</Option>
            <Option value="Makeup">Makeup</Option>
            <Option value="Skincare">Skincare</Option>
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Published globally" />
          <FormControlLabel control={<Checkbox defaultChecked />} label="Enable contents" />
        </FormGroup>
      </Stack>
    </Box>
  );
}
