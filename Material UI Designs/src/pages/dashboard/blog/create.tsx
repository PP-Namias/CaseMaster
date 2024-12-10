import * as React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { PostForm } from '@/components/dashboard/blog/post-form';

const metadata = { title: `Create | Blog | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Stack spacing={8}>
          <Stack spacing={1}>
            <Typography variant="h4">Create a new post</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.overview} variant="subtitle2">
                Dashboard
              </Link>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.blog.list} variant="subtitle2">
                Blog
              </Link>
              <Typography color="text.secondary" variant="subtitle2">
                Create
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Card
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              boxShadow: 'var(--mui-shadows-16)',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="subtitle1">Hello, Sofia</Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center', display: { xs: 'none', sm: 'flex' } }}>
              <Button color="secondary" component={RouterLink} href={paths.dashboard.blog.list}>
                Cancel
              </Button>
              <Button component={RouterLink} href={paths.dashboard.blog.details('1')} variant="contained">
                Publish changes
              </Button>
              <IconButton>
                <DotsThreeIcon weight="bold" />
              </IconButton>
            </Stack>
          </Card>
          <PostForm />
          <Box sx={{ display: { sm: 'none' } }}>
            <Button component={RouterLink} href={paths.dashboard.blog.details('1')} variant="contained">
              Publish changes
            </Button>
          </Box>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
