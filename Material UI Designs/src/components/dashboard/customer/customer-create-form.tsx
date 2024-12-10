'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

function fileToBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Error converting file to base64'));
    };
  });
}

const schema = zod.object({
  avatar: zod.string().optional(),
  name: zod.string().min(1, 'Name is required').max(255),
  email: zod.string().email('Must be a valid email').min(1, 'Email is required').max(255),
  phone: zod.string().min(1, 'Phone is required').max(15),
  company: zod.string().max(255),
  billingAddress: zod.object({
    country: zod.string().min(1, 'Country is required').max(255),
    state: zod.string().min(1, 'State is required').max(255),
    city: zod.string().min(1, 'City is required').max(255),
    zipCode: zod.string().min(1, 'Zip code is required').max(255),
    line1: zod.string().min(1, 'Street line 1 is required').max(255),
    line2: zod.string().max(255).optional(),
  }),
  taxId: zod.string().max(255).optional(),
  timezone: zod.string().min(1, 'Timezone is required').max(255),
  language: zod.string().min(1, 'Language is required').max(255),
  currency: zod.string().min(1, 'Currency is required').max(255),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  avatar: '',
  name: '',
  email: '',
  phone: '',
  company: '',
  billingAddress: { country: '', state: '', city: '', zipCode: '', line1: '', line2: '' },
  taxId: '',
  timezone: 'new_york',
  language: 'en',
  currency: 'USD',
} satisfies Values;

export function CustomerCreateForm(): React.JSX.Element {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_: Values): Promise<void> => {
      try {
        // Make API request
        toast.success('Customer updated');
        navigate(paths.dashboard.customers.details('1'));
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

  const avatarInputRef = React.useRef<HTMLInputElement>(null);
  const avatar = watch('avatar');

  const handleAvatarChange = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (file) {
        const url = await fileToBase64(file);
        setValue('avatar', url);
      }
    },
    [setValue]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Account information</Typography>
              <Grid container spacing={3}>
                <Grid xs={12}>
                  <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        border: '1px dashed var(--mui-palette-divider)',
                        borderRadius: '50%',
                        display: 'inline-flex',
                        p: '4px',
                      }}
                    >
                      <Avatar
                        src={avatar}
                        sx={{
                          '--Avatar-size': '100px',
                          '--Icon-fontSize': 'var(--icon-fontSize-lg)',
                          alignItems: 'center',
                          bgcolor: 'var(--mui-palette-background-level1)',
                          color: 'var(--mui-palette-text-primary)',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <CameraIcon fontSize="var(--Icon-fontSize)" />
                      </Avatar>
                    </Box>
                    <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                      <Typography variant="subtitle1">Avatar</Typography>
                      <Typography variant="caption">Min 400x400px, PNG or JPEG</Typography>
                      <Button
                        color="secondary"
                        onClick={() => {
                          avatarInputRef.current?.click();
                        }}
                        variant="outlined"
                      >
                        Select
                      </Button>
                      <input hidden onChange={handleAvatarChange} ref={avatarInputRef} type="file" />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.name)} fullWidth>
                        <InputLabel required>Name</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.email)} fullWidth>
                        <InputLabel required>Email address</InputLabel>
                        <OutlinedInput {...field} type="email" />
                        {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="phone"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.phone)} fullWidth>
                        <InputLabel required>Phone number</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.phone ? <FormHelperText>{errors.phone.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="company"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.company)} fullWidth>
                        <InputLabel>Company</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.company ? <FormHelperText>{errors.company.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Billing information</Typography>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="billingAddress.country"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.country)} fullWidth>
                        <InputLabel required>Country</InputLabel>
                        <Select {...field}>
                          <Option value="">Choose a country</Option>
                          <Option value="us">United States</Option>
                          <Option value="de">Germany</Option>
                          <Option value="es">Spain</Option>
                        </Select>
                        {errors.billingAddress?.country ? (
                          <FormHelperText>{errors.billingAddress?.country?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="billingAddress.state"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.state)} fullWidth>
                        <InputLabel required>State</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.state ? (
                          <FormHelperText>{errors.billingAddress?.state?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="billingAddress.city"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.city)} fullWidth>
                        <InputLabel required>City</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.city ? (
                          <FormHelperText>{errors.billingAddress?.city?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="billingAddress.zipCode"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.zipCode)} fullWidth>
                        <InputLabel required>Zip code</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.zipCode ? (
                          <FormHelperText>{errors.billingAddress?.zipCode?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="billingAddress.line1"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.billingAddress?.line1)} fullWidth>
                        <InputLabel required>Address</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.billingAddress?.line1 ? (
                          <FormHelperText>{errors.billingAddress?.line1?.message}</FormHelperText>
                        ) : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="taxId"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.taxId)} fullWidth>
                        <InputLabel>Tax ID</InputLabel>
                        <OutlinedInput {...field} placeholder="e.g EU372054390" />
                        {errors.taxId ? <FormHelperText>{errors.taxId.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Shipping information</Typography>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Same as billing address" />
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Additional information</Typography>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="timezone"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.timezone)} fullWidth>
                        <InputLabel required>Timezone</InputLabel>
                        <Select {...field}>
                          <Option value="">Select a timezone</Option>
                          <Option value="new_york">US - New York</Option>
                          <Option value="california">US - California</Option>
                          <Option value="london">UK - London</Option>
                        </Select>
                        {errors.timezone ? <FormHelperText>{errors.timezone.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="language"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.language)} fullWidth>
                        <InputLabel required>Language</InputLabel>
                        <Select {...field}>
                          <Option value="">Select a language</Option>
                          <Option value="en">English</Option>
                          <Option value="es">Spanish</Option>
                          <Option value="de">German</Option>
                        </Select>
                        {errors.language ? <FormHelperText>{errors.language.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="currency"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.currency)} fullWidth>
                        <InputLabel>Currency</InputLabel>
                        <Select {...field}>
                          <Option value="">Select a currency</Option>
                          <Option value="USD">USD</Option>
                          <Option value="EUR">EUR</Option>
                          <Option value="RON">RON</Option>
                        </Select>
                        {errors.currency ? <FormHelperText>{errors.currency.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink} href={paths.dashboard.customers.list}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create customer
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
