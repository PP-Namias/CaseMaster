'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Cpu as CpuIcon } from '@phosphor-icons/react/dist/ssr/Cpu';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Lightning as LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';
import { RadialBar, RadialBarChart } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

export interface AppLimitsProps {
  usage: number;
}

export function AppLimits({ usage }: AppLimitsProps): React.JSX.Element {
  const chartSize = 240;

  const data = [
    { name: 'Empty', value: 100 },
    { name: 'Usage', value: usage },
  ] satisfies { name: string; value: number }[];

  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <CpuIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="App limits"
      />
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <NoSsr fallback={<Box sx={{ height: `${chartSize}px` }} />}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                // hide the empty bar
                '& .recharts-layer path[name="Empty"]': { display: 'none' },
                '& .recharts-layer .recharts-radial-bar-background-sector': { fill: 'var(--mui-palette-neutral-100)' },
              }}
            >
              <RadialBarChart
                barSize={24}
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
                <Box sx={{ textAlign: 'center', mt: '-40px' }}>
                  <Typography variant="h5">
                    {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(usage / 100)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </NoSsr>
        </Box>
        <Stack spacing={2} sx={{ mt: '-80px', textAlign: 'center' }}>
          <Typography variant="h6">You&apos;ve almost reached your limit</Typography>
          <Typography color="text.secondary" variant="body2">
            You have used{' '}
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(usage / 100)} of your
            available spots. Upgrade plan to create more projects.
          </Typography>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button color="secondary" startIcon={<LightningIcon />} variant="contained">
          Upgrade plan
        </Button>
      </CardActions>
    </Card>
  );
}
