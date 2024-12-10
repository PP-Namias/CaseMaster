'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { autoSignIn, confirmSignUp } from 'aws-amplify/auth';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';

const schema = zod.object({ confirmationCode: zod.string().min(1, { message: 'Code is required' }) });

type Values = zod.infer<typeof schema>;

const defaultValues = { confirmationCode: '' } satisfies Values;

export interface SignUpConfirmFormProps {
  email: string;
}

export function SignUpConfirmForm({ email }: SignUpConfirmFormProps): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try {
        const { nextStep } = await confirmSignUp({ username: email, confirmationCode: values.confirmationCode });

        if (nextStep.signUpStep === 'DONE') {
          // Unless you disabled `autoSignIn` in signUp
          // UserProvider will handle Router refresh
          // After refresh, GuestGuard will handle the redirect
          // Otherwise you should redirect to the sign in page.
          return;
        }

        if (nextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
          await autoSignIn();
          return;
        }

        throw new Error(`Unhandled next step: ${nextStep.signUpStep}`);
      } catch (err) {
        setError('root', { type: 'server', message: (err as { message: string }).message });
        setIsPending(false);
      }
    },
    [email, setError]
  );

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Typography variant="h5">Confirm your email</Typography>
      <Typography>
        We&apos;ve sent a verification email to{' '}
        <Typography component="span" variant="subtitle1">
          &quot;{email}&quot;
        </Typography>
        .
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="confirmationCode"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmationCode)}>
                <InputLabel>Confirmation code</InputLabel>
                <OutlinedInput {...field} />
                {errors.confirmationCode ? <FormHelperText>{errors.confirmationCode.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Confirm
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
