import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '../../types/metadata';
import { config } from '../../config';
import dayjs from 'dayjs';
import { LoginHistory } from '../../components/dashboard/settings/login-history';

const metadata = { title: `Security | Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack spacing={4}>
        <div>
          <Typography variant="h4">System Logs</Typography>
          <Typography variant="h4">View your personal details here.</Typography>
        </div>
        <Stack spacing={4}>
          <LoginHistory
            events={[
              {
                id: 'EV-002',
                type: 'Imported RCT-003 to Case Tracker',
                user: 'Gwyneth Uy',
                userAgent: 'Chrome, Windows 10 A70F8C9A-731F-4110-BBFD-BBB1AA89E923',
                createdAt: dayjs().subtract(1, 'day').subtract(1, 'hour').subtract(5, 'minute').toDate(),
              },
              {
                id: 'EV-001',
                type: 'Deleted RCT-059 from Case Tracker',
                user: 'Gwyneth Uy',
                userAgent: 'Chrome, Windows 10 A70F8C9A-731F-4110-BBFD-BBB1AA89E923',
                createdAt: dayjs().subtract(1, 'day').subtract(1, 'hour').subtract(25, 'minute').toDate(),
              },
              {
                id: 'EV-001',
                type: 'Imported RCT-001 to Case Tracker',
                user: 'Gwyneth Uy',
                userAgent: 'Chrome, Windows 10 A70F8C9A-731F-4110-BBFD-BBB1AA89E923',
                createdAt: dayjs().subtract(1, 'day').subtract(1, 'hour').subtract(25, 'minute').toDate(),
              },
            ]}
          />
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
