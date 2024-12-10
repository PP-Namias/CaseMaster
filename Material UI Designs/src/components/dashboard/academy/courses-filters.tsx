'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';

export function CoursesFilters(): React.JSX.Element {
  return (
    <Card>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-end', flexWrap: 'wrap', p: 3 }}>
        <FormControl sx={{ maxWidth: '100%', width: '240px' }}>
          <InputLabel>Search</InputLabel>
          <OutlinedInput fullWidth name="query" placeholder="Keywords" />
        </FormControl>
        <FormControl sx={{ maxWidth: '100%', width: '240px' }}>
          <InputLabel>Platform</InputLabel>
          <Select defaultValue="" fullWidth name="category">
            <Option value="">All categories</Option>
            <Option value="fullstack">Fullstack</Option>
            <Option value="devops">DevOps</Option>
            <Option value="design">Design</Option>
          </Select>
        </FormControl>
        <DatePicker
          format="MMM D, YYYY"
          label="From"
          onChange={() => {
            // noop
          }}
          sx={{ maxWidth: '100%', width: '240px' }}
          value={dayjs().subtract(1, 'month')}
        />
        <DatePicker
          format="MMM D, YYYY"
          label="To"
          onChange={() => {
            // noop
          }}
          sx={{ maxWidth: '100%', width: '240px' }}
          value={dayjs()}
        />
        <Button startIcon={<MagnifyingGlassIcon />} variant="contained">
          Search
        </Button>
      </Stack>
    </Card>
  );
}
