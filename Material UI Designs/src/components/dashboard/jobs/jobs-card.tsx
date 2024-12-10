import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

import type { Job } from './types';

export interface JobsCardProps {
  jobs?: Job[];
}

export function JobsCard({ jobs = [] }: JobsCardProps): React.JSX.Element {
  return (
    <Card variant="outlined">
      <Stack divider={<Divider />}>
        {jobs.map((job) => {
          const location = job.isRemote ? 'Remote possible' : `(${job.country}, ${job.state}, ${job.city})`;
          const salary = `${job.currency} ${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: job.currency,
            notation: 'compact',
          }).format(job.budgetMin)} - ${job.currency} ${new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: job.currency,
            notation: 'compact',
          }).format(job.budgetMax)}`;

          return (
            <Stack
              direction="row"
              key={job.id}
              sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', px: 2, py: 1.5 }}
            >
              <div>
                <Typography variant="subtitle1">{job.title}</Typography>
                <Typography color="text.secondary" variant="caption">
                  {location} • {salary}
                </Typography>
              </div>
              <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                <Typography color="text.secondary" variant="caption">
                  {dayjs(job.publishedAt).fromNow()}
                </Typography>
                <Button size="small">Apply</Button>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
}
