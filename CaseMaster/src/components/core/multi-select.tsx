import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';

import { usePopover } from '@/hooks/use-popover';

// `T` should be `string`, `number` or `boolean`
export interface MultiSelectProps<T = string> {
  label: string;
  onChange?: (value: T[]) => void;
  options: readonly { label: string; value: T }[];
  value: T[];
}

export function MultiSelect<T = string>({
  label,
  onChange,
  options,
  value = [],
}: MultiSelectProps<T>): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();

  const handleValueChange = React.useCallback(
    (v: T, checked: boolean) => {
      let updateValue = [...value] as T[];

      if (checked) {
        updateValue.push(v);
      } else {
        updateValue = updateValue.filter((item) => item !== v);
      }

      onChange?.(updateValue);
    },
    [onChange, value]
  );

  return (
    <React.Fragment>
      <Button
        color="secondary"
        endIcon={<CaretDownIcon />}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{ '& .MuiButton-endIcon svg': { fontSize: 'var(--icon-fontSize-sm)' } }}
      >
        {label}
      </Button>
      <Menu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
        slotProps={{ paper: { sx: { width: '250px' } } }}
      >
        {options.map((option) => {
          const selected = value.includes(option.value);

          return (
            <MenuItem
              key={option.label}
              onClick={() => {
                handleValueChange(option.value, !selected);
              }}
              selected={selected}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
}
