import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

interface Review {
  id: string;
  comment: string;
  rating: number;
  author: { name: string; avatar?: string };
  createdAt: Date;
}

const reviews = [
  {
    id: 'REV-003',
    comment: 'Great company, providing an awesome & easy to use product.',
    rating: 5,
    author: { name: 'Kendo Jenner', avatar: '/assets/yvez.jpg' },
    createdAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'REV-002',
    comment:
      "Not the best people managers, poor management skills, poor career development programs. Communication from corporate & leadership isn't always clear and is sometime one-sided. Low pay compared to FANG.",
    rating: 2,
    author: { name: 'Miron Vitold', avatar: '/assets/avatar-1.png' },
    createdAt: dayjs().subtract(4, 'hour').toDate(),
  },
  {
    id: 'REV-001',
    comment:
      'I have been working with this company full-time. Great for the work life balance. Cons, decentralized decision making process across the organization.',
    rating: 4,
    author: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg' },
    createdAt: dayjs().subtract(17, 'hour').toDate(),
  },
] satisfies Review[];

export function GroupedList9(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        {reviews.map((review) => (
          <Card key={review.id}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', py: 2, px: 3 }}>
              <Avatar src={review.author.avatar} />
              <div>
                <Link color="text.primary" variant="subtitle2">
                  {review.author.name}
                </Link>
                <Stack
                  direction="row"
                  divider={<Divider flexItem orientation="vertical" />}
                  spacing={1}
                  sx={{ alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                    <Rating readOnly value={5} />
                    <Typography variant="subtitle2">{review.rating}</Typography>
                  </Stack>
                  <Typography color="text.secondary" variant="body2">
                    <Link color="text.primary" variant="subtitle2">
                      Low budget
                    </Link>
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {dayjs(review.createdAt).fromNow()}
                  </Typography>
                </Stack>
              </div>
            </Stack>
            <Box sx={{ pb: 2, px: 3 }}>
              <Typography color="text.secondary" variant="body1">
                {review.comment}
              </Typography>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
