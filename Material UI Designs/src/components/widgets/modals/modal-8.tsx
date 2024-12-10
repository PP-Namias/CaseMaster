import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';

export function Modal8(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)' }}>
          <Stack direction="row" spacing={2} sx={{ display: 'flex', p: 3 }}>
            <Avatar sx={{ bgcolor: 'var(--mui-palette-error-50)', color: 'var(--mui-palette-error-main)' }}>
              <WarningIcon fontSize="var(--Icon-fontSize)" />
            </Avatar>
            <Stack spacing={3}>
              <Stack spacing={1}>
                <Typography variant="h5">Deactivate account</Typography>
                <Typography color="text.secondary" variant="body2">
                  Are you sure you want to deactivate your account? All of your data will be permanently removed. This
                  action cannot be undone.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button color="secondary">Cancel</Button>
                <Button color="error" variant="contained">
                  Deactivate
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
