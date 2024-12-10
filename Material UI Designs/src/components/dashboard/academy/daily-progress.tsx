'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RadialBar, RadialBarChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface DailyProgressProps {
  timeCurrent: number;
  timeGoal: number;
}

export function DailyProgress({ timeCurrent, timeGoal }: DailyProgressProps): React.JSX.Element {
  const chartSize = 250;

  const timeLeft = timeGoal - timeCurrent;
  const progress = Math.round((timeCurrent / timeGoal) * 100);

  const data = [
    { name: 'Empty', value: 100 },
    { name: 'Usage', value: progress },
  ] satisfies { name: string; value: number }[];

  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex' }}>
            <NoSsr fallback={<Box sx={{ height: `${chartSize}px` }} />}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'relative',
                  // hide the empty bar
                  '& .recharts-layer path[name="Empty"]': { display: 'none' },
                  '& .recharts-layer .recharts-radial-bar-background-sector': {
                    fill: 'var(--mui-palette-neutral-100)',
                  },
                }}
              >
                <RadialBarChart
                  barSize={20}
                  data={data}
                  endAngle={-10}
                  height={chartSize}
                  innerRadius={166}
                  startAngle={190}
                  width={chartSize}
                >
                  <RadialBar
                    animationDuration={300}
                    background
                    cornerRadius={10}
                    dataKey="value"
                    endAngle={-320}
                    fill="var(--mui-palette-primary-main)"
                    startAngle={20}
                  />
                </RadialBarChart>
                <Box
                  sx={{
                    alignItems: 'center',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  }}
                >
                  <Box sx={{ textAlign: 'center', mt: '-50px' }}>
                    <Typography variant="subtitle1">Time left</Typography>
                    <Typography variant="body2">{timeLeft} min</Typography>
                  </Box>
                </Box>
              </Box>
            </NoSsr>
          </Box>
          <Box sx={{ mt: '-80px' }}>
            <Typography variant="h6">Today&apos;s progress of your {timeGoal}-minutes goal</Typography>
            <Typography color="text.secondary" variant="body2">
              You have used{' '}
              {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(progress / 100)} of
              your available spots. Upgrade plan to create more projects.
            </Typography>
          </Box>
          <div>
            <Button variant="contained">Continue: React and Redux Tutorial</Button>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
