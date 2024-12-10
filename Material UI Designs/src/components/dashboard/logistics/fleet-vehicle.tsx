'use client';

import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Truck as TruckIcon } from '@phosphor-icons/react/dist/ssr/Truck';

import { dayjs } from '@/lib/dayjs';

import type { Vehicle } from './types';

export interface FleetVehicleProps {
  onDeselect?: () => void;
  onSelect?: (vehicleId: string) => void;
  selected?: boolean;
  vehicle: Vehicle;
}

export function FleetVehicle({ onDeselect, onSelect, selected, vehicle }: FleetVehicleProps): React.JSX.Element {
  const handleToggle = React.useCallback(() => {
    if (!selected) {
      onSelect?.(vehicle.id);
    } else {
      onDeselect?.();
    }
  }, [onDeselect, onSelect, selected, vehicle]);

  return (
    <Stack component="li">
      <Stack
        direction="row"
        onClick={handleToggle}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            handleToggle();
          }
        }}
        role="button"
        spacing={2}
        sx={{ alignItems: 'center', cursor: 'pointer', dispaly: 'flex', p: 2, textAlign: 'left', width: '100%' }}
        tabIndex={0}
      >
        <Avatar>
          <TruckIcon fontSize="var(--Icon-fontSize)" />
        </Avatar>
        <div>
          <Typography variant="subtitle1">{vehicle.id}</Typography>
          <Typography color="text.secondary" variant="body2">
            {vehicle.location}
          </Typography>
        </div>
      </Stack>
      <Collapse in={selected}>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="caption">
              Temperature (good)
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <LinearProgress sx={{ flex: '1 1 auto' }} value={vehicle.temperature} variant="determinate" />
              <Typography color="text.secondary" variant="body2">
                {vehicle.temperature}°C
              </Typography>
            </Stack>
          </Stack>
          <Timeline sx={{ px: 3, '& .MuiTimelineItem-root:before': { flex: 0, p: 0 } }}>
            {vehicle.arrivedAt ? (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <div>
                    <Typography variant="body2">Arrived</Typography>
                    <Typography color="text.secondary" variant="caption">
                      {dayjs(vehicle.arrivedAt).format('MMM D, YYYY h:mm A')}
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ) : null}
            {vehicle.departedAt ? (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <div>
                    <Typography variant="body2">Out for delivery</Typography>
                    <Typography color="text.secondary" variant="caption">
                      {dayjs(vehicle.departedAt).format('MMM D, YYYY h:mm A')}
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ) : null}
            {vehicle.startedAt ? (
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                </TimelineSeparator>
                <TimelineContent>
                  <div>
                    <Typography variant="body2">Tracking number created</Typography>
                    <Typography color="text.secondary" variant="caption">
                      {dayjs(vehicle.startedAt).format('MMM D, YYYY h:mm A')}
                    </Typography>
                  </div>
                </TimelineContent>
              </TimelineItem>
            ) : null}
          </Timeline>
        </Box>
      </Collapse>
    </Stack>
  );
}
