'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';

import type { Layout } from '@/types/settings';

export interface OptionsLayoutProps {
  onChange?: (value: Layout) => void;
  value?: Layout;
}

export function OptionsLayout({ onChange, value }: OptionsLayoutProps): React.JSX.Element {
  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <InputLabel>Layout</InputLabel>
        <Tooltip placement="top" title="Dashboard only">
          <InfoIcon color="var(--mui-palette-text-secondary)" fontSize="var(--icon-fontSize-md)" weight="fill" />
        </Tooltip>
      </Stack>
      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, minmax(0, 140px))' }}>
        {(
          [
            { label: 'Vertical', value: 'vertical', icon: <VerticalIcon /> },
            { label: 'Horizontal', value: 'horizontal', icon: <HorizontalIcon /> },
          ] satisfies { label: string; value: Layout; icon: React.ReactElement }[]
        ).map((option) => (
          <Stack key={option.value} spacing={1}>
            <Box
              onClick={() => {
                onChange?.(option.value);
              }}
              role="button"
              sx={{
                borderRadius: 1,
                cursor: 'pointer',
                display: 'flex',
                height: '88px',
                position: 'relative',
                '&::before': {
                  borderRadius: 'inherit',
                  bottom: 0,
                  content: '" "',
                  left: 0,
                  pointerEvents: 'none',
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  ...(option.value === value && { boxShadow: '0 0 0 2px var(--mui-palette-primary-main)' }),
                },
              }}
              tabIndex={0}
            >
              {option.icon}
            </Box>
            <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
              {option.label}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Stack>
  );
}

function VerticalIcon(): React.JSX.Element {
  return (
    <Box
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: 'inherit',
        display: 'flex',
        flex: '1 1 auto',
      }}
    >
      <Box sx={{ borderRight: '1px dashed var(--mui-palette-divider)', px: 1, py: 0.5 }}>
        <Stack spacing={1}>
          <Box sx={{ bgcolor: 'var(--mui-palette-primary-main)', borderRadius: '2px', height: '4px', width: '26px' }} />
          <Box
            sx={{ bgcolor: 'var(--mui-palette-background-level3)', borderRadius: '2px', height: '4px', width: '26px' }}
          />
          <Box
            sx={{ bgcolor: 'var(--mui-palette-background-level3)', borderRadius: '2px', height: '4px', width: '26px' }}
          />
        </Stack>
      </Box>
      <Box sx={{ display: 'flex', flex: '1 1 auto', p: 1 }}>
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-level1)',
            border: '1px dashed var(--mui-palette-divider)',
            borderRadius: 1,
            flex: '1 1 auto',
          }}
        />
      </Box>
    </Box>
  );
}

function HorizontalIcon(): React.JSX.Element {
  return (
    <Box
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        borderRadius: 'inherit',
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', borderBottom: '1px dashed var(--mui-palette-divider)', px: 1, py: '4px' }}
      >
        <Box sx={{ bgcolor: 'var(--mui-palette-primary-main)', borderRadius: '2px', height: '4px', width: '16px' }} />
        <Box
          sx={{ bgcolor: 'var(--mui-palette-background-level3)', borderRadius: '2px', height: '4px', width: '16px' }}
        />
        <Box
          sx={{ bgcolor: 'var(--mui-palette-background-level3)', borderRadius: '2px', height: '4px', width: '16px' }}
        />
      </Stack>
      <Box sx={{ display: 'flex', flex: '1 1 auto', p: 1 }}>
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-level1)',
            border: '1px dashed var(--mui-palette-divider)',
            borderRadius: 1,
            flex: '1 1 auto',
          }}
        />
      </Box>
    </Box>
  );
}
