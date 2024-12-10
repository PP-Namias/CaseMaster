'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';

const data = [
  { name: 'Linkedin', value: 15, color: 'var(--mui-palette-primary-main)' },
  { name: 'Facebook', value: 10, color: 'var(--mui-palette-warning-main)' },
  { name: 'Instagram', value: 25, color: 'var(--mui-palette-success-main)' },
  { name: 'Twitter', value: 50, color: 'var(--mui-palette-error-main)' },
] satisfies { name: string; value: number; color: string }[];

export function Chart10(): React.JSX.Element {
  const chartSize = 200;
  const chartTickness = 30;

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card>
          <CardHeader
            action={
              <IconButton>
                <InfoIcon />
              </IconButton>
            }
            title="Social media sources"
          />
          <CardContent>
            <Stack direction="row" spacing={6}>
              <NoSsr fallback={<Box sx={{ height: `${chartSize}px`, width: `${chartSize}px` }} />}>
                <PieChart height={chartSize} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} width={chartSize}>
                  <Pie
                    animationDuration={300}
                    cx={chartSize / 2}
                    cy={chartSize / 2}
                    data={data}
                    dataKey="value"
                    endAngle={-270}
                    innerRadius={chartSize / 2 - chartTickness}
                    nameKey="name"
                    outerRadius={chartSize / 2}
                    startAngle={90}
                    strokeWidth={0}
                  >
                    {data.map(
                      (entry): React.JSX.Element => (
                        <Cell fill={entry.color} key={entry.name} />
                      )
                    )}
                  </Pie>
                  <Tooltip animationDuration={50} content={<TooltipContent />} />
                </PieChart>
              </NoSsr>
              <List disablePadding>
                {data.map((entry) => (
                  <ListItem disableGutters key={entry.name}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Box sx={{ bgcolor: entry.color, borderRadius: '2px', height: '4px', width: '16px' }} />
                      <Typography variant="subtitle1">{entry.name}</Typography>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </CardContent>
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
                {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                  entry.value / 100
                )}
              </Typography>
            </Stack>
          )
        )}
      </Stack>
    </Paper>
  );
}
