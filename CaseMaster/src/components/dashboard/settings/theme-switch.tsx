import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Gear as GearIcon } from '@phosphor-icons/react/dist/ssr/Gear';
import { Moon as MoonIcon } from '@phosphor-icons/react/dist/ssr/Moon';
import { Sun as SunIcon } from '@phosphor-icons/react/dist/ssr/Sun';

export function ThemeSwitch(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <GearIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Theme options"
      />
      <CardContent>
        <Card variant="outlined">
          <RadioGroup
            defaultValue="light"
            sx={{
              gap: 0,
              '& .MuiFormControlLabel-root': {
                justifyContent: 'space-between',
                p: '8px 12px',
                '&:not(:last-of-type)': { borderBottom: '1px solid var(--mui-palette-divider)' },
              },
            }}
          >
            {[
              { title: 'Light mode', description: 'Best for bright environments', value: 'light', icon: SunIcon },
              { title: 'Dark mode', description: 'Recommended for dark rooms', value: 'dark', icon: MoonIcon },
              { title: 'System', description: "Adapts to your device's theme", value: 'system', icon: SunIcon },
            ].map((option) => (
              <FormControlLabel
                control={<Radio />}
                key={option.value}
                label={
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                    <Avatar>
                      <option.icon fontSize="var(--Icon-fontSize)" />
                    </Avatar>
                    <div>
                      <Typography variant="inherit">{option.title}</Typography>
                      <Typography color="text.secondary" variant="caption">
                        {option.description}
                      </Typography>
                    </div>
                  </Stack>
                }
                labelPlacement="start"
                value={option.value}
              />
            ))}
          </RadioGroup>
        </Card>
      </CardContent>
    </Card>
  );
}
