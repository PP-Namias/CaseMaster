import * as React from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

interface Option {
  description: string;
  title: string;
  value: string;
}

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
  },
] satisfies Option[];

export function Form9(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
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
            key={option.value}
            label={
              <div>
                <Typography variant="inherit">{option.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {option.description}
                </Typography>
              </div>
            }
            value={option.value}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
