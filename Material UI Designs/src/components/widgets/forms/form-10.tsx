import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

import { TextEditor } from '@/components/core/text-editor/text-editor';

export function Form10(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <FormControl fullWidth>
          <InputLabel required>Project name</InputLabel>
          <OutlinedInput name="name" />
        </FormControl>
        <FormControl>
          <InputLabel>Description</InputLabel>
          <Box sx={{ mt: '8px', '& .tiptap-container': { height: '400px' } }}>
            <TextEditor content="" placeholder="Write something" />
          </Box>
        </FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained">Update</Button>
        </Box>
      </Stack>
    </Box>
  );
}
