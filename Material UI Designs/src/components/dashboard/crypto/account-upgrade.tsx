import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Lightning as LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';

export function AccountUpgrade(): React.JSX.Element {
  return (
    <Card>
      <Stack spacing={2} sx={{ alignItems: 'center', p: 3 }}>
        <Box sx={{ flex: '0 0 auto', width: '100px' }}>
          <Box alt="Tick" component="img" src="/assets/iconly-glass-tick.svg" sx={{ height: 'auto', width: '100%' }} />
        </Box>
        <Stack spacing={1}>
          <Typography sx={{ textAlign: 'center' }} variant="h6">
            Upgrade your account to PRO.
          </Typography>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            Unlock exclusive features like Test Networks, Test Swaps, and more.
          </Typography>
        </Stack>
        <Button color="secondary" startIcon={<LightningIcon />} variant="contained">
          Upgrade
        </Button>
      </Stack>
    </Card>
  );
}
