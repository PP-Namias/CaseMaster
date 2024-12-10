'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
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
import { PlusCircle as PlusCircleIcon } from '@phosphor-icons/react/dist/ssr/PlusCircle';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { logger } from '@/lib/default-logger';
import { Option } from '@/components/core/option';
import { toast } from '@/components/core/toaster';

interface LineItem {
  id: string;
  description: string;
  service: string;
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

const schema = zod
  .object({
    number: zod.string().max(255),
    issueDate: zod.date(),
    dueDate: zod.date(),
    customer: zod.string().min(1, 'Customer is required').max(255),
    taxId: zod.string().max(255).optional(),
    lineItems: zod.array(
      zod.object({
        id: zod.string(),
        description: zod.string().min(1, 'Description is required').max(255),
        service: zod.string().min(1, 'Service is required').max(255),
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
  })
  .refine((data) => data.issueDate < data.dueDate, {
    message: 'Due date should be greater than issue date',
    path: ['dueDate'],
  });

type Values = zod.infer<typeof schema>;

const defaultValues = {
  number: 'INV-001',
  issueDate: new Date(),
  dueDate: dayjs().add(1, 'month').toDate(),
  customer: '',
  taxId: '',
  lineItems: [{ id: 'LI-001', description: '', service: '', quantity: 1, unitPrice: 0 }],
  discount: 0,
  shippingRate: 0,
  taxRate: 0,
} satisfies Values;

export function InvoiceCreateForm(): React.JSX.Element {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_: Values): Promise<void> => {
      try {
        // Make API request
        toast.success('Invoice created');
        navigate(paths.dashboard.invoices.list);
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

  const handleAddLineItem = React.useCallback(() => {
    const lineItems = getValues('lineItems');

    setValue('lineItems', [
      ...lineItems,
      { id: `LI-${lineItems.length + 1}`, description: '', service: '', quantity: 1, unitPrice: 0 },
    ]);
  }, [getValues, setValue]);

  const handleRemoveLineItem = React.useCallback(
    (lineItemId: string) => {
      const lineItems = getValues('lineItems');

      setValue(
        'lineItems',
        lineItems.filter((lineItem) => lineItem.id !== lineItemId)
      );
    },
    [getValues, setValue]
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
                <Grid md={6} xs={12}>
                  <Controller
                    control={control}
                    name="dueDate"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        format="MMM D, YYYY"
                        label="Due date"
                        onChange={(date) => {
                          field.onChange(date?.toDate());
                        }}
                        slotProps={{
                          textField: {
                            error: Boolean(errors.dueDate),
                            fullWidth: true,
                            helperText: errors.dueDate?.message,
                          },
                        }}
                        value={dayjs(field.value)}
                      />
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
              <Typography variant="h6">Line items</Typography>
              <Stack divider={<Divider />} spacing={2}>
                {lineItems.map((lineItem, index) => (
                  <Stack direction="row" key={lineItem.id} spacing={3} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    <Controller
                      control={control}
                      name={`lineItems.${index}.description`}
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.lineItems?.[index]?.description)}
                          sx={{ flex: '1 1 auto', minWidth: '200px' }}
                        >
                          <InputLabel>Description</InputLabel>
                          <OutlinedInput {...field} />
                          {errors.lineItems?.[index]?.description ? (
                            <FormHelperText>{errors.lineItems[index]!.description!.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`lineItems.${index}.service`}
                      render={({ field }) => (
                        <FormControl
                          error={Boolean(errors.lineItems?.[index]?.service)}
                          sx={{ maxWidth: '100%', width: '200px' }}
                        >
                          <InputLabel>Service</InputLabel>
                          <Select {...field}>
                            <Option value="">Select a service</Option>
                            <Option value="design">Design</Option>
                            <Option value="development">Development</Option>
                          </Select>
                          {errors.lineItems?.[index]?.service ? (
                            <FormHelperText>{errors.lineItems[index]!.service!.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`lineItems.${index}.quantity`}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.lineItems?.[index]?.quantity)} sx={{ width: '140px' }}>
                          <InputLabel>Quantity</InputLabel>
                          <OutlinedInput
                            {...field}
                            inputProps={{ step: 1 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                              const value = event.target.valueAsNumber;

                              if (isNaN(value)) {
                                field.onChange('');
                                return;
                              }

                              if (value > 100) {
                                return;
                              }

                              field.onChange(parseInt(event.target.value));
                            }}
                            type="number"
                          />
                          {errors.lineItems?.[index]?.quantity ? (
                            <FormHelperText>{errors.lineItems[index]!.quantity!.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`lineItems.${index}.unitPrice`}
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.lineItems?.[index]?.unitPrice)} sx={{ width: '140px' }}>
                          <InputLabel>Unit price</InputLabel>
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
                          {errors.lineItems?.[index]?.unitPrice ? (
                            <FormHelperText>{errors.lineItems[index]!.unitPrice!.message}</FormHelperText>
                          ) : null}
                        </FormControl>
                      )}
                    />
                    <IconButton
                      onClick={() => {
                        handleRemoveLineItem(lineItem.id);
                      }}
                      sx={{ alignSelf: 'flex-end' }}
                    >
                      <TrashIcon />
                    </IconButton>
                  </Stack>
                ))}
                <div>
                  <Button
                    color="secondary"
                    onClick={handleAddLineItem}
                    startIcon={<PlusCircleIcon />}
                    variant="outlined"
                  >
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
            Create invoice
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
