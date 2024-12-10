import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const typeOptions = [
  {
    description: "I'm looking for teammates to join in a personal project",
    title: "I'm a freelancer",
    value: 'freelancer',
  },
  {
    description: "I'm looking for freelancer or contractors to take care of my project",
    title: "I'm a project owner",
    value: 'projectOwner',
  },
  {
    description: "I'm looking for freelancer or contractors to take care of my project",
    title: 'I want to join affiliate',
    value: 'affiliate',
    disabled: true,
  },
] satisfies { description: string; title: string; value: string; disabled?: boolean }[];

export function Inputs2(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <Stack component={RadioGroup} spacing={3}>
        <Stack spacing={1}>
          <Typography variant="h5">Please select one option</Typography>
          <Typography color="text.secondary" variant="body1">
            Proin tincidunt lacus sed ante efficitur efficitur. Quisque aliquam fringilla velit sit amet euismod.
          </Typography>
        </Stack>
        <RadioGroup
          defaultValue="freelancer"
          sx={{
            '& .MuiFormControlLabel-root': {
              border: '1px solid var(--mui-palette-divider)',
              borderRadius: 1,
              gap: 2,
              p: 2,
            },
          }}
        >
          {typeOptions.map((option) => (
            <FormControlLabel
              control={<Radio />}
              disabled={option.disabled}
              key={option.value}
              label={
                <div>
                  <Typography
                    sx={{
                      color: option.disabled ? 'var(--mui-palette-action-disabled)' : 'var(--mui-palette-text-primary)',
                    }}
                    variant="inherit"
                  >
                    {option.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: option.disabled
                        ? 'var(--mui-palette-action-disabled)'
                        : 'var(--mui-palette-text-secondary)',
                    }}
                    variant="body2"
                  >
                    {option.description}
                  </Typography>
                </div>
              }
              value={option.value}
            />
          ))}
        </RadioGroup>
      </Stack>
    </Box>
  );
}
