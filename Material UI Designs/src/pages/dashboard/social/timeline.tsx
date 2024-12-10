import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { dayjs } from '@/lib/dayjs';
import { About } from '@/components/dashboard/social/about';
import { PostAdd } from '@/components/dashboard/social/post-add';
import { PostCard } from '@/components/dashboard/social/post-card';
import type { Post } from '@/components/dashboard/social/types';

const posts = [
  {
    id: 'POST-003',
    author: { name: 'PP Namias', avatar: '/assets/avatar.jpg' },
    content: "Hey! What's your favorite framework?",
    comments: [
      {
        id: 'MSG-003',
        content: "We use React at work, but I'm a fan of Web Components",
        author: { name: 'Nasimiyu Danai', avatar: '/assets/avatar-7.png' },
        createdAt: dayjs().subtract(4, 'minute').toDate(),
      },
    ],
    createdAt: dayjs().subtract(16, 'minute').toDate(),
    isLiked: true,
    likes: 1,
  },
  {
    id: 'POST-001',
    author: { name: 'PP Namias', avatar: '/assets/avatar.jpg' },
    content: 'Staying focused on the goal is key to success',
    media: '/assets/image-business-2.png',
    comments: [
      {
        id: 'MSG-001',
        content: "I agree, it's easy to get lost in the details",
        author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
        createdAt: dayjs().subtract(1, 'hour').toDate(),
      },
      {
        id: 'MSG-002',
        content: 'Absolutely!',
        author: { name: 'PP Namias', avatar: '/assets/Namias.png' },
        createdAt: dayjs().subtract(2, 'hour').toDate(),
      },
    ],
    createdAt: dayjs().subtract(4, 'hour').toDate(),
    isLiked: false,
    likes: 4,
  },
] satisfies Post[];

export function Page(): React.JSX.Element {
  return (
    <div>
      <Grid container spacing={4}>
        <Grid lg={4} xs={12}>
          <Stack spacing={4}>
            <Card>
              <CardHeader title="Profile progress" />
              <CardContent>
                <Stack spacing={2}>
                  <LinearProgress value={50} variant="determinate" />
                  <Typography color="text.secondary" variant="subtitle2">
                    50% set up complete
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <About />
          </Stack>
        </Grid>
        <Grid lg={8} xs={12}>
          <Stack spacing={4}>
            <PostAdd />
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
