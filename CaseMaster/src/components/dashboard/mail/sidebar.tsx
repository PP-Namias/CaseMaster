'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../../path';
import { useMediaQuery } from '../../../hooks/use-media-query';

import { LabelItem } from './label-item';
import type { Label, LabelType } from './types';

interface GroupedLabels {
  system: Label[];
  custom: Label[];
}

function groupLabels(labels: Label[]): GroupedLabels {
  const groups: GroupedLabels = { system: [], custom: [] };

  labels.forEach((label) => {
    if (label.type === 'system') {
      groups.system.push(label);
    } else {
      groups.custom.push(label);
    }
  });

  return groups;
}

// A single sidebar component is used, because you might need to have internal state
// shared between both mobile and desktop

export interface SidebarProps {
  currentLabelId?: string;
  labels: Label[];
  openDesktop?: boolean;
  openMobile?: boolean;
  onCloseMobile?: () => void;
  onCompose?: () => void;
}

export function Sidebar({
  currentLabelId,
  labels,
  onCloseMobile,
  onCompose,
  openDesktop = false,
  openMobile = false,
}: SidebarProps): React.JSX.Element {
  const mdUp = useMediaQuery('up', 'md');

  const content = (
    <SidebarContent
      closeOnSelect={!mdUp}
      currentLabelId={currentLabelId}
      labels={labels}
      onClose={onCloseMobile}
      onCompose={onCompose}
    />
  );

  if (mdUp) {
    return (
      <Box
        sx={{
          borderRight: '1px solid var(--mui-palette-divider)',
          flex: '0 0 auto',
          ml: openDesktop ? 0 : '-320px',
          position: 'relative',
          transition: 'margin 225ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          width: '320px',
        }}
      >
        {content}
      </Box>
    );
  }

  return (
    <Drawer PaperProps={{ sx: { maxWidth: '100%', width: '320px' } }} onClose={onCloseMobile} open={openMobile}>
      {content}
    </Drawer>
  );
}

export interface SidebarContentProps {
  closeOnSelect?: boolean;
  currentLabelId?: string;
  labels: Label[];
  open?: boolean;
  onClose?: () => void;
  onCompose?: () => void;
}

function SidebarContent({
  closeOnSelect,
  currentLabelId,
  labels,
  onClose,
  onCompose,
}: SidebarContentProps): React.JSX.Element {
  const navigate = useNavigate();

  const handleLabelSelect = React.useCallback(
    (labelId: string) => {
      if (closeOnSelect) {
        onClose?.();
      }

      const href = paths.dashboard.mail.list(labelId);

      navigate(href);
    },
    [navigate, closeOnSelect, onClose]
  );

  // Maybe use memo
  const groupedLabels: GroupedLabels = groupLabels(labels);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack spacing={1} sx={{ flex: '0 0 auto', p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">Mailbox</Typography>
          <IconButton onClick={onClose} sx={{ display: { md: 'none' } }}>
            <XIcon />
          </IconButton>
        </Stack>
        <Button onClick={onCompose} startIcon={<PlusIcon />} variant="contained">
          Compose
        </Button>
      </Stack>
      <Divider />
      <Box sx={{ flex: '1 1 auto', overflowY: 'auto', p: 2 }}>
        {Object.keys(groupedLabels).map((type) => (
          <React.Fragment key={type}>
            {type === 'custom' ? (
              <ListSubheader disableSticky>
                <Typography color="text.secondary" variant="overline">
                  Custom Labels
                </Typography>
              </ListSubheader>
            ) : null}
            <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {groupedLabels[type as LabelType].map((label) => (
                <LabelItem
                  active={currentLabelId === label.id}
                  key={label.id}
                  label={label}
                  onSelect={() => {
                    handleLabelSelect(label.id);
                  }}
                />
              ))}
            </Stack>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}
