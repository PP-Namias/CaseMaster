'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
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

export interface ItemCardProps {
  item: Item;
  onDelete?: (itemId: string) => void;
  onFavorite?: (itemId: string, value: boolean) => void;
  onOpen?: (itemId: string) => void;
}

export function ItemCard({ item, onDelete, onFavorite, onOpen }: ItemCardProps): React.JSX.Element {
  const popover = usePopover<HTMLButtonElement>();

  const handleDelete = React.useCallback(() => {
    popover.handleClose();
    onDelete?.(item.id);
  }, [item, popover, onDelete]);

  const createdAt = item.createdAt ? dayjs(item.createdAt).format('MMM D, YYYY') : undefined;
  const sharedWith = item.shared ?? [];
  const showShared = !item.isPublic && sharedWith.length > 0;

  return (
    <React.Fragment>
      <Card
        key={item.id}
        sx={{
          transition: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:hover': { boxShadow: 'var(--mui-shadows-16)' },
        }}
      >
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', pt: 2, px: 2 }}>
          <IconButton
            onClick={() => {
              onFavorite?.(item.id, !item.isFavorite);
            }}
          >
            <StarIcon color="var(--mui-palette-warning-main)" weight={item.isFavorite ? 'fill' : undefined} />
          </IconButton>
          <IconButton onClick={popover.handleOpen} ref={popover.anchorRef}>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        </Stack>
        <Stack divider={<Divider />} spacing={1} sx={{ p: 2 }}>
          <Box
            onClick={() => {
              onOpen?.(item.id);
            }}
            sx={{ display: 'inline-flex', cursor: 'pointer' }}
          >
            <ItemIcon extension={item.extension} type={item.type} />
          </Box>
          <div>
            <Typography
              onClick={() => {
                onOpen?.(item.id);
              }}
              sx={{ cursor: 'pointer' }}
              variant="subtitle2"
            >
              {item.name}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography color="text.secondary" variant="body2">
                {item.size}
                {item.type === 'folder' ? <span> • {item.itemsCount} items</span> : null}
              </Typography>
              <div>
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
              </div>
            </Stack>
            <Typography color="text.secondary" variant="caption">
              Created at {createdAt}
            </Typography>
          </div>
        </Stack>
      </Card>
      <ItemMenu
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        onDelete={handleDelete}
        open={popover.open}
      />
    </React.Fragment>
  );
}
