import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { ShareNetwork as ShareNetworkIcon } from '@phosphor-icons/react/dist/ssr/ShareNetwork';

import { dayjs } from '@/lib/dayjs';

interface Post {
  id: string;
  author: { name: string; avatar?: string };
  content?: string;
  media?: string;
  isLiked: boolean;
  likes: number;
  createdAt: Date;
}

const posts = [
  {
    id: 'POST-002',
    author: { name: 'Siegbert Gottfried', avatar: '/assets/avatar-2.png' },
    content: "What's the most important skill a developer should have?",
    media: '/assets/image-minimal-2.png',
    isLiked: true,
    likes: 6,
    createdAt: dayjs().subtract(7, 'hour').toDate(),
  },
  {
    id: 'POST-001',
    author: { name: 'PP Namias', avatar: '/assets/avatar.jpg' },
    content: 'Staying focused on the goal is key to success',
    media: '/assets/image-business-2.png',
    createdAt: dayjs().subtract(4, 'hour').toDate(),
    isLiked: false,
    likes: 4,
  },
] satisfies Post[];

export function GridList5(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} sm={6} xs={12}>
            <Card sx={{ height: '100%' }}>
              <Stack spacing={2} sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar src={post.author.avatar} />
                  <div>
                    <Link color="text.primary" variant="subtitle2">
                      {post.author.name}
                    </Link>
                    <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                      <ClockIcon />
                      <Typography color="text.secondary" variant="caption">
                        {dayjs(post.createdAt).fromNow()}
                      </Typography>
                    </Stack>
                  </div>
                </Stack>
                {post.content ? <Typography variant="body1">{post.content}</Typography> : null}
                {post.media ? (
                  <CardActionArea>
                    <CardMedia image={post.media} sx={{ backgroundPosition: 'top', height: '350px' }} />
                  </CardActionArea>
                ) : null}
                <Box sx={{ alignItems: 'center', display: 'flex' }}>
                  <Stack direction="row" sx={{ alignItems: 'center', flex: '1 1 auto' }}>
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
                  <IconButton>
                    <ShareNetworkIcon />
                  </IconButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
