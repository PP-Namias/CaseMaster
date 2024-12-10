'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Lightning as LightningIcon } from '@phosphor-icons/react/dist/ssr/Lightning';
import { RadialBar, RadialBarChart } from 'recharts';

import { FileIcon } from '@/components/core/file-icon';
import { NoSsr } from '@/components/core/no-ssr';

const totals = [
  { extension: 'mp4', itemsCount: 25, label: 'MP4', size: '22.75 GB' },
  { extension: 'png', itemsCount: 591, label: 'PNG', size: '54.69 GB' },
  { extension: 'pdf', itemsCount: 95, label: 'PDF', size: '412.39 MB' },
  { itemsCount: 210, label: 'Other', size: '261.43 MB' },
] satisfies { extension?: string; itemsCount: number; label: string; size: string }[];

export function Stats(): React.JSX.Element {
  const chartSize = 300;

  const data = [
    { name: 'Empty', value: 100 },
    { name: 'Usage', value: 75 },
  ] satisfies { name: string; value: number }[];

  return (
    <Card>
      <CardHeader subheader="Upgrade before reaching it" title="Stats" />
      <CardContent>
        <Stack spacing={2}>
          <Stack sx={{ alignItems: 'center' }}>
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
                  barSize={32}
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
                    cornerRadius={16}
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
                    <Typography variant="h4">75 GB</Typography>
                  </Box>
                </Box>
              </Box>
            </NoSsr>
            <Box sx={{ mt: '-100px' }}>
              <Typography variant="h6">You&apos;ve almost reached your limit</Typography>
              <Typography color="text.secondary" variant="body2">
                You have used 75% of your available storage.
              </Typography>
            </Box>
          </Stack>
          <List disablePadding>
            {totals.map((total) => (
              <ListItem disableGutters key={total.label}>
                <ListItemIcon>
                  <FileIcon extension={total.extension} />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={<Typography variant="body2">{total.label}</Typography>}
                  secondary={
                    <Typography color="text.secondary" variant="caption">
                      {total.size} • {total.itemsCount} items
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
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
