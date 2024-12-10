'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { useMediaQuery } from '@/hooks/use-media-query';

import { FleetVehicles } from './fleet-vehicles';
import type { Vehicle } from './types';

export interface SidebarProps {
  currentVehicleId?: string;
  onClose?: () => void;
  onVehicleDeselect?: () => void;
  onVehicleSelect?: (vehicleId: string) => void;
  open?: boolean;
  vehicles: Vehicle[];
}

export function Sidebar({
  currentVehicleId,
  onClose,
  onVehicleDeselect,
  onVehicleSelect,
  open,
  vehicles,
}: SidebarProps): React.JSX.Element {
  const mdUp = useMediaQuery('up', 'md');

  const content = (
    <SidebarContent
      currentVehicleId={currentVehicleId}
      onClose={onClose}
      onVehicleDeselect={onVehicleDeselect}
      onVehicleSelect={onVehicleSelect}
      vehicles={vehicles}
    />
  );

  if (mdUp) {
    return (
      <Box
        sx={{
          borderRight: '1px solid var(--mui-palette-divider)',
          display: { xs: 'none', md: 'block' },
          flex: '0 0 auto',
          width: '320px',
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Drawer PaperProps={{ sx: { maxWidth: '100%', width: '320px' } }} onClose={onClose} open={open}>
      {content}
    </Drawer>
  );
}

export interface SidebarContentProps {
  currentVehicleId?: string;
  onClose?: () => void;
  onVehicleDeselect?: () => void;
  onVehicleSelect?: (vehicleId: string) => void;
  vehicles: Vehicle[];
}

function SidebarContent({
  currentVehicleId,
  onClose,
  onVehicleDeselect,
  onVehicleSelect,
  vehicles,
}: SidebarContentProps): React.JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack spacing={1} sx={{ flex: '0 0 auto', p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Fleet</Typography>
          <IconButton onClick={onClose} sx={{ display: { md: 'none' } }}>
            <XIcon />
          </IconButton>
        </Stack>
        <Button startIcon={<PlusIcon />} variant="contained">
          Add vehicle
        </Button>
      </Stack>
      <Divider />
      <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
        <FleetVehicles
          currentVehicleId={currentVehicleId}
          onVehicleDeselect={onVehicleDeselect}
          onVehicleSelect={onVehicleSelect}
          vehicles={vehicles}
        />
      </Box>
    </Box>
  );
}
