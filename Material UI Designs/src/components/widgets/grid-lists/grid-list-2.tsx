import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Heart as HeartIcon } from '@phosphor-icons/react/dist/ssr/Heart';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import { dayjs } from '@/lib/dayjs';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  type: string;
  author: { name: string; avatar?: string };
  currency: string;
  budget: number;
  isLiked: boolean;
  likes: number;
  rating: number;
  membersCount: number;
  createdAt: Date;
}

const projects = [
  {
    id: 'PRJ-003',
    title: 'Mella Full Screen Slider',
    description: 'Tools for the modern creative professional to bring your designs to life',
    image: '/assets/image-abstract-2.png',
    location: 'Europe',
    type: 'Full-Time',
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    currency: 'USD',
    budget: 6125,
    isLiked: true,
    likes: 7,
    rating: 5,
    membersCount: 2,
    createdAt: dayjs().subtract(24, 'minute').toDate(),
  },
  {
    id: 'PRJ-002',
    title: 'Overview Design',
    description: 'Redesign the overview pages to improve the experience for new users',
    image: '/assets/image-business-1.png',
    location: 'Europe',
    type: 'Full-Time',
    author: { name: 'Omar Darobe', avatar: '/assets/avatar-11.png' },
    budget: 4205,
    currency: 'USD',
    isLiked: true,
    likes: 12,
    rating: 4.5,
    membersCount: 3,
    createdAt: dayjs().subtract(1, 'hour').toDate(),
  },
  {
    id: 'PRJ-001',
    title: 'Ten80 Web Design',
    description: 'We are looking for a UX Designer to join our growing team',
    image: '/assets/image-minimal-2.png',
    location: 'Europe',
    type: 'Full-Time',
    author: { name: 'Siegbert Gottfried', avatar: '/assets/avatar-2.png' },
    currency: 'USD',
    budget: 2394,
    isLiked: true,
    likes: 18,
    rating: 4.7,
    membersCount: 8,
    createdAt: dayjs().subtract(16, 'hour').toDate(),
  },
] satisfies Project[];

export function GridList2(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid key={project.id} md={4} sm={6} xs={12}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Stack spacing={2} sx={{ flex: '1 1 auto', p: 2 }}>
                <CardMedia
                  image={project.image}
                  sx={{ bgcolor: 'var(--mui-palette-background-level2)', height: '200px' }}
                />
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <Avatar src={project.author.avatar} />
                  <div>
                    <Link color="text.primary" variant="subtitle1">
                      {project.title}
                    </Link>
                    <Typography color="text.secondary" variant="body2">
                      by{' '}
                      <Link color="text.primary" variant="subtitle2">
                        {project.author.name}
                      </Link>{' '}
                      | {dayjs(project.createdAt).fromNow()}
                    </Typography>
                  </div>
                </Stack>
                <Typography color="text.secondary" variant="body2">
                  {project.description}
                </Typography>
                <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Typography variant="subtitle2">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: project.currency }).format(
                        project.budget
                      )}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Budget
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">{project.location}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Location
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="subtitle2">{project.type}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Type
                    </Typography>
                  </div>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center', p: 2 }}>
                <Stack direction="row" spacing={2} sx={{ flex: '1 1 auto' }}>
                  <Stack direction="row" sx={{ alignItems: 'center' }}>
                    <Tooltip title="Unlike">
                      <IconButton>
                        <HeartIcon fill="var(--mui-palette-error-main)" weight="fill" />
                      </IconButton>
                    </Tooltip>
                    <Typography color="text.secondary" variant="subtitle2">
                      {project.likes}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <UsersIcon fontSize="var(--icon-fontSize-md)" />
                    <Typography color="text.secondary" variant="subtitle2">
                      {project.membersCount}
                    </Typography>
                  </Stack>
                </Stack>
                <Rating readOnly size="small" value={project.rating} />
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
