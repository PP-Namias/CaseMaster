import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Secondary light', code: 'var(--mui-palette-secondary-light)' },
  { name: 'Secondary main', code: 'var(--mui-palette-secondary-main)' },
  { name: 'Secondary dark', code: 'var(--mui-palette-secondary-dark)' },
  { name: 'Secondary 50', code: 'var(--mui-palette-secondary-50)' },
  { name: 'Secondary 100', code: 'var(--mui-palette-secondary-100)' },
  { name: 'Secondary 200', code: 'var(--mui-palette-secondary-200)' },
  { name: 'Secondary 300', code: 'var(--mui-palette-secondary-300)' },
  { name: 'Secondary 400', code: 'var(--mui-palette-secondary-400)' },
  { name: 'Secondary 500', code: 'var(--mui-palette-secondary-500)' },
  { name: 'Secondary 600', code: 'var(--mui-palette-secondary-600)' },
  { name: 'Secondary 700', code: 'var(--mui-palette-secondary-700)' },
  { name: 'Secondary 800', code: 'var(--mui-palette-secondary-800)' },
  { name: 'Secondary 900', code: 'var(--mui-palette-secondary-900)' },
  { name: 'Secondary 950', code: 'var(--mui-palette-secondary-950)' },
] as const;

export function Colors3(): React.JSX.Element {
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
