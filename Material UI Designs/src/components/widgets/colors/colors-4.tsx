import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Success light', code: 'var(--mui-palette-success-light)' },
  { name: 'Success main', code: 'var(--mui-palette-success-main)' },
  { name: 'Success dark', code: 'var(--mui-palette-success-dark)' },
  { name: 'Success 50', code: 'var(--mui-palette-success-50)' },
  { name: 'Success 100', code: 'var(--mui-palette-success-100)' },
  { name: 'Success 200', code: 'var(--mui-palette-success-200)' },
  { name: 'Success 300', code: 'var(--mui-palette-success-300)' },
  { name: 'Success 400', code: 'var(--mui-palette-success-400)' },
  { name: 'Success 500', code: 'var(--mui-palette-success-500)' },
  { name: 'Success 600', code: 'var(--mui-palette-success-600)' },
  { name: 'Success 700', code: 'var(--mui-palette-success-700)' },
  { name: 'Success 800', code: 'var(--mui-palette-success-800)' },
  { name: 'Success 900', code: 'var(--mui-palette-success-900)' },
  { name: 'Success 950', code: 'var(--mui-palette-success-950)' },
] as const;

export function Colors4(): React.JSX.Element {
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
