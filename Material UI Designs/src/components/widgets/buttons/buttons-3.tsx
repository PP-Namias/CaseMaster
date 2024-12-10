'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { usePopover } from '@/hooks/use-popover';

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

const options = [
  { label: 'Create a merge commit', value: 'merge_commit' },
  { label: 'Squash and merge', value: 'squash_merge' },
  { label: 'Rebase and merge', value: 'rebase_merge', disabled: true },
] satisfies Option[];

export function Buttons3(): React.JSX.Element {
  const popover = usePopover<HTMLDivElement>();
  const [selectedOption, setSelectedOption] = React.useState<Option>(options[0]);

  const handleSelectOption = React.useCallback(
    (option: Option) => {
      popover.handleClose();
      setSelectedOption(option);
    },
    [popover]
  );

  return (
    <Box sx={{ p: 3 }}>
      <ButtonGroup ref={popover.anchorRef} variant="contained">
        <Button>{selectedOption.label}</Button>
        <Button onClick={popover.handleToggle} size="small">
          <CaretDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        anchorEl={popover.anchorRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={popover.handleClose}
        open={popover.open}
      >
        {options.map((option) => (
          <MenuItem
            disabled={option.disabled}
            key={option.value}
            onClick={() => {
              handleSelectOption(option);
            }}
            selected={option.value === selectedOption.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
