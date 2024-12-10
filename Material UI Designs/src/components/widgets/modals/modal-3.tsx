import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

export function Modal3(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)' }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton>
              <XIcon />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ p: 3 }}>
          <Container maxWidth="md">
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <OutlinedInput
                placeholder="Search..."
                startAdornment={
                  <InputAdornment position="start">
                    <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
                  </InputAdornment>
                }
                sx={{ flex: '1 1 auto' }}
              />
              <Button variant="contained">Search</Button>
            </Stack>
          </Container>
        </Box>
      </Paper>
    </Box>
  );
}
