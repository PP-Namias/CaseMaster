import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

const colors = [
  { name: 'Text primary', code: 'var(--mui-palette-text-primary)' },
  { name: 'Text secondary', code: 'var(--mui-palette-text-secondary)' },
  { name: 'Text disabled', code: 'var(--mui-palette-text-disabled)' },
] as const;

export function Colors1(): React.JSX.Element {
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
