'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Chat as ChatIcon } from '@phosphor-icons/react/dist/ssr/Chat';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';

import { dayjs } from '@/lib/dayjs';

import type { Task } from './types';

export interface TaskCardProps {
  onOpen?: (taskId: string) => void;
  task: Task;
}

export function TaskCard({ onOpen, task }: TaskCardProps): React.JSX.Element {
  const { assignees = [], attachments = [], comments = [], description, dueDate, id, subtasks = [], title } = task;

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        {dueDate ? (
          <div>
            <Typography color="text.secondary" variant="body2">
              Due {dayjs(dueDate).diff(dayjs(), 'day')} days
            </Typography>
          </div>
        ) : null}
        <Stack spacing={0.5}>
          <Typography
            onClick={(): void => {
              onOpen?.(id);
            }}
            sx={{ cursor: 'pointer', ':hover': { color: 'var(--mui-palette-primary-main)' } }}
            variant="subtitle1"
          >
            {title}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {assignees.length ? (
              <AvatarGroup sx={{ flex: '1 1 auto' }}>
                {assignees.map(
                  (assignee): React.JSX.Element => (
                    <Avatar key={assignee.id} src={assignee.avatar} />
                  )
                )}
              </AvatarGroup>
            ) : null}
          </div>
          <Stack direction="row" spacing={1}>
            {attachments.length ? <LinkIcon fontSize="var(--icon-fontSize-md)" /> : null}
            {comments.length ? <ChatIcon fontSize="var(--icon-fontSize-md)" /> : null}
            {subtasks.length ? <ListIcon fontSize="var(--icon-fontSize-md)" /> : null}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
