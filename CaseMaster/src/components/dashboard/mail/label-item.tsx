import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Bookmark as BookmarkIcon } from '@phosphor-icons/react/dist/ssr/Bookmark';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';
import { Tag as TagIcon } from '@phosphor-icons/react/dist/ssr/Tag';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { WarningCircle as WarningCircleIcon } from '@phosphor-icons/react/dist/ssr/WarningCircle';

import type { Label } from './types';

const systemLabelIcons: Record<string, Icon> = {
  inbox: EnvelopeSimpleIcon,
  sent: PaperPlaneTiltIcon,
  trash: TrashIcon,
  drafts: FileIcon,
  spam: WarningCircleIcon,
  starred: StarIcon,
  important: BookmarkIcon,
};

function getIcon(label: Label): Icon {
  if (label.type === 'system') {
    return systemLabelIcons[label.id] ?? systemLabelIcons.inbox;
  }

  return TagIcon;
}

function getIconColor(label: Label, active?: boolean): string {
  if (label.type === 'custom') {
    return label.color ?? 'var(--mui-palette-text-secondary)';
  }

  return active ? 'var(--mui-palette-text-primary)' : 'var(--mui-palette-text-secondary)';
}

export interface LabelItemProps {
  active?: boolean;
  label: Label;
  onSelect?: () => void;
}

export function LabelItem({ active, label, onSelect }: LabelItemProps): React.JSX.Element {
  const Icon = getIcon(label);
  const iconColor = getIconColor(label, active);
  const showUnreadCount = (label.unreadCount ?? 0) > 0;

  return (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        onClick={onSelect}
        onKeyUp={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            onSelect?.();
          }
        }}
        role="button"
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(active && { bgcolor: 'var(--mui-palette-action-selected)', color: 'var(--mui-palette-text-primary)' }),
          '&:hover': {
            ...(!active && { bgcolor: 'var(--mui-palette-action-hover)', color: 'var(---mui-palette-text-primary)' }),
          },
        }}
        tabIndex={0}
      >
        <Box sx={{ display: 'flex', flex: '0 0 auto' }}>
          <Icon color={iconColor} fontSize="var(--icon-fontSize-md)" weight={active ? 'fill' : undefined} />
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {label.name}
          </Typography>
        </Box>
        {showUnreadCount ? (
          <Typography color="inherit" variant="subtitle2">
            {label.unreadCount}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
