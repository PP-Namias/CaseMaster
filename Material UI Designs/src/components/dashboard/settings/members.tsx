import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

import type { Member } from './members-table';
import { MembersTable } from './members-table';

export interface MembersProps {
  members: Member[];
}

export function Members({ members }: MembersProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <UsersIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        subheader="View and manage your staff’s details here."
        title="Staff Management"
      />
      <CardContent>
        <Stack spacing={2}>
          <FormControl>
            <InputLabel>Email address</InputLabel>
            <OutlinedInput
              name="email"
              startAdornment={
                <InputAdornment position="start">
                  <EnvelopeSimpleIcon />
                </InputAdornment>
              }
              type="email"
            />
          </FormControl>
          <div>
            <Button variant="contained">Send invite</Button>
          </div>
        </Stack>
      </CardContent>
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <MembersTable rows={members} />
      </Box>
    </Card>
  );
}
