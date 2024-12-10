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
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import type { EditorEvents } from '@tiptap/react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { RouterLink } from '@/components/core/link';
import { Option } from '@/components/core/option';
import { TextEditor } from '@/components/core/text-editor/text-editor';
import { toast } from '@/components/core/toaster';

const schema = zod.object({
  name: zod.string().min(1, 'Name is required').max(255),
  handle: zod.string().max(255).optional(),
  category: zod.string().max(255).optional(),
  type: zod.string().max(255).optional(),
  description: zod.string().max(5000).optional(),
  tags: zod.string().max(255).optional(),
});

type Values = zod.infer<typeof schema>;

const defaultValues = {
  name: '',
  handle: '',
  category: '',
  type: 'physical',
  description: '',
  tags: '',
} satisfies Values;

export function ProductCreateForm(): React.JSX.Element {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (_: Values): Promise<void> => {
      try {
        // Make API request
        toast.success('Product created');
        navigate(paths.dashboard.products.list);
      } catch (err) {
        logger.error(err);
        toast.error('Something went wrong!');
      }
    },
    [navigate]
  );

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
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button color="secondary" component={RouterLink} href={paths.dashboard.products.list}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create product
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
