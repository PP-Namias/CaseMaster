import * as React from 'react';
import Card from '@mui/material/Card';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface ReviewsSummaryProps {
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSummary({ averageRating, totalReviews }: ReviewsSummaryProps): React.JSX.Element {
  return (
    <Card variant="outlined">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, flexWrap: 'wrap', p: 3 }}
      >
        <Typography variant="subtitle2">Overall reviews</Typography>
        <Stack direction="row" divider={<span>•</span>} spacing={2} sx={{ alignItems: 'center' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Rating max={1} precision={0.1} readOnly value={averageRating / 5} />
            <Typography noWrap variant="subtitle2">
              {averageRating}/5
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            {totalReviews} reviews in total
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
