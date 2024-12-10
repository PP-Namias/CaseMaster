import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

export function Modal6(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-shadows-16)',
          maxWidth: '320px',
          mx: 'auto',
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>PP Namias</Typography>
          <Typography color="text.secondary" variant="body2">
            pp.namias@gmail.com
          </Typography>
        </Box>
        <Divider />
        <List sx={{ p: 1 }}>
          <MenuItem>
            <ListItemIcon>
              <UserIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <GearSixIcon />
            </ListItemIcon>
            Settings
          </MenuItem>
        </List>
        <Divider />
        <Box sx={{ p: 1 }}>
          <MenuItem component="div" sx={{ justifyContent: 'center' }}>
            Sign out
          </MenuItem>
        </Box>
      </Paper>
    </Box>
  );
}
