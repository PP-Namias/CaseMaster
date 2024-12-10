import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

export function Buttons2(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
        <Button color="error" startIcon={<TrashIcon />} variant="contained">
          Delete account
        </Button>
        <Button endIcon={<ArrowRightIcon />} variant="contained">
          Next page
        </Button>
      </Stack>
    </Box>
  );
}
