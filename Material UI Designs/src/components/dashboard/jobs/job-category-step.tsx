'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

const categoryOptions = [
  { title: 'Freelancers', description: 'Best for small, friendly-pocket projects', value: 'freelancers' },
  {
    title: 'Contractors',
    description: 'Limited-time projects with highly experienced individuals',
    value: 'contractors',
  },
  { title: 'Employees', description: 'Unlimited term contracts', value: 'employees', disabled: true },
] satisfies { title: string; description: string; value: string; disabled?: boolean }[];

export interface JobCategoryStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export function JobCategoryStep({ onNext }: JobCategoryStepProps): React.JSX.Element {
  const [category, setCategory] = React.useState<string>(categoryOptions[1].value);

  const handleCategoryChange = React.useCallback((newCategory: string) => {
    setCategory(newCategory);
  }, []);

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">I&apos;m looking for...</Typography>
      </div>
      <RadioGroup
        onChange={(event) => {
          handleCategoryChange(event.target.value);
        }}
        sx={{
          '& .MuiFormControlLabel-root': {
            border: '1px solid var(--mui-palette-divider)',
            borderRadius: 1,
            gap: 2,
            p: 2,
            position: 'relative',
            '&::before': {
              borderRadius: 'inherit',
              bottom: 0,
              content: '" "',
              left: 0,
              pointerEvents: 'none',
              position: 'absolute',
              right: 0,
              top: 0,
            },
            '&.Mui-disabled': { bgcolor: 'var(--mui-palette-background-level1)' },
          },
        }}
        value={category}
      >
        {categoryOptions.map((option) => (
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
                    color: option.disabled ? 'var(--mui-palette-action-disabled)' : 'var(--mui-palette-text-secondary)',
                  }}
                  variant="body2"
                >
                  {option.description}
                </Typography>
              </div>
            }
            sx={{
              ...(option.value === category && {
                '&::before': { boxShadow: '0 0 0 2px var(--mui-palette-primary-main)' },
              }),
            }}
            value={option.value}
          />
        ))}
      </RadioGroup>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button endIcon={<ArrowRightIcon />} onClick={onNext} variant="contained">
          Continue
        </Button>
      </Box>
    </Stack>
  );
}
