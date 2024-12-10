import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';
import { CompanyReviewAdd } from '@/components/dashboard/jobs/review-add';
import { ReviewCard } from '@/components/dashboard/jobs/review-card';
import { ReviewsSummary } from '@/components/dashboard/jobs/reviews-summary';
import type { Review } from '@/components/dashboard/jobs/types';

const reviews = [
  {
    id: 'REV-003',
    title: 'Great company, providing an awesome & easy to use product',
    comment:
      'I have been working with this company full-time. Great for the work life balance. Cons, decentralized decision making process across the organization.',
    rating: 3.8,
    author: { name: 'PP Namias', avatar: '/assets/avatar.jpg' },
    createdAt: dayjs().subtract(4, 'minute').subtract(4, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'REV-002',
    title: 'Friendly environment',
    comment:
      'Every day you learn something new - that is a typical day at work in Stripe. I am surrounded by supportive people, from different cultures, we have a strong and unified team and help each other whenever is needed. The most enjoyable part of the job is that you meet new people, experts on different disciplines that might help you in your work, but the hardest part of the job is that there are too many tools and systems to use.',
    rating: 3.4,
    author: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg' },
    createdAt: dayjs().subtract(17, 'minute').subtract(4, 'hour').subtract(5, 'day').toDate(),
  },
  {
    id: 'REV-001',
    title: 'Great company, providing an awesome & easy to use product',
    comment:
      'I have been working with this company full-time. Great for the work life balance. Cons, decentralized decision making process across the organization.',
    rating: 3.8,
    author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
    createdAt: dayjs().subtract(34, 'minute').subtract(5, 'hour').subtract(7, 'day').toDate(),
  },
] satisfies Review[];

export function Page(): React.JSX.Element {
  const averageRating = 3.66;

  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">Reviews</Typography>
      </div>
      <Stack spacing={3}>
        <ReviewsSummary averageRating={averageRating} totalReviews={reviews.length} />
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="secondary">Load more</Button>
        </Box>
        <CompanyReviewAdd />
      </Stack>
    </Stack>
  );
}
