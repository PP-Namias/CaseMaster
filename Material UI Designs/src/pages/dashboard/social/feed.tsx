import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { PostAdd } from '@/components/dashboard/social/post-add';
import { PostCard } from '@/components/dashboard/social/post-card';
import type { Post } from '@/components/dashboard/social/types';

const metadata = { title: `Feed | Social | Dashboard | ${config.site.name}` } satisfies Metadata;

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
    id: 'POST-002',
    author: { name: 'Siegbert Gottfried', avatar: '/assets/avatar-2.png' },
    content: "What's the most important skill a developer should have?",
    comments: [
      {
        id: 'MSG-004',
        content: 'I think it is being able to communicate clearly',
        author: { name: 'Iulia Albu', avatar: '/assets/avatar-6.png' },
        createdAt: dayjs().subtract(35, 'minute').toDate(),
      },
      {
        id: 'MSG-005',
        content: 'Patience definitely',
        author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
        createdAt: dayjs().subtract(1, 'hour').toDate(),
      },
    ],
    isLiked: true,
    likes: 6,
    createdAt: dayjs().subtract(7, 'hour').toDate(),
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
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Social Feed
            </Typography>
            <Typography variant="h4">Here&apos;s what your connections posted</Typography>
          </Stack>
          <PostAdd />
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Box>
    </React.Fragment>
  );
}
