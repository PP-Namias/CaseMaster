import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '../../types/metadata';
import { config } from '../../config';
import { Members } from '../../components/dashboard/settings/members';

const metadata = { title: `Team | Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack spacing={4}>
        <div>
          <Typography variant="h4">Staff Management</Typography>
        </div>
        <Members
          members={[
            {
              id: 'USR-000',
              name: 'PP Namias',
              avatar: '/assets/avatar.jpg',
              email: 'pp.namias@gmail.com',
              role: 'Owner',
            },
            {
              id: 'USR-001',
              name: 'Raymond Palomares',
              avatar: '/assets/avatar-2.png',
              email: 'raymond.palomares@gmail.com',
              role: 'Active',
            },
            {
              id: 'USR-003',
              name: 'CJ Juliane',
              avatar: '/assets/CJ.jpg',
              email: 'cj.juliane@gmail.com',
              role: 'Inactive',
            },
            {
              id: 'USR-004',
              name: 'Yvez Cabudsan',
              avatar: '/assets/yvez.jpg',
              email: 'yvez.cabudsan@gmail.com',
              role: 'Pending',
            },
          ]}
        />
      </Stack>
    </React.Fragment>
  );
}
