'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { dayjs } from '@/lib/dayjs';
import { NoSsr } from '@/components/core/no-ssr';

interface Page {
  path: string;
  views: number;
}

const pages = [
  { path: '/projects', views: 24 },
  { path: '/chat', views: 21 },
  { path: '/cart', views: 15 },
  { path: '/checkout', views: 8 },
] satisfies Page[];

interface Record {
  timestamp: number;
  value: number | null;
}

const records = [
  { timestamp: dayjs().subtract(27, 'second').valueOf(), value: null },
  { timestamp: dayjs().subtract(24, 'second').valueOf(), value: null },
  { timestamp: dayjs().subtract(21, 'second').valueOf(), value: null },
  { timestamp: dayjs().subtract(18, 'second').valueOf(), value: null },
  { timestamp: dayjs().subtract(15, 'second').valueOf(), value: null },
  { timestamp: dayjs().subtract(12, 'second').valueOf(), value: 151 },
  { timestamp: dayjs().subtract(9, 'second').valueOf(), value: 166 },
  { timestamp: dayjs().subtract(6, 'second').valueOf(), value: 160 },
  { timestamp: dayjs().subtract(3, 'second').valueOf(), value: null },
] satisfies Record[];

export function Chart8(): React.JSX.Element {
  const chartHeight = 200;

  const data = records.map((record) => ({ name: dayjs(record.timestamp).format('hh:mm:ss A'), value: record.value }));

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="xs">
        <Card>
          <CardHeader
            action={<Typography variant="h6">163</Typography>}
            subheader="Page views per second"
            title="Active users"
          />
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} />
                <XAxis axisLine={false} dataKey="name" tickLine={false} type="category" />
                <YAxis axisLine={false} hide type="number" />
                <Bar
                  animationDuration={300}
                  barSize={20}
                  dataKey="value"
                  fill="var(--mui-palette-primary-main)"
                  name="Users"
                />
                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          <List>
            {pages.map((page) => (
              <ListItem divider key={page.path} sx={{ justifyContent: 'space-between', py: 2 }}>
                <Typography variant="body2">{page.path}</Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {page.views}
                </Typography>
              </ListItem>
            ))}
          </List>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
              See all
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}

interface TooltipContentProps {
  active?: boolean;
  payload?: { name: string; dataKey: string; payload: { fill: string }; value: number }[];
  label?: string;
}

function TooltipContent({ active, payload }: TooltipContentProps): React.JSX.Element | null {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map(
          (entry): React.JSX.Element => (
            <Stack direction="row" key={entry.name} spacing={3} sx={{ alignItems: 'center' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                <Box sx={{ bgcolor: entry.payload.fill, borderRadius: '2px', height: '8px', width: '8px' }} />
                <Typography sx={{ whiteSpace: 'nowrap' }}>{entry.name}</Typography>
              </Stack>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US').format(entry.value)}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
