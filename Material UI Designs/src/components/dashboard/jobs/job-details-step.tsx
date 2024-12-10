'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import type { Dayjs } from 'dayjs';

import { dayjs } from '@/lib/dayjs';

export interface JobDetailsStepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export function JobDetailsStep({ onBack, onNext }: JobDetailsStepProps): React.JSX.Element {
  const [tagValue, setTagValue] = React.useState<string>('');
  const [tags, setTags] = React.useState<Set<string>>(new Set());
  const [startDate, setStartDate] = React.useState<Date | null>(dayjs().toDate());
  const [endDate, setEndDate] = React.useState<Date | null>(dayjs().add(1, 'month').toDate());

  const handleStartDateChange = React.useCallback((newDate: Dayjs | null) => {
    setStartDate(newDate?.toDate() ?? null);
  }, []);

  const handleEndDateChange = React.useCallback((newDate: Dayjs | null) => {
    setEndDate(newDate?.toDate() ?? null);
  }, []);

  const handleTagAdd = React.useCallback(() => {
    if (!tagValue) {
      return;
    }

    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.add(tagValue);
      return copy;
    });

    setTagValue('');
  }, [tagValue]);

  const handleTagDelete = React.useCallback((deletedTag: string) => {
    setTags((prevState) => {
      const copy = new Set(prevState);
      copy.delete(deletedTag);
      return copy;
    });
  }, []);

  return (
    <Stack spacing={4}>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">What is the job about?</Typography>
        </div>
        <Stack spacing={3}>
          <FormControl>
            <InputLabel>Job title</InputLabel>
            <OutlinedInput name="jobTitle" placeholder="e.g Salesforce Analyst" />
          </FormControl>
          <FormControl>
            <InputLabel>Tags</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position="end">
                  <Button color="secondary" onClick={handleTagAdd} size="small">
                    Add
                  </Button>
                </InputAdornment>
              }
              name="tags"
              onChange={(event) => {
                setTagValue(event.target.value);
              }}
              value={tagValue}
            />
          </FormControl>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            {Array.from(tags.values()).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => {
                  handleTagDelete(tag);
                }}
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">When is the project starting?</Typography>
        </div>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
          <DatePicker
            format="MMM D, YYYY"
            label="Start date"
            onChange={handleStartDateChange}
            sx={{ flex: '1 1 auto' }}
            value={dayjs(startDate)}
          />
          <DatePicker
            format="MMM D, YYYY"
            label="End date"
            onChange={handleEndDateChange}
            sx={{ flex: '1 1 auto' }}
            value={dayjs(endDate)}
          />
        </Stack>
      </Stack>
      <Stack spacing={3}>
        <div>
          <Typography variant="h6">What is the budget?</Typography>
        </div>
        <Stack direction="row" spacing={3}>
          <FormControl sx={{ flex: '1 1 auto' }}>
            <InputLabel>Minimum</InputLabel>
            <OutlinedInput
              fullWidth
              inputProps={{ inputMode: 'numeric' }}
              name="minBudget"
              placeholder="e.g 1000"
              type="number"
            />
          </FormControl>
          <FormControl sx={{ flex: '1 1 auto' }}>
            <InputLabel>Maximum</InputLabel>
            <OutlinedInput
              fullWidth
              inputProps={{ inputMode: 'numeric' }}
              name="maxBudget"
              placeholder="e.g 5000"
              type="number"
            />
          </FormControl>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <Button color="secondary" onClick={onBack} startIcon={<ArrowLeftIcon />}>
          Back
        </Button>
        <Button endIcon={<ArrowRightIcon />} onClick={onNext} variant="contained">
          Continue
        </Button>
      </Stack>
    </Stack>
  );
}
