'use client';

import * as React from 'react';
import { confirmResetPassword } from '@aws-amplify/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { DynamicLogo } from '@/components/core/logo';
import { toast } from '@/components/core/toaster';

import { ResetPasswordButton } from './reset-password-button';

const schema = zod
  .object({
    confirmationCode: zod.string().min(1, { message: 'Confirmation code is required' }),
    password: zod.string().min(6, { message: 'Password should be at least 6 characters' }),
    confirmPassword: zod.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = { confirmationCode: '', password: '', confirmPassword: '' } satisfies Values;

export interface UpdatePasswordFormProps {
  email: string;
}

export function UpdatePasswordForm({ email }: UpdatePasswordFormProps): React.JSX.Element {
  const navigate = useNavigate();

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
        await confirmResetPassword({
          username: email,
          newPassword: values.password,
          confirmationCode: values.confirmationCode,
        });
        toast.success('Password updated');
        navigate(paths.auth.cognito.signIn);
      } catch (err) {
        setError('root', { type: 'server', message: (err as { message: string }).message });
        setIsPending(false);
      }
    },
    [navigate, email, setError]
  );

  return (
    <Stack spacing={4}>
      <div>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-block', fontSize: 0 }}>
          <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} />
        </Box>
      </div>
      <Typography variant="h5">Update password</Typography>
      <Stack spacing={1}>
        <Typography>
          If an account exists with email{' '}
          <Typography component="span" variant="subtitle1">
            &quot;{email}&quot;
          </Typography>
          , you will receive a recovery email.
        </Typography>
        <div>
          <Link component={RouterLink} href={paths.auth.cognito.resetPassword} variant="subtitle2">
            Use another email
          </Link>
        </div>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="confirmationCode"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmationCode)}>
                <InputLabel>Confirmation Code</InputLabel>
                <OutlinedInput {...field} type="password" />
                {errors.confirmationCode ? <FormHelperText>{errors.confirmationCode.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>New password</InputLabel>
                <OutlinedInput {...field} type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <FormControl error={Boolean(errors.confirmPassword)}>
                <InputLabel>Confirm password</InputLabel>
                <OutlinedInput {...field} type="password" />
                {errors.confirmPassword ? <FormHelperText>{errors.confirmPassword.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            Update password
          </Button>
        </Stack>
      </form>
      <ResetPasswordButton email={email}>Resend</ResetPasswordButton>
    </Stack>
  );
}
