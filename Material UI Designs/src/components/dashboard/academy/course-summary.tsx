import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';

import { ChapterStepIcon } from './chapter-step-icon';
import type { Chapter, Course } from './types';

export interface CourseSummaryProps {
  chapters: Chapter[];
  course: Course;
  currentChapterNumber?: number;
}

export function CourseSummary({ chapters, course, currentChapterNumber }: CourseSummaryProps): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <LinearProgress sx={{ flex: '1 1 auto', height: '8px' }} value={course.progress} variant="determinate" />
          <Typography color="text.secondary" variant="body2">
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
              course.progress / 100
            )}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <ClockIcon fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" variant="caption">
            {course.duration}
          </Typography>
        </Stack>
      </Stack>
      <div>
        <Typography variant="subtitle1">{course.title}</Typography>
        <Typography color="text.secondary" variant="body2">
          {course.description}
        </Typography>
      </div>
      <Stepper
        activeStep={currentChapterNumber ? currentChapterNumber - 1 : 0}
        orientation="vertical"
        sx={{
          '& .MuiStepLabel-iconContainer': { pr: 3 },
          '& .MuiStepConnector-line': { borderLeft: '2px solid var(--mui-palette-divider)' },
        }}
      >
        {chapters.map((chapter, index) => {
          const isCompleted = currentChapterNumber ? index < currentChapterNumber - 1 : false;

          return (
            <Step key={chapter.title}>
              <StepLabel StepIconComponent={ChapterStepIcon}>
                <Typography color={isCompleted ? 'primary.main' : 'text.primary'} variant="subtitle2">
                  {chapter.title}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {chapter.description}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Stack>
  );
}
