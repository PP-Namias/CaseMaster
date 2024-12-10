'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import { toast } from '@/components/core/toaster';

import type { Event, EventPriority } from './types';

export interface EventCreateParams {
  title: string;
  description?: string;
  allDay: boolean;
  start: Date;
  end: Date;
  priority?: EventPriority;
}

export interface EventUpdateParams {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  priority?: EventPriority;
}

const schema = zod
  .object({
    title: zod.string().min(1, 'Title is required').max(255),
    description: zod.string().max(5000).optional(),
    start: zod.date(),
    end: zod.date(),
    allDay: zod.boolean(),
    priority: zod.string().max(255).optional(),
  })
  .refine((data) => data.start < data.end, { message: 'End date should be greater than start date', path: ['end'] });

type Values = zod.infer<typeof schema>;

function getDefaultValues({ event, range }: { event?: Event; range?: { start: Date; end: Date } }): Values {
  if (event) {
    return {
      title: event.title ?? '',
      description: event.description ?? '',
      start: event.start ? event.start : new Date(),
      end: event.end ? event.end : dayjs().add(30, 'minute').toDate(),
      allDay: event.allDay ?? false,
      priority: event.priority ?? 'low',
    };
  }

  if (range) {
    return { title: '', description: '', start: range.start, end: range.end, allDay: false, priority: 'low' };
  }

  return {
    title: '',
    description: '',
    start: new Date(),
    end: dayjs().add(30, 'minute').toDate(),
    allDay: false,
    priority: 'low',
  };
}

export interface EventDialogProps {
  action: 'create' | 'update';
  event?: Event;
  onClose?: () => void;
  onCreate?: (params: EventCreateParams) => void;
  onDelete?: (eventId: string) => void;
  onUpdate?: (eventId: string, params: EventUpdateParams) => void;
  open?: boolean;
  range?: { start: Date; end: Date };
}

export function EventDialog({
  action = 'create',
  event,
  onClose,
  onCreate,
  onDelete,
  onUpdate,
  open = false,
  range,
}: EventDialogProps): React.JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ defaultValues: getDefaultValues({ event, range }), resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      try {
        const params = {
          title: values.title,
          description: values.description,
          end: values.end,
          start: values.start,
          allDay: values.allDay,
          priority: values.priority as EventPriority,
        } satisfies EventCreateParams | EventUpdateParams;

        if (action === 'update') {
          onUpdate?.(event!.id, params);
        } else {
          onCreate?.(params);
        }
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [action, event, onCreate, onUpdate]
  );

  React.useEffect(() => {
    // Reset form when dialog data changes
    reset(getDefaultValues({ event, range }));
  }, [event, range, reset]);

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ p: 3 }}>
          <Typography sx={{ textAlign: 'center' }} variant="h5">
            {event ? 'Edit event' : 'Add event'}
          </Typography>
        </Box>
        <Stack spacing={2} sx={{ p: 3 }}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <FormControl error={Boolean(errors.title)}>
                <InputLabel>Title</InputLabel>
                <OutlinedInput {...field} />
                {errors.title ? <FormHelperText>{errors.title.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormControl error={Boolean(errors.description)}>
                <InputLabel>Description</InputLabel>
                <OutlinedInput {...field} />
                {errors.description ? <FormHelperText>{errors.description.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="allDay"
            render={({ field }) => (
              <div>
                <FormControlLabel control={<Checkbox {...field} checked={field.value} />} label="All day" />
                {errors.allDay ? <FormHelperText error>{errors.allDay.message}</FormHelperText> : null}
              </div>
            )}
          />
          <Controller
            control={control}
            name="start"
            render={({ field }) => (
              <DateTimePicker
                format="MMM D, YYYY hh:mm A"
                label="Start date"
                onChange={(date) => {
                  field.onChange(date ? date.toDate() : null);
                }}
                slotProps={{ textField: { error: Boolean(errors.start), helperText: errors.start?.message } }}
                value={dayjs(field.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({ field }) => (
              <DateTimePicker
                format="MMM D, YYYY hh:mm A"
                label="End date"
                onChange={(date) => {
                  field.onChange(date ? date.toDate() : null);
                }}
                slotProps={{ textField: { error: Boolean(errors.end), helperText: errors.end?.message } }}
                value={dayjs(field.value)}
              />
            )}
          />
        </Stack>
        <Divider />
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          {action === 'update' ? (
            <IconButton
              color="error"
              onClick={() => {
                onDelete?.(event!.id);
              }}
            >
              <TrashIcon />
            </IconButton>
          ) : (
            <div />
          )}
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Button color="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Confirm
            </Button>
          </Stack>
        </Stack>
      </form>
    </Dialog>
  );
}
