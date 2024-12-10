import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { JobCreateForm } from '@/components/dashboard/jobs/job-create-form';

const metadata = { title: `Create | Jobs | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box sx={{ display: 'flex', flex: '1 1 0', minHeight: 0 }}>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: 'url(/assets/people-talking.png)',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            flex: '0 0 auto',
            display: { xs: 'none', md: 'block' },
            width: { md: '400px', xl: '500px' },
          }}
        />
        <Box sx={{ flex: '1 1 auto', overflowY: 'auto', p: { xs: 4, sm: 6, md: 8 } }}>
          <Stack maxWidth="md" spacing={4}>
            <Typography variant="h4">Create job ad</Typography>
            <JobCreateForm />
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
}
