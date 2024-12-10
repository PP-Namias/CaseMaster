import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';

import { Option } from '@/components/core/option';

export function Form12(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select defaultValue="shirts" name="category">
            <Option value="shirts">Shirts</Option>
            <Option value="phones">Phones</Option>
            <Option value="cars">Cars</Option>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>SKU</InputLabel>
          <OutlinedInput name="sku" />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Barcode</InputLabel>
          <OutlinedInput name="barcode" />
        </FormControl>
        <div>
          <Button variant="contained">Create product</Button>
        </div>
      </Stack>
    </Box>
  );
}
