import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { UpdatePasswordForm } from '@/components/auth/firebase/update-password-form';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';

const metadata: Metadata = { title: `Update password | Firebase | Auth | ${config.site.name}` };

export function Page(): React.JSX.Element {
  const { oobCode } = useExtractSearchParams();

  if (!oobCode) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="error">Code is required</Alert>
      </Box>
    );
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <GuestGuard>
        <SplitLayout>
          <UpdatePasswordForm oobCode={oobCode} />
        </SplitLayout>
      </GuestGuard>
    </React.Fragment>
  );
}

function useExtractSearchParams(): { oobCode?: string } {
  const [searchParams] = useSearchParams();

  return { oobCode: searchParams.get('oobCode') || undefined };
}
