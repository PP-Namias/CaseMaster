import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Divider', code: 'var(--mui-palette-divider)' },
  { name: 'Neutral 50', code: 'var(--mui-palette-neutral-50)' },
  { name: 'Neutral 100', code: 'var(--mui-palette-neutral-100)' },
  { name: 'Neutral 200', code: 'var(--mui-palette-neutral-200)' },
  { name: 'Neutral 300', code: 'var(--mui-palette-neutral-300)' },
  { name: 'Neutral 400', code: 'var(--mui-palette-neutral-400)' },
  { name: 'Neutral 500', code: 'var(--mui-palette-neutral-500)' },
  { name: 'Neutral 600', code: 'var(--mui-palette-neutral-600)' },
  { name: 'Neutral 700', code: 'var(--mui-palette-neutral-700)' },
  { name: 'Neutral 800', code: 'var(--mui-palette-neutral-800)' },
  { name: 'Neutral 900', code: 'var(--mui-palette-neutral-900)' },
  { name: 'Neutral 950', code: 'var(--mui-palette-neutral-950)' },
] as const;

export function Colors8(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <List disablePadding>
        {colors.map((color) => (
          <ListItem disableGutters key={color.code}>
            <ListItemAvatar>
              <Box sx={{ bgcolor: color.code, borderRadius: '10px', height: '46px', width: '46px' }} />
            </ListItemAvatar>
            <ListItemText
              disableTypography
              primary={<Typography variant="subtitle2">{color.name}</Typography>}
              secondary={
                <Typography color="text.secondary" variant="caption">
                  {color.code}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
