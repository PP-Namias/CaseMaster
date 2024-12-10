'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import type { StepIconProps } from '@mui/material/StepIcon';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

export function ChapterStepIcon({ active, completed, icon }: StepIconProps): React.JSX.Element {
  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        '--Avatar-size': '24px',
        ...(highlight
          ? { bgcolor: 'var(--mui-palette-primary-main)', color: 'var(--mui-palette-primary-contrastText)' }
          : { bgcolor: 'var(--mui-palette-background-level2)', color: 'var(--mui-palette-text-primary)' }),
      }}
      variant="circular"
    >
      {completed ? <CheckIcon /> : icon}
    </Avatar>
  );
}
