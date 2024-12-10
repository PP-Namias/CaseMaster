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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Info as InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';
import type { EditorEvents } from '@tiptap/react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import type { File } from '@/components/core/file-dropzone';
import { FileDropzone } from '@/components/core/file-dropzone';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { toast } from '@/components/core/toaster';

export interface Image {
  id: string;
  url: string;
  fileName: string;
}

export interface Product {
  id: string;
  name: string;
  handle?: string;
  category?: string;
  type: string;
  description: string;
  tags?: string;
  currency: string;
  price: number;
  images?: Image[];
  sku?: string;
  barcode?: string;
  quantity: number;
  backorder?: boolean;
  height?: number;
  width?: number;
  length?: number;
  weight?: number;
}

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

// You could memoize this function to avoid re-creating the columns on every render.
function getImageColumns({ onRemove }: { onRemove?: (imageId: string) => void }): ColumnDef<Image>[] {
  return [
    {
      formatter: (row): React.JSX.Element => {
        return (
          <Box
            sx={{
              backgroundImage: `url(${row.url})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              bgcolor: 'var(--mui-palette-background-level2)',
              borderRadius: 1,
              flex: '0 0 auto',
              height: '40px',
              width: '40px',
            }}
          />
        );
      },
      name: 'Image',
      width: '100px',
    },
    { field: 'fileName', name: 'File name', width: '300px' },
    {
      formatter: (row): React.JSX.Element => (
        <IconButton
          onClick={() => {
            onRemove?.(row.id);
          }}
        >
          <TrashIcon />
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
  name: zod.string().min(1, 'Name is required').max(255),
  handle: zod.string().max(255).optional(),
  category: zod.string().max(255).optional(),
  type: zod.string().max(255).optional(),
  description: zod.string().max(5000).optional(),
  tags: zod.string().max(255).optional(),
  currency: zod.string().min(1, 'Currency is required').max(255),
  price: zod.number().min(0, 'Price must be greater than or equal to 0'),
  images: zod.array(zod.object({ id: zod.string(), url: zod.string(), fileName: zod.string() })),
  sku: zod.string().max(255).optional(),
  barcode: zod.string().max(255).optional(),
  quantity: zod.number().min(0, 'Quantity must be greater than or equal to 0'),
  backorder: zod.boolean().optional(),
  height: zod.number().min(0, 'Height must be greater than or equal to 0').optional(),
  width: zod.number().min(0, 'Width must be greater than or equal to 0').optional(),
  length: zod.number().min(0, 'Length must be greater than or equal to 0').optional(),
  weight: zod.number().min(0, 'Weight must be greater than or equal to 0').optional(),
});

type Values = zod.infer<typeof schema>;

function getDefaultValues(product: Product): Values {
  return {
    name: product.name ?? '',
    handle: product.handle ?? '',
    category: product.category ?? '',
    type: product.type ?? 'physical',
    description: product.description ?? '',
    tags: product.tags ?? '',
    currency: product.currency ?? 'USD',
    price: product.price ?? 0,
    images: product.images ?? [],
    sku: product.sku ?? '',
    barcode: product.barcode ?? '',
    quantity: product.quantity ?? 0,
    backorder: product.backorder ?? false,
    height: product.height ?? 0,
    width: product.width ?? 0,
    length: product.length ?? 0,
    weight: product.weight ?? 0,
  };
}

export interface ProductEditFormProps {
  product: Product;
}

export function ProductEditForm({ product }: ProductEditFormProps): React.JSX.Element {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<Values>({ defaultValues: getDefaultValues(product), resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_: Values): Promise<void> => {
      try {
        // Make API request
        toast.success('Product updated');
        navigate(paths.dashboard.products.list);
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

  const handleImageDrop = React.useCallback(
    async (files: File[]) => {
      // Upload images to the server

      const images = await Promise.all(
        files.map(async (file) => {
          const url = await fileToBase64(file);

          return { id: `IMG-${Date.now()}`, url, fileName: file.name };
        })
      );

      setValue('images', [...getValues('images'), ...images]);
    },
    [getValues, setValue]
  );

  const handleImageRemove = React.useCallback(
    (imageId: string) => {
      setValue(
        'images',
        getValues('images').filter((image) => image.id !== imageId)
      );
    },
    [getValues, setValue]
  );

  const name = watch('name');
  const handle = watch('handle');
  const category = watch('category');
  const tags = watch('tags');
  const images = watch('images');
  const currency = watch('currency');
  const price = watch('price');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid md={8} xs={12}>
          <Card>
            <CardContent>
              <Stack divider={<Divider />} spacing={4}>
                <Stack spacing={3}>
                  <Typography variant="h6">Basic information</Typography>
                  <Grid container spacing={3}>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.name)} fullWidth>
                            <InputLabel required>Product name</InputLabel>
                            <OutlinedInput {...field} />
                            {errors.name ? <FormHelperText>{errors.name.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="handle"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.handle)} fullWidth>
                            <InputLabel>Handle</InputLabel>
                            <OutlinedInput {...field} />
                            {errors.handle ? <FormHelperText>{errors.handle.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.category)} fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select {...field}>
                              <Option value="">Select a category</Option>
                              <Option value="Healthcare">Healthcare</Option>
                              <Option value="Makeup">Makeup</Option>
                              <Option value="Skincare">Skincare</Option>
                            </Select>
                            {errors.category ? <FormHelperText error>{errors.category.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.type)} fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select {...field}>
                              <Option value="physical">Physical</Option>
                              <Option value="digital">Digital</Option>
                              <Option value="service">Service</Option>
                            </Select>
                            {errors.type ? <FormHelperText error>{errors.type.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        control={control}
                        name="description"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.description)} fullWidth>
                            <InputLabel>Description</InputLabel>
                            <Box sx={{ mt: '8px', '& .tiptap-container': { height: '400px' } }}>
                              <TextEditor
                                content={field.value ?? ''}
                                onUpdate={({ editor }: EditorEvents['update']) => {
                                  field.onChange(editor.getText());
                                }}
                                placeholder="Write something"
                              />
                            </Box>
                            {errors.description ? (
                              <FormHelperText error>{errors.description.message}</FormHelperText>
                            ) : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        control={control}
                        name="tags"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.name)} fullWidth>
                            <InputLabel>Tags</InputLabel>
                            <OutlinedInput {...field} placeholder="e.g Modern, Clean, etc" />
                            {errors.name ? (
                              <FormHelperText>{errors.name.message}</FormHelperText>
                            ) : (
                              <FormHelperText>Tags must be separated by comma</FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Stack>
                <Stack spacing={3}>
                  <Typography variant="h6">Pricing</Typography>
                  <Stack direction="row" spacing={3}>
                    <Controller
                      control={control}
                      name="currency"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.currency)} sx={{ width: '150px' }}>
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
                    <Controller
                      control={control}
                      name="price"
                      render={({ field }) => (
                        <FormControl error={Boolean(errors.price)}>
                          <InputLabel>Price</InputLabel>
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
                            sx={{ width: '140px' }}
                            type="number"
                          />
                          {errors.price ? <FormHelperText>{errors.price.message}</FormHelperText> : null}
                        </FormControl>
                      )}
                    />
                  </Stack>
                </Stack>
                <Stack spacing={3}>
                  <Typography variant="h6">Images</Typography>
                  <Card sx={{ borderRadius: 1 }} variant="outlined">
                    <DataTable<Image> columns={getImageColumns({ onRemove: handleImageRemove })} rows={images} />
                    {images.length === 0 ? (
                      <Box sx={{ p: 1 }}>
                        <Typography align="center" color="text.secondary" variant="body2">
                          No images
                        </Typography>
                      </Box>
                    ) : null}
                  </Card>
                  <FileDropzone
                    accept={{ 'image/*': [] }}
                    caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                    onDrop={handleImageDrop}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Typography variant="h6">Stock & inventory</Typography>
                  <Grid container spacing={3}>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="sku"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.sku)} fullWidth>
                            <InputLabel>Stock keeping unit (SKU)</InputLabel>
                            <OutlinedInput {...field} placeholder="e.g AG12345" />
                            {errors.sku ? (
                              <FormHelperText>{errors.sku.message}</FormHelperText>
                            ) : (
                              <FormHelperText>Leave blank for auto-generated</FormHelperText>
                            )}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="barcode"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.barcode)} fullWidth>
                            <InputLabel>Barcode (EAN)</InputLabel>
                            <OutlinedInput {...field} placeholder="e.g 00123456789012" />
                            {errors.barcode ? <FormHelperText>{errors.barcode.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="quantity"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.quantity)} fullWidth>
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

                                field.onChange(parseInt(event.target.value));
                              }}
                              type="number"
                            />
                            {errors.quantity ? <FormHelperText>{errors.quantity.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Controller
                        control={control}
                        name="backorder"
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} />}
                            label={
                              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Typography variant="body2">Allow backorders</Typography>
                                <Tooltip title="Keep selling when stock is empty">
                                  <InfoIcon
                                    color="var(--mui-palette-text-secondary)"
                                    fontSize="var(--icon-fontSize-md)"
                                    weight="fill"
                                  />
                                </Tooltip>
                              </Stack>
                            }
                          />
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="height"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.height)} fullWidth>
                            <InputLabel>Height</InputLabel>
                            <OutlinedInput
                              {...field}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Typography variant="body2">cm</Typography>
                                </InputAdornment>
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.valueAsNumber;

                                if (isNaN(value)) {
                                  field.onChange('');
                                  return;
                                }

                                field.onChange(value);
                              }}
                              type="number"
                            />
                            {errors.height ? <FormHelperText>{errors.height.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="width"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.width)} fullWidth>
                            <InputLabel>Width</InputLabel>
                            <OutlinedInput
                              {...field}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Typography variant="body2">cm</Typography>
                                </InputAdornment>
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.valueAsNumber;

                                if (isNaN(value)) {
                                  field.onChange('');
                                  return;
                                }

                                field.onChange(value);
                              }}
                              type="number"
                            />
                            {errors.width ? <FormHelperText>{errors.width.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="length"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.length)} fullWidth>
                            <InputLabel>Length</InputLabel>
                            <OutlinedInput
                              {...field}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Typography variant="body2">cm</Typography>
                                </InputAdornment>
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.valueAsNumber;

                                if (isNaN(value)) {
                                  field.onChange('');
                                  return;
                                }

                                field.onChange(value);
                              }}
                              type="number"
                            />
                            {errors.length ? <FormHelperText>{errors.length.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid md={6} xs={12}>
                      <Controller
                        control={control}
                        name="weight"
                        render={({ field }) => (
                          <FormControl error={Boolean(errors.weight)} fullWidth>
                            <InputLabel>Weight</InputLabel>
                            <OutlinedInput
                              {...field}
                              endAdornment={
                                <InputAdornment position="end">
                                  <Typography variant="body2">kg</Typography>
                                </InputAdornment>
                              }
                              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = event.target.valueAsNumber;

                                if (isNaN(value)) {
                                  field.onChange('');
                                  return;
                                }

                                field.onChange(value);
                              }}
                              type="number"
                            />
                            {errors.weight ? <FormHelperText>{errors.weight.message}</FormHelperText> : null}
                          </FormControl>
                        )}
                      />
                    </Grid>
                  </Grid>
                </Stack>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button color="secondary" component={RouterLink} href={paths.dashboard.products.list}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save changes
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid md={4} xs={12}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  {images.length ? (
                    <Box
                      sx={{
                        backgroundImage: `url(${images[0].url})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        bgcolor: 'var(--mui-palette-background-level2)',
                        borderRadius: 1,
                        display: 'flex',
                        height: '100px',
                        width: '100px',
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        alignItems: 'center',
                        bgcolor: 'var(--mui-palette-background-level2)',
                        borderRadius: 1,
                        display: 'flex',
                        height: '100px',
                        justifyContent: 'center',
                        width: '100px',
                      }}
                    >
                      <ImageIcon fontSize="var(--icon-fontSize-lg)" />
                    </Box>
                  )}
                  <div>
                    <Typography color={name ? 'text.primary' : 'text.disabled'} variant="subtitle1">
                      {name || 'Product name'}
                    </Typography>
                    <Typography color={category ? 'text.secondary' : 'text.disabled'} variant="body2">
                      in {category || 'Category'}
                    </Typography>
                  </div>
                  <Typography color="text.primary" variant="body2">
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price)}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
            <Stack spacing={2}>
              {handle ? (
                <Typography color="primary.main" variant="subtitle2">
                  https://domain.com/products/{handle}
                </Typography>
              ) : (
                <Box sx={{ borderRadius: '20px', bgcolor: 'var(--mui-palette-background-level2)', height: '24px' }} />
              )}
              {tags ? (
                <Typography variant="subtitle2">Keywords: {tags.split(',').filter(Boolean).join(', ')}</Typography>
              ) : (
                <Box sx={{ borderRadius: '20px', bgcolor: 'var(--mui-palette-background-level1)', height: '24px' }} />
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
