import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Lightbulb as LightbulbIcon } from '@phosphor-icons/react/dist/ssr/Lightbulb';

export interface TipProps {
  message: string;
}

export function Tip({ message }: TipProps): React.JSX.Element {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', bgcolor: 'var(--mui-palette-background-level1)', borderRadius: 1, p: 1 }}
    >
      <LightbulbIcon />
      <Typography color="text.secondary" variant="caption">
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          Tip.
        </Typography>{' '}
        {message}
      </Typography>
    </Stack>
  );
}
