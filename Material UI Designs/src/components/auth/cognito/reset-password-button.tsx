'use client';

import * as React from 'react';
import { resetPassword } from '@aws-amplify/auth';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { toast } from '@/components/core/toaster';

export interface ResetPasswordButtonProps {
  children: React.ReactNode;
  email: string;
}

export function ResetPasswordButton({ children, email }: ResetPasswordButtonProps): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [submitError, setSubmitError] = React.useState<string>();

  const handle = React.useCallback(async (): Promise<void> => {
    setIsPending(true);
    setSubmitError(undefined);

    try {
      await resetPassword({ username: email });

      setIsPending(false);
      toast.success('Recovery code sent');
    } catch (err) {
      setSubmitError((err as { message: string }).message);
      setIsPending(false);
    }
  }, [email]);

  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Button disabled={isPending} onClick={handle}>
        {children}
      </Button>
      {submitError ? <Alert color="error">{submitError}</Alert> : null}
      <Typography sx={{ textAlign: 'center' }} variant="body2">
        Wait a few minutes then try again
      </Typography>
    </Stack>
  );
}
