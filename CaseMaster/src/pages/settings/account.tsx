import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '../../types/metadata';
import { config } from '../../config';
import { AccountDetails } from '../../components/dashboard/settings/account-details';
import { DeleteAccount } from '../../components/dashboard/settings/delete-account';
import { PasswordForm } from '../../components/dashboard/settings/password-form';


const metadata = { title: `Account | Settings | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Stack spacing={4}>
        <div>
          <Typography variant="h4">Account</Typography>
        </div>
        <Stack spacing={4}>
          <AccountDetails />
          <PasswordForm />

          <DeleteAccount />
        </Stack>
      </Stack>
    </React.Fragment>
  );
}
