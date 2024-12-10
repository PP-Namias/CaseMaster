'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';

import type { PrimaryColor } from '@/styles/theme/types';

import { Option } from './option';

export interface OptionsPrimaryColorProps {
  onChange?: (value: PrimaryColor) => void;
  value?: PrimaryColor;
}

export function OptionsPrimaryColor({ onChange, value }: OptionsPrimaryColorProps): React.JSX.Element {
  return (
    <Stack spacing={1}>
      <InputLabel>Primary color</InputLabel>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
        {(
          [
            { label: 'Chateau Green', value: 'chateauGreen', color: '#16b364' },
            { label: 'Neon Blue', value: 'neonBlue', color: '#635bff' },
            { label: 'Royal Blue', value: 'royalBlue', color: '#5265ff' },
            { label: 'Tomato Orange', value: 'tomatoOrange', color: '#ff6c47' },
          ] satisfies { label: string; value: PrimaryColor; color: string }[]
        ).map((option) => (
          <Option
            icon={
              <Box
                sx={{ bgcolor: option.color, borderRadius: '50%', flex: '0 0 auto', height: '24px', width: '24px' }}
              />
            }
            key={option.value}
            label={option.label}
            onClick={() => {
              onChange?.(option.value);
            }}
            selected={option.value === value}
          />
        ))}
      </Stack>
    </Stack>
  );
}
