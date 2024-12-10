import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

import type { Comment } from './types';

export interface CommentBoxProps {
  comment: Comment;
}

export function CommentBox({ comment }: CommentBoxProps): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Avatar src={comment.author.avatar} />
      <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', borderRadius: 1, p: 2, flex: '1 1 auto' }}>
        <Stack spacing={1}>
          <Box sx={{ alignItems: 'flex-start', display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">{comment.author.name}</Typography>
            <Typography color="text.secondary" variant="caption">
              {dayjs(comment.createdAt).fromNow()}
            </Typography>
          </Box>
          <Typography variant="body2">{comment.content}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
