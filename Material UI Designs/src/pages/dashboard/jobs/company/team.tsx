import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { MemberCard } from '@/components/dashboard/jobs/member-card';
import type { Member } from '@/components/dashboard/jobs/types';

const members = [
  {
    id: 'USR-008',
    name: 'Jie Yan',
    avatar: '/assets/avatar-8.png',
    role: 'CEO & Co-founder',
    skills: ['JavaScript', 'React', 'Go'],
  },
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    role: 'CTO & Co-founder',
    skills: ['C', 'C++', 'Java'],
  },
  { id: 'USR-011', name: 'Omar Darboe', avatar: '/assets/avatar-11.png', role: 'CFO', skills: ['Go', 'Python'] },
] satisfies Member[];

export function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">Team ({members.length})</Typography>
      </div>
      <Grid container spacing={3}>
        {members.map((member) => (
          <Grid item key={member.id} sm={6} xs={12}>
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
