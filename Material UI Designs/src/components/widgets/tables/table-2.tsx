'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { dayjs } from '@/lib/dayjs';
import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

interface Project {
  id: string;
  name: string;
  technologies: string[];
  author: { name: string; avatar?: string };
  currency: string;
  budget: number;
  createdAt: Date;
}

const projects = [
  {
    id: 'PRJ-005',
    name: 'Mella Full Screen Slider',
    technologies: ['angular'],
    author: { name: 'Jie Yan', avatar: '/assets/avatar-8.png' },
    currency: 'USD',
    budget: 12500,
    createdAt: dayjs().subtract(10, 'seconds').subtract(34, 'minute').subtract(2, 'hour').toDate(),
  },
  {
    id: 'PRJ-004',
    name: 'Overview Design',
    technologies: ['sketch', 'html-css'],
    author: { name: 'Omar Darobe', avatar: '/assets/avatar-11.png' },
    currency: 'USD',
    budget: 15750,
    createdAt: dayjs().subtract(25, 'seconds').subtract(56, 'minute').subtract(10, 'hour').toDate(),
  },
  {
    id: 'PRJ-003',
    name: 'Ten80 Web Design',
    technologies: ['react-js'],
    author: { name: 'Siegbert Gottfried', avatar: '/assets/avatar-2.png' },
    currency: 'USD',
    budget: 15750,
    createdAt: dayjs().subtract(50, 'seconds').subtract(30, 'minute').subtract(1, 'day').toDate(),
  },
  {
    id: 'PRJ-002',
    name: 'Neura e-commerce UI Kit',
    technologies: ['vue-js'],
    author: { name: 'Iulia Albu', avatar: '/assets/avatar-6.png' },
    currency: 'USD',
    budget: 12500,
    createdAt: dayjs().subtract(30, 'second').subtract(4, 'minute').subtract(1, 'day').toDate(),
  },
  {
    id: 'PRJ-001',
    name: 'Administrator Overview',
    technologies: ['angular', 'figma'],
    author: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg' },
    currency: 'USD',
    budget: 15750,
    createdAt: dayjs().subtract(6, 'second').subtract(11, 'minute').subtract(1, 'day').toDate(),
  },
] satisfies Project[];

const technologyIcons: Record<string, string> = {
  'html-css': '/assets/logo-html.svg',
  'react-js': '/assets/logo-react-js.svg',
  'vue-js': '/assets/logo-vue-js.svg',
  angular: '/assets/logo-angular.svg',
  figma: '/assets/logo-figma.svg',
  sketch: '/assets/logo-sketch.svg',
};

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {row.name}
      </Typography>
    ),
    name: 'Title',
    width: '250px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar src={row.author.avatar} />
        <Typography sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
          {row.author.name}
        </Typography>
      </Stack>
    ),
    name: 'Author',
    width: '150px',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.budget);
    },
    name: 'Budget',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {row.technologies.map((technology) => (
          <Box component="span" key={technology}>
            <Box
              alt="Tech"
              component="img"
              key={technology}
              src={technologyIcons[technology]}
              sx={{ height: 'auto', width: '30px' }}
            />
          </Box>
        ))}
      </Stack>
    ),
    name: 'Technologies',
    width: '200px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {dayjs(row.createdAt).format('MMM D, YYYY')}
      </Typography>
    ),
    name: 'Created At',
    width: '150px',
    align: 'right',
  },
] satisfies ColumnDef<Project>[];

export function Table2(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Latest projects"
        />
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Project> columns={columns} rows={projects} />
        </Box>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" endIcon={<CaretRightIcon />} size="small">
            See all
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
