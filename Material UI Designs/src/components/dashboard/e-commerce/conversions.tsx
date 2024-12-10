'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';

export interface ConversionsProps {
  data: { name: string; value: number }[];
}

export function Conversions({ data }: ConversionsProps): React.JSX.Element {
  const total = data.reduce((acc, { value }) => acc + value, 0);

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <ChartPieIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Conversions"
      />
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Stack spacing={3} sx={{ flex: '0 0 auto', justifyContent: 'space-between', width: '260px' }}>
            <Stack spacing={2}>
              <Typography color="success.main" variant="h2">
                +5%
              </Typography>
              <Typography color="text.secondary">increase in conversions compared to last year</Typography>
            </Stack>
            <div>
              <Typography color="text.secondary" variant="body2">
                <Typography color="primary.main" component="span" variant="subtitle2">
                  This year
                </Typography>{' '}
                is forecasted to increase in your conversion by 0.5% the end of the current year.
              </Typography>
            </div>
          </Stack>
          <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
            {data.map((entry) => (
              <div key={entry.name}>
                <Typography variant="subtitle1">{entry.name}</Typography>
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                  <LinearProgress
                    sx={{ flex: '1 1 auto', height: '6px' }}
                    value={(entry.value / total) * 100}
                    variant="determinate"
                  />
                  <Typography variant="body2">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD',
                      maximumFractionDigits: 0,
                    }).format(entry.value)}
                  </Typography>
                </Stack>
              </div>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
