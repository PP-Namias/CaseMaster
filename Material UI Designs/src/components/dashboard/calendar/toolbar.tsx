'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { dayjs } from '@/lib/dayjs';
import { Option } from '@/components/core/option';

import type { ViewMode } from './types';

export interface ToolbarProps {
  date: Date;
  onAdd?: () => void;
  onViewChange?: (view: ViewMode) => void;
  view: ViewMode;
}

export function Toolbar({ date, onAdd, onViewChange, view }: ToolbarProps): React.JSX.Element {
  const handleViewChange = React.useCallback(
    (event: SelectChangeEvent) => {
      onViewChange?.(event.target.value as ViewMode);
    },
    [onViewChange]
  );

  return (
    <Stack
      spacing={3}
      sx={{
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="h5">{dayjs(date).format('MMMM')}</Typography>
        <Typography sx={{ fontWeight: 400 }} variant="h5">
          {dayjs(date).format('YYYY')}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
        <Select
          name="view"
          onChange={handleViewChange}
          sx={{ minWidth: '120px', order: { xs: -1, md: 0 } }}
          value={view}
        >
          <Option value="dayGridMonth">Month</Option>
          <Option value="timeGridWeek">Week</Option>
          <Option value="timeGridDay">Day</Option>
          <Option value="listWeek">Agenda</Option>
        </Select>
        <Button onClick={onAdd} startIcon={<PlusIcon />} sx={{ width: { xs: '100%', md: 'auto' } }} variant="contained">
          New event
        </Button>
      </Stack>
    </Stack>
  );
}
