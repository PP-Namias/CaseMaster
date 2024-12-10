'use client';

import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { sendPasswordResetEmail } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

import { getFirebaseAuth } from '@/lib/auth/firebase/client';

export interface ResetPasswordButtonProps {
  children: React.ReactNode;
  email?: string;
}

export function ResetPasswordButton({ children, email }: ResetPasswordButtonProps): React.JSX.Element {
  const [firebaseAuth] = React.useState<Auth>(getFirebaseAuth());

  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string>();

  const handle = React.useCallback(async (): Promise<void> => {
    if (!email) {
      return;
    }

    try {
      await sendPasswordResetEmail(firebaseAuth, email);
    } catch (err) {
      setSubmitError((err as { message: string }).message);
      setIsPending(false);
    }
  }, [firebaseAuth, email]);

  return (
    <Stack spacing={1}>
      {submitError ? <Alert color="error">{submitError}</Alert> : null}
      <Button disabled={!email || isPending} onClick={handle} variant="contained">
        {children}
      </Button>
      <Typography sx={{ textAlign: 'center' }} variant="body2">
        Wait a few minutes then try again
      </Typography>
    </Stack>
  );
}
