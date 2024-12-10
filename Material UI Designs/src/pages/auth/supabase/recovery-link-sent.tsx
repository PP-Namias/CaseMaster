import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { ResetPasswordButton } from '@/components/auth/supabase/reset-password-button';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const metadata: Metadata = { title: `Recovery link sent | Supabase | Auth | ${config.site.name}` };

export function Page(): React.JSX.Element {
  const { email } = useExtractSearchParams();

  if (!email) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert color="error">Email is required</Alert>
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
          <Stack spacing={4}>
            <div>
              <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
                <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
              </Box>
            </div>
            <Typography variant="h5">Recovery link sent</Typography>
            <Stack spacing={1}>
              <Typography>
                If an account exists with email{' '}
                <Typography component="span" variant="subtitle1">
                  &quot;{email}&quot;
                </Typography>
                , you will receive a recovery email.
              </Typography>
              <div>
                <Link component={RouterLink} href={paths.auth.supabase.resetPassword} variant="subtitle2">
                  Use another email
                </Link>
              </div>
            </Stack>
            <ResetPasswordButton email={email}>Resend</ResetPasswordButton>
          </Stack>
        </SplitLayout>
      </GuestGuard>
    </React.Fragment>
  );
}

function useExtractSearchParams(): { email?: string } {
  const [searchParams] = useSearchParams();

  return { email: searchParams.get('email') || undefined };
}
