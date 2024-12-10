'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { MultiSelect } from '@/components/core/multi-select';

interface FilterChip {
  label: string;
  field: 'type' | 'level' | 'location' | 'role';
  value: unknown;
  displayValue?: string;
}

const typeOptions = [
  { label: 'Freelance', value: 'freelance' },
  { label: 'Full Time', value: 'full_time' },
  { label: 'Part Time', value: 'part_time' },
  { label: 'Internship', value: 'internship' },
] as const;

const levelOptions = [
  { label: 'Novice', value: 'novice' },
  { label: 'Expert', value: 'expert' },
] as const;

const locationOptions = [
  { label: 'Africa', value: 'africa' },
  { label: 'Asia', value: 'asia' },
  { label: 'Europe', value: 'europe' },
  { label: 'North America', value: 'north_america' },
  { label: 'South America', value: 'south_america' },
] as const;

const roleOptions = [
  { label: 'Frontend Developer', value: 'frontend_developer' },
  { label: 'Backend Engineer', value: 'backend_engineer' },
  { label: 'iOS Developer', value: 'ios_developer' },
] as const;

export function JobsFilters(): React.JSX.Element {
  const chips: FilterChip[] = [
    { label: 'Type', field: 'type', value: 'freelance', displayValue: 'Freelance' },
    { label: 'Type', field: 'type', value: 'internship', displayValue: 'Internship' },
    { label: 'Level', field: 'level', value: 'novice', displayValue: 'Novice' },
    { label: 'Location', field: 'location', value: 'asia', displayValue: 'Asia' },
    { label: 'Role', field: 'role', value: 'frontend_developer', displayValue: 'Frontend Developer' },
  ];

  // You should memoize the values to avoid unnecessary filtering
  const typeValues = chips.filter((chip) => chip.field === 'type').map((chip) => chip.value);
  const levelValues = chips.filter((chip) => chip.field === 'level').map((chip) => chip.value);
  const locationValues = chips.filter((chip) => chip.field === 'location').map((chip) => chip.value);
  const roleValues = chips.filter((chip) => chip.field === 'role').map((chip) => chip.value);

  return (
    <Card>
      <Input
        fullWidth
        placeholder="Enter a keyword"
        startAdornment={
          <InputAdornment position="start">
            <MagnifyingGlassIcon />
          </InputAdornment>
        }
        sx={{ px: 3, py: 2 }}
      />
      <Divider />
      {chips.length ? (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 2 }}>
          {chips.map((chip) => (
            <Chip
              key={`${chip.field}-${chip.displayValue}`}
              label={
                <Typography variant="inherit">
                  <Typography component="span" sx={{ fontWeight: 600 }} variant="inherit">
                    {chip.label}:
                  </Typography>{' '}
                  {chip.displayValue}
                </Typography>
              }
              onDelete={() => {
                // noop
              }}
              variant="outlined"
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" variant="subtitle2">
            No filters applied
          </Typography>
        </Box>
      )}
      <Divider />
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', p: 1 }}
      >
        <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
          <MultiSelect label="Type" options={typeOptions} value={typeValues} />
          <MultiSelect label="Level" options={levelOptions} value={levelValues} />
          <MultiSelect label="Location" options={locationOptions} value={locationValues} />
          <MultiSelect label="Role" options={roleOptions} value={roleValues} />
        </Stack>
        <div>
          <FormControlLabel control={<Checkbox defaultChecked />} label="In network" />
        </div>
      </Stack>
    </Card>
  );
}
