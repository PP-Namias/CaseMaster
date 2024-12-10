'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Bell as BellIcon } from '@phosphor-icons/react/dist/ssr/Bell';
import { RadialBar, RadialBarChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface VehiclesOverviewProps {
  data: { name: string; value: number; fill: string }[];
}

export function VehiclesOverview({ data }: VehiclesOverviewProps): React.JSX.Element {
  const chartSize = 260;
  const chartInnerRadius = 40;
  const dataWithEmpty = [{ name: 'Empty', value: 100 }, ...data];

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <BellIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Vehicles overview"
      />
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 3 }}>
        <Box sx={{ '& .recharts-layer path[name="Empty"]': { display: 'none' } }}>
          <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
            <RadialBarChart
              barSize={10}
              data={dataWithEmpty}
              endAngle={-360}
              height={chartSize}
              innerRadius={chartInnerRadius}
              startAngle={90}
              width={chartSize}
            >
              <RadialBar animationDuration={300} background cornerRadius={8} dataKey="value" />
            </RadialBarChart>
          </NoSsr>
        </Box>
        <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
          <div>
            <Typography color="text.secondary" variant="body2">
              Total
            </Typography>
            <Typography variant="h5">{total}</Typography>
          </div>
          <List disablePadding>
            {data.map((entry) => (
              <ListItem disableGutters key={entry.name}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto', minWidth: 0 }}>
                  <Box sx={{ bgcolor: entry.fill, borderRadius: '2px', height: '4px', width: '16px' }} />
                  <Typography color="text.secondary" variant="body2">
                    {entry.name}
                  </Typography>
                </Stack>
                <Typography variant="subtitle2">{entry.value}</Typography>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </Card>
  );
}
