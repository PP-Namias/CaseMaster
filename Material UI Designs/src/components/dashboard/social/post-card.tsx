import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { ShareNetwork as ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr/ShareNetwork';

import { dayjs } from '@/lib/dayjs';

import { CommentAdd } from './comment-add';
import { CommentBox } from './comment-box';
import type { Post } from './types';

export interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps): React.JSX.Element {
  const comments = post.comments ?? [];

  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src={post.author.avatar} sx={{ cursor: 'pointer' }} />
          <div>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <Link color="text.primary" variant="subtitle2">
                {post.author.name}
              </Link>
              <Typography variant="body2">updated their status</Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <ClockIcon />
              <Typography color="text.secondary" variant="caption">
                {dayjs(post.createdAt).fromNow()}
              </Typography>
            </Stack>
          </div>
        </Stack>
        {post.content ? <Typography>{post.content}</Typography> : null}
        {post.media ? (
          <div>
            <CardActionArea>
              <CardMedia image={post.media} sx={{ backgroundPosition: 'center', height: '400px' }} />
            </CardActionArea>
          </div>
        ) : null}
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" sx={{ alignItems: 'center' }}>
            {post.isLiked ? (
              <Tooltip title="Unlike">
                <IconButton color="error">
                  <HeartIcon weight="fill" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Like">
                <IconButton color="error">
                  <HeartIcon />
                </IconButton>
              </Tooltip>
            )}
            <Typography color="text.secondary" variant="subtitle2">
              {post.likes}
            </Typography>
          </Stack>
          <div>
            <IconButton>
              <ShareNetworkIcon />
            </IconButton>
          </div>
        </Stack>
        <Stack divider={<Divider />} spacing={3}>
          <Stack spacing={3}>
            {comments.map((comment) => (
              <CommentBox comment={comment} key={comment.id} />
            ))}
          </Stack>
          <CommentAdd />
        </Stack>
      </Stack>
    </Card>
  );
}
