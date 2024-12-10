'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Rows as RowsIcon } from '@phosphor-icons/react/dist/ssr/Rows';
import { SquaresFour as SquaresFourIcon } from '@phosphor-icons/react/dist/ssr/SquaresFour';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { Option } from '@/components/core/option';

export interface Filters {
  query?: string;
}

export type ViewMode = 'grid' | 'list';

export type SortDir = 'asc' | 'desc';

export interface ItemsFiltersProps {
  filters?: Filters;
  sortDir?: SortDir;
  view?: ViewMode;
}

export function ItemsFilters({ filters = {}, sortDir = 'desc', view = 'grid' }: ItemsFiltersProps): React.JSX.Element {
  const navigate = useNavigate();

  const [query, setQuery] = React.useState(filters.query ?? '');

  React.useEffect(() => {
    setQuery(filters.query ?? '');
  }, [filters]);

  const updateSearchParams = React.useCallback(
    (newFilters: Filters, newSortDir: SortDir): void => {
      const searchParams = new URLSearchParams();

      // Keep the view mode
      if (view) {
        searchParams.set('view', view);
      }

      if (newSortDir === 'asc') {
        searchParams.set('sortDir', newSortDir);
      }

      if (newFilters.query) {
        searchParams.set('query', newFilters.query);
      }

      navigate(`${paths.dashboard.fileStorage}?${searchParams.toString()}`);
    },
    [navigate, view]
  );

  const handleQueryChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleQueryApply = React.useCallback(() => {
    updateSearchParams({ ...filters, query }, sortDir);
  }, [updateSearchParams, filters, query, sortDir]);

  const handleSortChange = React.useCallback(
    (event: SelectChangeEvent) => {
      updateSearchParams(filters, event.target.value as SortDir);
    },
    [updateSearchParams, filters]
  );

  const handleViewChange = React.useCallback(
    (value: ViewMode) => {
      if (value) {
        navigate(`${paths.dashboard.fileStorage}?view=${value}`);
      }
    },
    [navigate]
  );

  return (
    <Card>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 2 }}>
        <OutlinedInput
          name="name"
          onChange={handleQueryChange}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              handleQueryApply();
            }
          }}
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
            </InputAdornment>
          }
          sx={{ flex: '1 1 auto' }}
        />
        <Select name="sort" onChange={handleSortChange} sx={{ maxWidth: '100%', width: '120px' }} value={sortDir}>
          <Option value="desc">Newest</Option>
          <Option value="asc">Oldest</Option>
        </Select>
        <ToggleButtonGroup
          color="primary"
          exclusive
          onChange={(_, value: ViewMode) => {
            handleViewChange(value);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleViewChange(view === 'grid' ? 'list' : 'grid');
            }
          }}
          tabIndex={0}
          value={view}
        >
          <ToggleButton value="grid">
            <SquaresFourIcon />
          </ToggleButton>
          <ToggleButton value="list">
            <RowsIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
    </Card>
  );
}
