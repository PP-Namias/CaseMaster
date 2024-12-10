'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
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
  field: 'type' | 'status' | 'availability';
  value: unknown;
  displayValue?: string;
}

const typeOptions = [
  { label: 'Digital', value: 'digital' },
  { label: 'Physical', value: 'physical' },
  { label: 'Service', value: 'service' },
] as const;

const statusOptions = [
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
] as const;

const stockOptions = [
  { label: 'In stock', value: 'in_stock' },
  { label: 'Limited', value: 'limited' },
  { label: 'Out of stock', value: 'out_of_Stock' },
] as const;

export function Form2(): React.JSX.Element {
  const chips: FilterChip[] = [
    { label: 'Type', field: 'type', value: 'digital', displayValue: 'Digital' },
    { label: 'Type', field: 'type', value: 'service', displayValue: 'Service' },
    { label: 'Status', field: 'status', value: 'published', displayValue: 'Published' },
    { label: 'Availability', field: 'availability', value: 'out_of_Stock', displayValue: 'Out of stock' },
  ];

  // You should memoize the values to avoid unnecessary filtering
  const typeValues = chips.filter((chip) => chip.field === 'type').map((chip) => chip.value);
  const statusValues = chips.filter((chip) => chip.field === 'status').map((chip) => chip.value);
  const availabilityValues = chips.filter((chip) => chip.field === 'availability').map((chip) => chip.value);

  return (
    <Box sx={{ p: 3 }}>
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
      <Box sx={{ alignItems: 'center', display: 'flex', flexWrap: 'wrap', p: 2 }}>
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
            sx={{ m: 1 }}
            variant="outlined"
          />
        ))}
      </Box>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 1 }}>
        <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto', flexWrap: 'wrap' }}>
          <MultiSelect label="Type" options={typeOptions} value={typeValues} />
          <MultiSelect label="Status" options={statusOptions} value={statusValues} />
          <MultiSelect label="Availability" options={stockOptions} value={availabilityValues} />
        </Stack>
        <FormControlLabel control={<Checkbox defaultChecked />} label="In network" />
      </Stack>
    </Box>
  );
}
