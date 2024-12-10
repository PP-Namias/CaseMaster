'use client';

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { Rows as RowsIcon } from '@phosphor-icons/react/dist/ssr/Rows';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';

type ViewMode = 'group' | 'list';

export interface ViewModeButtonProps {
  view: ViewMode;
}

export function ViewModeButton({ view }: ViewModeButtonProps): React.JSX.Element {
  const navigate = useNavigate();

  const handleViewChange = React.useCallback(
    (value: ViewMode) => {
      // Make sure to keep the search params when changing the view mode.
      // For the sake of simplicity, we did not keep the search params on mode change.

      if (value) {
        navigate(`${paths.dashboard.invoices.list}?view=${value}`);
      }
    },
    [navigate]
  );

  return (
    <ToggleButtonGroup
      color="primary"
      exclusive
      onChange={(_, value: ViewMode) => {
        handleViewChange(value);
      }}
      onKeyUp={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleViewChange(view === 'group' ? 'list' : 'group');
        }
      }}
      tabIndex={0}
      value={view}
    >
      <ToggleButton value="group">
        <RowsIcon />
      </ToggleButton>
      <ToggleButton value="list">
        <ListIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
