import * as React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { Newsletter } from '@/components/dashboard/blog/newsletter';
import { PostCard } from '@/components/dashboard/blog/post-card';
import type { Post } from '@/components/dashboard/blog/types';

const metadata = { title: `List | Blog | Dashboard | ${config.site.name}` } satisfies Metadata;

const posts = [
  {
    id: 'POST-004',
    title: 'Building a Design System from Scratch',
    description: 'Learn how to build a design system from scratch using Figma and React that scales.',
    cover: '/assets/image-business-2.png',
    category: 'Programming',
    author: { name: 'Iulia Albu', avatar: '/assets/avatar-6.png' },
    readTime: '5 min',
    publishedAt: dayjs().subtract(45, 'minute').toDate(),
  },
  {
    id: 'POST-003',
    title: 'Passive Income Ideas for Designers',
    description: 'Explore the best passive income ideas for designers and how to get started.',
    cover: '/assets/image-abstract-2.png',
    category: 'Productivity',
    author: { name: 'Omar Darobe', avatar: '/assets/avatar-11.png' },
    readTime: '6 min',
    publishedAt: dayjs().subtract(51, 'minute').subtract(6, 'hour').toDate(),
  },
  {
    id: 'POST-002',
    title: 'Five Ways to Improve Your Workspace',
    description: 'Discover the five ways to improve your workspace and increase your productivity.',
    cover: '/assets/image-minimal-2.png',
    category: 'Entrepreneurs',
    author: { name: 'Siegbert Gottfried', avatar: '/assets/avatar-2.png' },
    readTime: '3 min',
    publishedAt: dayjs().subtract(46, 'minute').subtract(16, 'hour').toDate(),
  },
  {
    id: 'POST-001',
    title: 'How to Create a Productivity Dashboard',
    description: 'Learn how to create a productivity dashboard using Google Cloud and Supabase for your team.',
    cover: '/assets/image-business-1.png',
    category: 'Innovation',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    readTime: '1 min',
    publishedAt: dayjs().subtract(39, 'minute').subtract(7, 'hour').subtract(5, 'day').toDate(),
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
        <Stack spacing={8}>
          <Stack spacing={1}>
            <Typography variant="h4">Posts</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.overview} variant="subtitle2">
                Dashboard
              </Link>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.blog.list} variant="subtitle2">
                Blog
              </Link>
              <Typography color="text.secondary" variant="subtitle2">
                List
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Card
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              boxShadow: 'var(--mui-shadows-16)',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="subtitle1">Hello, Sofia</Typography>
            <Button component={RouterLink} href={paths.dashboard.blog.create} variant="contained">
              New post
            </Button>
          </Card>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="h4">Recent articles</Typography>
              <div>
                <Typography color="text.secondary" variant="body1">
                  Discover the latest news, tips and user research insights from Acme.
                </Typography>
                <Typography color="text.secondary" variant="body1">
                  You will learn about web infrastructure, design systems and devops APIs best practices.
                </Typography>
              </div>
            </Stack>
            <Divider />
            <Grid container spacing={4}>
              {posts.map((post) => (
                <Grid key={post.title} md={6} xs={12}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Button disabled startIcon={<ArrowLeftIcon />}>
                Newer
              </Button>
              <Button endIcon={<ArrowRightIcon />}>Older</Button>
            </Stack>
          </Stack>
          <Newsletter />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
