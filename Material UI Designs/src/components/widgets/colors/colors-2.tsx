import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Primary light', code: 'var(--mui-palette-primary-light)' },
  { name: 'Primary main', code: 'var(--mui-palette-primary-main)' },
  { name: 'Primary dark', code: 'var(--mui-palette-primary-dark)' },
  { name: 'Primary 50', code: 'var(--mui-palette-primary-50)' },
  { name: 'Primary 100', code: 'var(--mui-palette-primary-100)' },
  { name: 'Primary 200', code: 'var(--mui-palette-primary-200)' },
  { name: 'Primary 300', code: 'var(--mui-palette-primary-300)' },
  { name: 'Primary 400', code: 'var(--mui-palette-primary-400)' },
  { name: 'Primary 500', code: 'var(--mui-palette-primary-500)' },
  { name: 'Primary 600', code: 'var(--mui-palette-primary-600)' },
  { name: 'Primary 700', code: 'var(--mui-palette-primary-700)' },
  { name: 'Primary 800', code: 'var(--mui-palette-primary-800)' },
  { name: 'Primary 900', code: 'var(--mui-palette-primary-900)' },
  { name: 'Primary 950', code: 'var(--mui-palette-primary-950)' },
] as const;

export function Colors2(): React.JSX.Element {
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
