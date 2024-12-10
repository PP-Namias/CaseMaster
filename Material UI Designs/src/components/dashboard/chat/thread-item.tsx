import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { User } from '@/types/user';
import { dayjs } from '@/lib/dayjs';

import type { Message, Thread } from './types';

const user = {
  id: 'USR-000',
  name: 'PP Namias',
  avatar: '/assets/avatar.jpg',
  email: 'pp.namias@gmail.com',
} satisfies User;

function getDisplayContent(lastMessage: Message, userId: string): string {
  const author = lastMessage.author.id === userId ? 'Me: ' : '';
  const message = lastMessage.type === 'image' ? 'Sent a photo' : lastMessage.content;

  return `${author}${message}`;
}

export interface ThreadItemProps {
  active?: boolean;
  onSelect?: () => void;
  thread: Thread;
  messages: Message[];
}

export function ThreadItem({ active = false, thread, messages, onSelect }: ThreadItemProps): React.JSX.Element {
  const recipients = (thread.participants ?? []).filter((participant) => participant.id !== user.id);

  const lastMessage = messages[messages.length - 1];

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
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: 1,
          ...(active && { bgcolor: 'var(--mui-palette-action-selected)' }),
          '&:hover': { ...(!active && { bgcolor: 'var(--mui-palette-action-hover)' }) },
        }}
        tabIndex={0}
      >
        <div>
          <AvatarGroup
            max={2}
            sx={{
              '& .MuiAvatar-root': {
                fontSize: 'var(--fontSize-xs)',
                ...(thread.type === 'group'
                  ? { height: '24px', ml: '-16px', width: '24px', '&:nth-of-type(2)': { mt: '12px' } }
                  : { height: '36px', width: '36px' }),
              },
            }}
          >
            {recipients.map((recipient) => (
              <Avatar key={recipient.id} src={recipient.avatar} />
            ))}
          </AvatarGroup>
        </div>
        <Box sx={{ flex: '1 1 auto', overflow: 'hidden' }}>
          <Typography noWrap variant="subtitle2">
            {recipients.map((recipient) => recipient.name).join(', ')}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            {(thread.unreadCount ?? 0) > 0 ? (
              <Box
                sx={{
                  bgcolor: 'var(--mui-palette-primary-main)',
                  borderRadius: '50%',
                  flex: '0 0 auto',
                  height: '8px',
                  width: '8px',
                }}
              />
            ) : null}
            {lastMessage ? (
              <Typography color="text.secondary" noWrap sx={{ flex: '1 1 auto' }} variant="subtitle2">
                {getDisplayContent(lastMessage, user.id)}
              </Typography>
            ) : null}
          </Stack>
        </Box>
        {lastMessage ? (
          <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
            {dayjs(lastMessage.createdAt).fromNow()}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
