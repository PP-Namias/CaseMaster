import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Warning light', code: 'var(--mui-palette-warning-light)' },
  { name: 'Warning main', code: 'var(--mui-palette-warning-main)' },
  { name: 'Warning dark', code: 'var(--mui-palette-warning-dark)' },
  { name: 'Warning 50', code: 'var(--mui-palette-warning-50)' },
  { name: 'Warning 100', code: 'var(--mui-palette-warning-100)' },
  { name: 'Warning 200', code: 'var(--mui-palette-warning-200)' },
  { name: 'Warning 300', code: 'var(--mui-palette-warning-300)' },
  { name: 'Warning 400', code: 'var(--mui-palette-warning-400)' },
  { name: 'Warning 500', code: 'var(--mui-palette-warning-500)' },
  { name: 'Warning 600', code: 'var(--mui-palette-warning-600)' },
  { name: 'Warning 700', code: 'var(--mui-palette-warning-700)' },
  { name: 'Warning 800', code: 'var(--mui-palette-warning-800)' },
  { name: 'Warning 900', code: 'var(--mui-palette-warning-900)' },
  { name: 'Warning 950', code: 'var(--mui-palette-warning-950)' },
] as const;

export function Colors6(): React.JSX.Element {
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
