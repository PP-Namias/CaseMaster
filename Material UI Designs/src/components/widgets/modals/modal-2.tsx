import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

type Language = 'en' | 'de' | 'es';

const languageOptions = {
  en: { icon: '/assets/flag-uk.svg', label: 'English' },
  de: { icon: '/assets/flag-de.svg', label: 'German' },
  es: { icon: '/assets/flag-ph.svg', label: 'Spanish' },
} as const;

export function Modal2(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-shadows-16)',
          p: 1,
          mx: 'auto',
          width: '240px',
        }}
      >
        <List disablePadding>
          {(Object.keys(languageOptions) as Language[]).map((language) => {
            const option = languageOptions[language];

            return (
              <MenuItem key={language}>
                <ListItemIcon>
                  <Box sx={{ height: '28px', width: '28px' }}>
                    <Box alt={option.label} component="img" src={option.icon} sx={{ height: 'auto', width: '100%' }} />
                  </Box>
                </ListItemIcon>
                <Typography variant="subtitle2">{option.label}</Typography>
              </MenuItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
}
