import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

interface Contact {
  id: string;
  name: string;
  avatar?: string;
  commonContacts: number;
  status: string;
}

const contacts = [
  {
    id: 'USR-010',
    name: 'Alcides Antonio',
    avatar: '/assets/avatar-10.png',
    commonContacts: 5,
    status: 'Not Connected',
  },
  { id: 'USR-003', name: 'Cj Juliane', avatar: '/assets/CJ.jpg', commonContacts: 10, status: 'Rejected' },
  { id: 'USR-005', name: 'Fran Perez', avatar: '/assets/avatar-5.png', commonContacts: 8, status: 'Pending' },
] satisfies Contact[];

export function GridList6(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Stack spacing={3}>
        {contacts.map((contact) => (
          <Card key={contact.id}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', p: 2 }}>
              <Avatar src={contact.avatar} sx={{ '--Avatar-size': '60px' }} />
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
                <div>
                  <Link color="text.primary" variant="subtitle1">
                    {contact.name}
                  </Link>
                  <Typography color="text.secondary" variant="body2">
                    {contact.commonContacts} connections in common
                  </Typography>
                </div>
                <div>
                  <Button color="secondary" size="small">
                    Connect
                  </Button>
                </div>
              </Stack>
              <IconButton>
                <DotsThreeIcon weight="bold" />
              </IconButton>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
