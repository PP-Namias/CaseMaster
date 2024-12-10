'use client';

import * as React from 'react';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowCounterClockwise as ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import type { Settings } from '@/types/settings';

import { OptionsColorScheme } from './options-color-scheme';
import { OptionsDirection } from './options-direction';
import { OptionsLayout } from './options-layout';
import { OptionsNavColor } from './options-nav-color';
import { OptionsPrimaryColor } from './options-primary-color';

export interface SettingsDrawerProps {
  canReset?: boolean;
  onClose?: () => void;
  onReset?: () => void;
  onUpdate?: (settings: Partial<Settings>) => void;
  open?: boolean;
  values?: Partial<Settings>;
}

export function SettingsDrawer({
  canReset = true,
  onClose,
  onUpdate,
  onReset,
  open,
  values = {},
}: SettingsDrawerProps): React.JSX.Element {
  const handleChange = React.useCallback(
    (field: keyof Settings, value: unknown) => {
      onUpdate?.({ [field]: value });
    },
    [onUpdate]
  );

  return (
    <Drawer
      ModalProps={{ BackdropProps: { invisible: true }, sx: { zIndex: 1400 } }}
      PaperProps={{ elevation: 24, sx: { display: 'flex', flexDirection: 'column', maxWidth: '100%', width: '440px' } }}
      anchor="right"
      disableScrollLock
      onClose={onClose}
      open={open}
    >
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2 }}>
        <Typography variant="h6">App settings</Typography>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Badge
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            color="error"
            sx={{ '& .MuiBadge-badge': { top: 6, right: 6, ...(!canReset && { display: 'none' }) } }}
            variant="dot"
          >
            <IconButton onClick={onReset}>
              <ArrowCounterClockwiseIcon />
            </IconButton>
          </Badge>
          <IconButton onClick={onClose}>
            <XIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack spacing={5} sx={{ overflowY: 'auto', p: 3 }}>
        <OptionsPrimaryColor
          onChange={(value) => {
            handleChange('primaryColor', value);
          }}
          value={values.primaryColor}
        />
        <OptionsColorScheme
          onChange={(value) => {
            handleChange('colorScheme', value);
          }}
          value={values.colorScheme}
        />
        <OptionsNavColor
          onChange={(value) => {
            handleChange('navColor', value);
          }}
          value={values.navColor}
        />
        <OptionsLayout
          onChange={(value) => {
            handleChange('layout', value);
          }}
          value={values.layout}
        />
        <OptionsDirection
          onChange={(value) => {
            handleChange('direction', value);
          }}
          value={values.direction}
        />
      </Stack>
    </Drawer>
  );
}
