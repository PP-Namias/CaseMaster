import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Error light', code: 'var(--mui-palette-error-light)' },
  { name: 'Error main', code: 'var(--mui-palette-error-main)' },
  { name: 'Error dark', code: 'var(--mui-palette-error-dark)' },
  { name: 'Error 50', code: 'var(--mui-palette-error-50)' },
  { name: 'Error 100', code: 'var(--mui-palette-error-100)' },
  { name: 'Error 200', code: 'var(--mui-palette-error-200)' },
  { name: 'Error 300', code: 'var(--mui-palette-error-300)' },
  { name: 'Error 400', code: 'var(--mui-palette-error-400)' },
  { name: 'Error 500', code: 'var(--mui-palette-error-500)' },
  { name: 'Error 600', code: 'var(--mui-palette-error-600)' },
  { name: 'Error 700', code: 'var(--mui-palette-error-700)' },
  { name: 'Error 800', code: 'var(--mui-palette-error-800)' },
  { name: 'Error 900', code: 'var(--mui-palette-error-900)' },
  { name: 'Error 950', code: 'var(--mui-palette-error-950)' },
] as const;

export function Colors7(): React.JSX.Element {
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
