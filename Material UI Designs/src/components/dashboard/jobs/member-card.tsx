import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { Member } from './types';

export interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps): React.JSX.Element {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Avatar src={member.avatar} />
            <div>
              <Typography variant="subtitle2">{member.name}</Typography>
              <Typography color="text.secondary" variant="body2">
                {member.role}
              </Typography>
            </div>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            {(member.skills ?? []).map((skill) => (
              <Chip key={skill} label={skill} size="small" variant="soft" />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
