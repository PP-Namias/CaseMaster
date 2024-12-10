'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { FleetMap } from './fleet-map';
import { Sidebar } from './sidebar';
import type { Vehicle } from './types';

export interface FleetViewProps {
  vehicles: Vehicle[];
}

export function FleetView({ vehicles }: FleetViewProps): React.JSX.Element {
  const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
  const [currentVehicleId, setCurrentVehicleId] = React.useState<string | undefined>(vehicles[0]?.id);

  const handleVehicleSelect = React.useCallback((vehicleId: string) => {
    setCurrentVehicleId(vehicleId);
  }, []);

  const handleVehicleDeselect = React.useCallback(() => {
    setCurrentVehicleId(undefined);
  }, []);

  const handleSidebarOpen = React.useCallback(() => {
    setOpenSidebar(true);
  }, []);

  const handleSidebarClose = React.useCallback(() => {
    setOpenSidebar(false);
  }, []);

  return (
    <Box sx={{ display: 'flex', flex: '1 1 0', minHeight: 0 }}>
      <Sidebar
        currentVehicleId={currentVehicleId}
        onClose={handleSidebarClose}
        onVehicleDeselect={handleVehicleDeselect}
        onVehicleSelect={handleVehicleSelect}
        open={openSidebar}
        vehicles={vehicles}
      />
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', overflow: 'hidden' }}>
        <Box sx={{ borderBottom: '1px solid var(--mui-palette-divider)', display: 'flex', flex: '0 0 auto', p: 2 }}>
          <Stack direction="row" spacing={1} sx={{ flex: '1 1 auto' }}>
            <IconButton onClick={handleSidebarOpen} sx={{ display: { md: 'none' } }}>
              <ListIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          </Stack>
        </Box>
        <FleetMap currentVehicleId={currentVehicleId} onVehicleSelect={handleVehicleSelect} vehicles={vehicles} />
      </Box>
    </Box>
  );
}
