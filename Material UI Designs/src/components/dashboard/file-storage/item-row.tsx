'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Globe as GlobeIcon } from '@phosphor-icons/react/dist/ssr/Globe';
import { Star as StarIcon } from '@phosphor-icons/react/dist/ssr/Star';

import { dayjs } from '@/lib/dayjs';
import { usePopover } from '@/hooks/use-popover';

import { ItemIcon } from './item-icon';
import { ItemMenu } from './item-menu';
import type { Item } from './types';

export interface ItemRowProps {
  item: Item;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onOpen?: (itemId: string) => void;
}

export function ItemRow({ item, onDelete, onFavorite, onOpen }: ItemRowProps): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();

  const handleDelete = React.useCallback(() => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  const sharedWith = item.shared ?? [];
  const showShared = !item.isPublic && sharedWith.length > 0;

  return (
    <React.Fragment>
      <TableRow
        key={item.id}
        sx={{
          bgcolor: 'var(--mui-palette-background-paper)',
          borderRadius: 1.5,
          boxShadow: 0,
          transition: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:hover': { boxShadow: 'var(--mui-shadows-16)' },
          '& .MuiTableCell-root': {
            borderBottom: '1px solid var(--mui-palette-divider)',
            borderTop: '1px solid var(--mui-palette-divider)',
            '&:first-of-type': {
              borderTopLeftRadius: '12px',
              borderBottomLeftRadius: '12px',
              borderLeft: '1px solid var(--mui-palette-divider)',
            },
            '&:last-of-type': {
              borderTopRightRadius: '12px',
              borderBottomRightRadius: '12px',
              borderRight: '1px solid var(--mui-palette-divider)',
            },
          },
        }}
      >
        <TableCell sx={{ maxWidth: '250px' }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              onClick={() => {
                onOpen?.(item.id);
              }}
              sx={{ cursor: 'pointer' }}
            >
              <ItemIcon extension={item.extension} type={item.type} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                onClick={() => {
                  onOpen?.(item.id);
                }}
                sx={{ cursor: 'pointer' }}
                variant="subtitle2"
              >
                {item.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {item.size}
                {item.type === 'folder' ? <span> • {item.itemsCount} items</span> : null}
              </Typography>
            </Box>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography noWrap variant="subtitle2">
            Created at
          </Typography>
          {item.createdAt ? (
            <Typography color="text.secondary" noWrap variant="body2">
              {dayjs(item.createdAt).format('MMM D, YYYY')}
            </Typography>
          ) : undefined}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex' }}>
            {item.isPublic ? (
              <Tooltip title="Public">
                <Avatar sx={{ '--Avatar-size': '32px' }}>
                  <GlobeIcon fontSize="var(--Icon-fontSize)" />
                </Avatar>
              </Tooltip>
            ) : null}
            {showShared ? (
              <AvatarGroup max={3}>
                {sharedWith.map((person) => (
                  <Avatar key={person.name} src={person.avatar} sx={{ '--Avatar-size': '32px' }} />
                ))}
              </AvatarGroup>
            ) : null}
          </Box>
        </TableCell>
        <TableCell align="right">
          <IconButton
            onClick={() => {
              onFavorite?.(item.id, !item.isFavorite);
            }}
          >
            <StarIcon color="var(--mui-palette-warning-main)" weight={item.isFavorite ? 'fill' : undefined} />
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        </TableCell>
      </TableRow>
      <ItemMenu
        anchorEl={popover.anchorRef.current || undefined}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </React.Fragment>
  );
}
