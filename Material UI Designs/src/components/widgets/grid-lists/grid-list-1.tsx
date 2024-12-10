import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { dayjs } from '@/lib/dayjs';

interface Post {
  id: string;
  title: string;
  description: string;
  cover: string;
  category: string;
  author: { avatar?: string; name: string };
  readTime: string;
  publishedAt: Date;
}

const posts = [
  {
    id: 'POST-003',
    title: 'Why I Still Lisp, and You Should Too',
    description:
      'Aliquam dapibus elementum nulla at malesuada. Ut mi nisl, aliquet non mollis vel, feugiat non nibh. Vivamus sit amet tristique dui. Praesent in bibendum arcu, at placerat augue. Nam varius fermentum diam, at tristique libero ultrices non. Praesent scelerisque diam vitae posuere dignissim. In et purus ac sapien posuere accumsan sit amet id diam. Pellentesque sit amet nulla ante. Maecenas nec leo vitae quam volutpat pretium id vitae augue.',
    cover: '/assets/image-business-1.png',
    category: 'Programming',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    readTime: '5 min',
    publishedAt: dayjs().subtract(16, 'second').subtract(45, 'minute').toDate(),
  },
  {
    id: 'POST-002',
    title: 'Scrum Has Hit the Glass Ceiling',
    description:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi in turpis ac quam luctus interdum. Nullam ac lorem ligula. Integer sed massa bibendum, blandit ipsum et, iaculis augue. Curabitur nec enim eget dolor tincidunt posuere eget nec dolor. Ut ullamcorper dignissim arcu vel laoreet. Sed ligula dolor, vulputate quis eros ac, maximus pharetra orci. Aenean lobortis volutpat vehicula. Suspendisse vel nunc enim. Cras ultrices metus libero, non aliquam diam condimentum vel. Vestibulum arcu leo, consectetur id diam a, semper elementum odio. Proin eleifend volutpat sapien tempor bibendum. Etiam sagittis nulla sit amet aliquam sollicitudin.',
    cover: '/assets/image-minimal-1.png',
    category: 'Productivity',
    author: { name: 'Omar Darobe', avatar: '/assets/avatar-11.png' },
    readTime: '6 min',
    publishedAt: dayjs().subtract(29, 'second').subtract(51, 'minute').subtract(6, 'hour').toDate(),
  },
  {
    id: 'POST-001',
    title: 'How Model View Controller (MVC) Architectures Work',
    description:
      'Praesent eget leo mauris. Morbi ac vulputate nibh. In hac habitasse platea dictumst. Praesent fermentum lacus eleifend erat cursus, congue rhoncus mi porta. Mauris rhoncus mollis nisl, vitae tempus tortor. Proin sit amet feugiat felis. Donec nunc urna, pretium sed viverra vel, blandit at urna. Integer pharetra placerat mauris, at fringilla arcu dignissim a. Morbi nec fermentum purus. Integer vel justo interdum lectus euismod bibendum.',
    cover: '/assets/image-business-2.png',
    category: 'Entrepreneurs',
    author: { name: 'Siegbert Gottfried', avatar: '/assets/avatar-2.png' },
    readTime: '3 min',
    publishedAt: dayjs().subtract(6, 'second').subtract(46, 'minute').subtract(16, 'hour').toDate(),
  },
] satisfies Post[];

export function GridList1(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid key={post.id} md={4} sm={6} xs={12}>
            <Card sx={{ height: '100%' }}>
              <Stack spacing={2} sx={{ p: 2 }}>
                <Box sx={{ pt: 'calc(100% * 4 / 4)', position: 'relative' }}>
                  <CardMedia
                    image={post.cover}
                    sx={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}
                  />
                </Box>
                <div>
                  <Chip label={post.category} variant="outlined" />
                </div>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar src={post.author.avatar} />
                  <div>
                    <Typography variant="subtitle2">{post.author.name}</Typography>
                    <Typography color="text.secondary" variant="caption">
                      {dayjs(post.publishedAt).format('MMM D')} · {post.readTime} read
                    </Typography>
                  </div>
                </Stack>
                <Stack spacing={1}>
                  <Link color="text.primary" variant="h6">
                    {post.title}
                  </Link>
                  <Typography
                    color="text.secondary"
                    sx={{
                      height: '72px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                    }}
                    variant="body1"
                  >
                    {post.description}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
