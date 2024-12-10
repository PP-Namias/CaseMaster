'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import type { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

import { JobCategoryStep } from './job-category-step';
import { JobDescriptionStep } from './job-description-step';
import { JobDetailsStep } from './job-details-step';
import { JobPreview } from './job-preview';

function StepIcon({ active, completed, icon }: StepIconProps): React.JSX.Element {
  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        ...(highlight && {
          bgcolor: 'var(--mui-palette-primary-main)',
          color: 'var(--mui-palette-primary-contrastText)',
        }),
      }}
      variant="rounded"
    >
      {completed ? <CheckIcon /> : icon}
    </Avatar>
  );
}

export function JobCreateForm(): React.JSX.Element {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  const handleNext = React.useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = React.useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = React.useCallback(() => {
    setIsComplete(true);
  }, []);

  const steps = React.useMemo(() => {
    return [
      { label: 'Category', content: <JobCategoryStep onBack={handleBack} onNext={handleNext} /> },
      { label: 'Job Details', content: <JobDetailsStep onBack={handleBack} onNext={handleNext} /> },
      { label: 'Description', content: <JobDescriptionStep onBack={handleBack} onNext={handleComplete} /> },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return <JobPreview />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-root': { ml: '19px' },
        '& .MuiStepConnector-line': { borderLeft: '2px solid var(--mui-palette-divider)' },
        '& .MuiStepLabel-iconContainer': { paddingRight: '16px' },
        '& .MuiStepContent-root': { borderLeft: '2px solid var(--mui-palette-divider)', ml: '19px' },
        '& .MuiStep-root:last-of-type .MuiStepContent-root': { borderColor: 'transparent' },
      }}
    >
      {steps.map((step) => {
        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography variant="overline">{step.label}</Typography>
            </StepLabel>
            <StepContent>
              <Box sx={{ px: 2, py: 3 }}>{step.content}</Box>
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
