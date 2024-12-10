import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { SplitLayout } from '@/components/auth/split-layout';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const metadata: Metadata = { title: `Sign in | Samples | Auth | ${config.site.name}` };

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SplitLayout>
        <Stack spacing={4}>
          <div>
            <Link
              color="text.primary"
              component={RouterLink}
              href={paths.dashboard.overview}
              sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
              variant="subtitle2"
            >
              <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
              Dashboard
            </Link>
          </div>
          <div>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
              <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
            </Box>
          </div>
          <Stack spacing={1}>
            <Typography variant="h5">Sign in</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? <Link variant="subtitle2">Sign up</Link>
            </Typography>
          </Stack>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <FormControl>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput name="email" type="email" />
              </FormControl>
              <FormControl>
                <InputLabel>Password</InputLabel>
                <OutlinedInput name="password" type="password" />
              </FormControl>
              <Button type="submit" variant="contained">
                Sign in
              </Button>
            </Stack>
            <div>
              <Link variant="subtitle2">Forgot password?</Link>
            </div>
          </Stack>
        </Stack>
      </SplitLayout>
    </React.Fragment>
  );
}
