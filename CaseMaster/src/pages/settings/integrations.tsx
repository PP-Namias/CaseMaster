import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '../../types/metadata';
import { config } from '../../config';
import { Integrations } from '../../components/dashboard/settings/integrations';

const metadata = { title: `Integrations | Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack spacing={4}>
        <div>
          <Typography variant="h4">Integrations</Typography>
        </div>
        <Integrations
          integrations={[
            {
              id: 'vercel',
              name: 'Vercel',
              icon: '/assets/company-Namias.png',
              description: 'See your usage and manage your apps',
              installed: false,
            },
            {
              id: 'auth0',
              name: 'Auth0',
              icon: '/assets/company-CJ.jpg',
              description: 'Manage your users and roles with Auth0',
              installed: false,
            },
            {
              id: 'google_calendar',
              name: 'Google Calendar',
              icon: '/assets/company-avatar-2.png',
              description: 'Add your personal calendar right into the app',
              installed: false,
            },
            {
              id: 'stripe',
              name: 'Stripe',
              icon: '/assets/company-avatar-1.png',
              description: 'See your Stripe balance and manage your products',
              installed: false,
            },
          ]}
        />
      </Stack>
    </React.Fragment>
  );
}
