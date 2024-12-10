import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import type { User } from '@/types/user';

const user = {
  id: 'USR-000',
  name: 'PP Namias',
  avatar: '/assets/avatar.jpg',
  email: 'pp.namias@gmail.com',
} satisfies User;

export function CompanyReviewAdd(): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Avatar src={user.avatar} />
      <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
        <OutlinedInput multiline placeholder="Send your review" rows={3} />
        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
        >
          <Rating value={5} />
          <Button variant="contained">Send review</Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
