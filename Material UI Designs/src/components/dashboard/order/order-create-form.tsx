'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
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
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface LineItem {
  id: string;
  product: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

function calculateSubtotal(lineItems: LineItem[]): number {
  const subtotal = lineItems.reduce((acc, lineItem) => acc + lineItem.quantity * lineItem.unitPrice, 0);
  return parseFloat(subtotal.toFixed(2));
}

function calculateTotalWithoutTaxes(subtotal: number, discount: number, shippingRate: number): number {
  return subtotal - discount + shippingRate;
}

function calculateTax(totalWithoutTax: number, taxRate: number): number {
  const tax = totalWithoutTax * (taxRate / 100);
  return parseFloat(tax.toFixed(2));
}

function calculateTotal(totalWithoutTax: number, taxes: number): number {
  return totalWithoutTax + taxes;
}

// You could memoize this function to avoid re-creating the columns on every render.
function getLineItemColumns({ onEdit }: { onEdit?: (lineItemId: string) => void }): ColumnDef<LineItem>[] {
  return [
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                backgroundImage: `url(${row.image})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                bgcolor: 'var(--mui-palette-background-level2)',
                borderRadius: 1,
                flex: '0 0 auto',
                height: '40px',
                width: '40px',
              }}
            />
            <Typography variant="subtitle2">{row.product}</Typography>
          </Stack>
        );
      },
      name: 'Product',
      width: '220px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Typography variant="inherit">{new Intl.NumberFormat('en-US').format(row.quantity)}</Typography>
      ),
      name: 'Quantity',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <Typography variant="inherit">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(row.unitPrice)}
        </Typography>
      ),
      name: 'Unit Price',
      width: '100px',
    },
    {
      formatter: (row): React.JSX.Element => (
        <IconButton
          onClick={() => {
            onEdit?.(row.id);
          }}
        >
          <PencilSimpleIcon />
        </IconButton>
      ),
      name: 'Actions',
      hideName: true,
      width: '100px',
      align: 'right',
    },
  ];
}

const schema = zod.object({
  number: zod.string().max(255),
  issueDate: zod.date(),
  customer: zod.string().min(1, 'Customer is required').max(255),
  billingAddress: zod.object({
    country: zod.string().min(1, 'Country is required').max(255),
    state: zod.string().min(1, 'State is required').max(255),
    city: zod.string().min(1, 'City is required').max(255),
    zipCode: zod.string().min(1, 'Zip code is required').max(255),
    line1: zod.string().min(1, 'Street line 1 is required').max(255),
    line2: zod.string().max(255).optional(),
  }),
  taxId: zod.string().max(255).optional(),
  deliveryNotes: zod.string().max(255).optional(),
  lineItems: zod.array(
    zod.object({
      id: zod.string(),
      product: zod.string().max(255),
      image: zod.string(),
      quantity: zod.number().min(1, 'Quantity must be greater than or equal to 1'),
      unitPrice: zod.number().min(0, 'Unit price must be greater than or equal to 0'),
    })
  ),
  discount: zod
    .number()
    .min(0, 'Discount must be greater than or equal to 0')
    .max(100, 'Discount must be less than or equal to 100'),
  shippingRate: zod.number().min(0, 'Shipping rate must be greater than or equal to 0'),
  taxRate: zod
    .number()
    .min(0, 'Tax rate must be greater than or equal to 0')
    .max(100, 'Tax rate must be less than or equal to 100'),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  number: 'ORD-001',
  issueDate: new Date(),
  customer: '',
  billingAddress: { country: '', state: '', city: '', zipCode: '', line1: '', line2: '' },
  taxId: '',
  deliveryNotes: '',
  lineItems: [
    { id: 'LI-001', product: 'Erbology Aloe Vera', image: '/assets/product-1.png', quantity: 1, unitPrice: 24 },
  ],
  discount: 0,
  shippingRate: 0,
  taxRate: 0,
} satisfies Values;

export function OrderCreateForm(): React.JSX.Element {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_: Values): Promise<void> => {
      try {
        // Make API request
        toast.success('Order created');
        navigate(paths.dashboard.orders.list);
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

  const lineItems = watch('lineItems');
  const discount = watch('discount');
  const shippingRate = watch('shippingRate');
  const taxRate = watch('taxRate');

  const subtotal = calculateSubtotal(lineItems);
  const totalWithoutTaxes = calculateTotalWithoutTaxes(subtotal, discount, shippingRate);
  const tax = calculateTax(totalWithoutTaxes, taxRate);
  const total = calculateTotal(totalWithoutTaxes, tax);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent>
          <Stack divider={<Divider />} spacing={4}>
            <Stack spacing={3}>
              <Typography variant="h6">Basic information</Typography>
              <Grid container spacing={3}>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="customer"
                    render={({ field }) => (
                      <FormControl error={Boolean(errors.customer)} fullWidth>
                        <InputLabel>Customer</InputLabel>
                        <OutlinedInput {...field} />
                        {errors.customer ? <FormHelperText>{errors.customer.message}</FormHelperText> : null}
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="number"
                    render={({ field }) => (
                      <FormControl disabled fullWidth>
                        <InputLabel>Number</InputLabel>
                        <OutlinedInput {...field} />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="issueDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="MMM D, YYYY"
                        label="Issue date"
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                        }}
                        slotProps={{
                          textField: {
                            error: Boolean(errors.issueDate),
                            fullWidth: true,
                            helperText: errors.issueDate?.message,
                          },
                        }}
                        value={dayjs(field.value)}
                      />
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
              <Stack spacing={3}>
                <div>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Same as billing address" />
                </div>
                <Controller
                  control={control}
                  name="deliveryNotes"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.deliveryNotes)} fullWidth>
                      <InputLabel>Delivery notes</InputLabel>
                      <OutlinedInput {...field} multiline placeholder="e.g Leave package at the door" rows={3} />
                      {errors.deliveryNotes ? <FormHelperText>{errors.deliveryNotes.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Stack>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Line items</Typography>
              <Stack spacing={2}>
                <Card sx={{ borderRadius: 1 }} variant="outlined">
                  <DataTable<LineItem> columns={getLineItemColumns({})} rows={lineItems} />
                </Card>
                <div>
                  <Button color="secondary" startIcon={<PlusCircleIcon />} variant="outlined">
                    Add item
                  </Button>
                </div>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              <Grid md={4} xs={12}>
                <Controller
                  control={control}
                  name="discount"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.discount)} fullWidth>
                      <InputLabel>Discount</InputLabel>
                      <OutlinedInput
                        {...field}
                        inputProps={{ step: 0.01 }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange('');
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type="number"
                      />
                      {errors.discount ? <FormHelperText>{errors.discount.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={4} xs={12}>
                <Controller
                  control={control}
                  name="shippingRate"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.shippingRate)} fullWidth>
                      <InputLabel>Shipping rate</InputLabel>
                      <OutlinedInput
                        {...field}
                        inputProps={{ step: 0.01 }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange('');
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        type="number"
                      />
                      {errors.shippingRate ? <FormHelperText>{errors.shippingRate.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
              <Grid md={4} xs={12}>
                <Controller
                  control={control}
                  name="taxRate"
                  render={({ field }) => (
                    <FormControl error={Boolean(errors.taxRate)} fullWidth>
                      <InputLabel>Tax rate (%)</InputLabel>
                      <OutlinedInput
                        {...field}
                        inputProps={{ step: 0.01 }}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          const value = event.target.valueAsNumber;

                          if (isNaN(value)) {
                            field.onChange('');
                            return;
                          }

                          if (value > 100) {
                            field.onChange(100);
                            return;
                          }

                          field.onChange(parseFloat(value.toFixed(2)));
                        }}
                        type="number"
                      />
                      {errors.taxRate ? <FormHelperText>{errors.taxRate.message}</FormHelperText> : null}
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Stack spacing={2} sx={{ width: '300px', maxWidth: '100%' }}>
                <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(subtotal)}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2">Discount</Typography>
                  <Typography variant="body2">
                    {discount
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(discount)
                      : '-'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">
                    {shippingRate
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(shippingRate)
                      : '-'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="body2">Taxes</Typography>
                  <Typography variant="body2">
                    {tax ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(tax) : '-'}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between' }}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="subtitle1">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total)}
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary">Cancel</Button>
          <Button type="submit" variant="contained">
            Create order
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
