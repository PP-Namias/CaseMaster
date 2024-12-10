import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export function Buttons1(): React.JSX.Element {
  return (
    <Stack spacing={3} sx={{ p: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Button variant="contained">Default</Button>
            <Button disabled variant="contained">
              Disabled
            </Button>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Button variant="outlined">Default</Button>
            <Button disabled variant="outlined">
              Disabled
            </Button>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Button>Default</Button>
            <Button disabled>Disabled</Button>
          </Stack>
        </Stack>
        <Stack spacing={3}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Button color="secondary" variant="contained">
              Default
            </Button>
            <Button color="secondary" disabled variant="contained">
              Disabled
            </Button>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Button color="secondary" variant="outlined">
              Default
            </Button>
            <Button color="secondary" disabled variant="outlined">
              Disabled
            </Button>
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            <Button color="secondary">Default</Button>
            <Button color="secondary" disabled>
              Disabled
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        <Button size="small" variant="contained">
          Create
        </Button>
        <Button size="medium" variant="contained">
          Create
        </Button>
        <Button size="large" variant="contained">
          Create
        </Button>
      </Stack>
    </Stack>
  );
}
