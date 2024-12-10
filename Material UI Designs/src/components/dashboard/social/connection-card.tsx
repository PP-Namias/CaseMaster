import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

export interface Connection {
  id: string;
  avatar?: string;
  commonContacts: number;
  name: string;
  status: 'connected' | 'not_connected' | 'pending' | 'rejected';
}

export interface ConnectionCardProps {
  connection: Connection;
}

export function ConnectionCard({ connection }: ConnectionCardProps): React.JSX.Element {
  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'space-between', p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Avatar src={connection.avatar} sx={{ '--Avatar-size': '56px', cursor: 'pointer' }} />
          <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
            <div>
              <Link color="text.primary" variant="subtitle2">
                {connection.name}
              </Link>
              <Typography color="text.secondary" variant="body2">
                {connection.commonContacts} connections in common
              </Typography>
            </div>
            <div>
              {connection.status === 'not_connected' ? <Button size="small">Connect</Button> : null}
              {connection.status === 'pending' ? (
                <Button color="secondary" size="small">
                  Pending
                </Button>
              ) : null}
            </div>
          </Stack>
        </Stack>
        <IconButton>
          <DotsThreeIcon weight="bold" />
        </IconButton>
      </Stack>
    </Card>
  );
}
