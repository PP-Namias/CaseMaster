'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import type { File } from '@/components/core/file-dropzone';
import { FileDropzone } from '@/components/core/file-dropzone';
import { TextEditor } from '@/components/core/text-editor/text-editor';

export function PostForm(): React.JSX.Element {
  const [cover, setCover] = React.useState<string | null>('/assets/image-abstract-1.png');

  const handleCoverDrop = React.useCallback(async ([file]: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setCover(reader.result as string);
    };
  }, []);

  const handleCoverRemove = React.useCallback(() => {
    setCover(null);
  }, []);

  return (
    <Stack spacing={4}>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={4} xs={12}>
              <Typography variant="h6">Basic details</Typography>
            </Grid>
            <Grid md={8} xs={12}>
              <Stack spacing={3}>
                <FormControl>
                  <InputLabel>Post title</InputLabel>
                  <OutlinedInput name="title" />
                </FormControl>
                <FormControl>
                  <InputLabel>Short description</InputLabel>
                  <OutlinedInput name="shortDescription" />
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={4} xs={12}>
              <Typography variant="h6">Post cover</Typography>
            </Grid>
            <Grid md={8} xs={12}>
              <Stack spacing={3}>
                {cover ? (
                  <Box
                    sx={{
                      backgroundImage: `url(${cover})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      borderRadius: 1,
                      height: '230px',
                    }}
                  />
                ) : (
                  <Stack
                    spacing={1}
                    sx={{
                      alignItems: 'center',
                      bgcolor: 'var(--mui-palette-background-level1)',
                      border: '1px dashed var(--mui-palette-divider)',
                      borderRadius: 1,
                      height: '230px',
                      justifyContent: 'center',
                      p: 3,
                      textAlign: 'center',
                    }}
                  >
                    <Typography color="text.secondary" variant="h6">
                      Photo not uploaded
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle1">
                      Image used for the blog post cover and also for Open Graph meta
                    </Typography>
                  </Stack>
                )}
                <div>
                  <Button color="secondary" disabled={!cover} onClick={handleCoverRemove} variant="outlined">
                    Remove
                  </Button>
                </div>
                <FileDropzone
                  accept={{ 'image/*': [] }}
                  caption="(SVG, JPG, PNG, or gif maximum 900x400)"
                  maxFiles={1}
                  onDrop={handleCoverDrop}
                />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={4} xs={12}>
              <Typography variant="h6">Content</Typography>
            </Grid>
            <Grid md={8} xs={12}>
              <Box sx={{ '& .tiptap-container': { height: '320px' } }}>
                <TextEditor content="" placeholder="Write something" />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={4} xs={12}>
              <Typography variant="h6">Meta</Typography>
            </Grid>
            <Grid lg={8} xs={12}>
              <Stack spacing={3}>
                <FormControl>
                  <InputLabel>SEO title</InputLabel>
                  <OutlinedInput name="seoTitle" />
                </FormControl>
                <FormControl>
                  <InputLabel>SEO description</InputLabel>
                  <OutlinedInput name="seoDescription" />
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Stack>
  );
}
