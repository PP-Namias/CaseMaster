import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { FleetVehicle } from './fleet-vehicle';
import type { Vehicle } from './types';

export interface FleetVehiclesProps {
  currentVehicleId?: string;
  onVehicleDeselect?: () => void;
  onVehicleSelect?: (vehicleId: string) => void;
  vehicles?: Vehicle[];
}

export function FleetVehicles({
  onVehicleDeselect,
  onVehicleSelect,
  currentVehicleId,
  vehicles = [],
}: FleetVehiclesProps): React.JSX.Element {
  return (
    <Stack
      component="ul"
      divider={<Divider />}
      sx={{ borderBottom: '1px solid var(--mui-palette-divider)', listStyle: 'none', m: 0, p: 0 }}
    >
      {vehicles.map((vehicle) => {
        const selected = currentVehicleId ? currentVehicleId === vehicle.id : false;

        return (
          <FleetVehicle
            key={vehicle.id}
            onDeselect={onVehicleDeselect}
            onSelect={onVehicleSelect}
            selected={selected}
            vehicle={vehicle}
          />
        );
      })}
    </Stack>
  );
}
