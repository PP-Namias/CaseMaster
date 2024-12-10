import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

export function Buttons4(): React.JSX.Element {
  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <IconButton color="primary">
          <TrashIcon />
        </IconButton>
        <IconButton color="secondary">
          <TrashIcon />
        </IconButton>
        <IconButton color="success">
          <TrashIcon />
        </IconButton>
        <IconButton color="info">
          <TrashIcon />
        </IconButton>
        <IconButton color="warning">
          <TrashIcon />
        </IconButton>
        <IconButton color="error">
          <TrashIcon />
        </IconButton>
        <IconButton disabled>
          <TrashIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <IconButton color="secondary" size="small">
          <TrashIcon />
        </IconButton>
        <IconButton color="secondary" size="medium">
          <TrashIcon />
        </IconButton>
        <IconButton color="secondary" size="large">
          <TrashIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
