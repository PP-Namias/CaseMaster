import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Info light', code: 'var(--mui-palette-info-light)' },
  { name: 'Info main', code: 'var(--mui-palette-info-main)' },
  { name: 'Info dark', code: 'var(--mui-palette-info-dark)' },
  { name: 'Info 50', code: 'var(--mui-palette-info-50)' },
  { name: 'Info 100', code: 'var(--mui-palette-info-100)' },
  { name: 'Info 200', code: 'var(--mui-palette-info-200)' },
  { name: 'Info 300', code: 'var(--mui-palette-info-300)' },
  { name: 'Info 400', code: 'var(--mui-palette-info-400)' },
  { name: 'Info 500', code: 'var(--mui-palette-info-500)' },
  { name: 'Info 600', code: 'var(--mui-palette-info-600)' },
  { name: 'Info 700', code: 'var(--mui-palette-info-700)' },
  { name: 'Info 800', code: 'var(--mui-palette-info-800)' },
  { name: 'Info 900', code: 'var(--mui-palette-info-900)' },
  { name: 'Info 950', code: 'var(--mui-palette-info-950)' },
] as const;

export function Colors5(): React.JSX.Element {
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
