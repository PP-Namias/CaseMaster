import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

import type { Review } from './types';

export interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps): React.JSX.Element {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}
          >
            <Avatar src={review.author.avatar} />
            <Stack spacing={1}>
              <Typography variant="subtitle1">{review.title}</Typography>
              <Stack
                direction="row"
                divider={<span>•</span>}
                spacing={2}
                sx={{ alignItems: 'center', flexWrap: 'wrap' }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Rating max={1} precision={0.1} readOnly value={review.rating / 5} />
                  <Typography noWrap variant="subtitle2">
                    {review.rating}/5
                  </Typography>
                </Stack>
                <Typography noWrap variant="subtitle2">
                  {review.author.name}
                </Typography>
                <Typography color="text.secondary" noWrap variant="body2">
                  {dayjs(review.createdAt).fromNow()}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Typography variant="body1">{review.comment}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
