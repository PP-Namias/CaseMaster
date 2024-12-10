import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { AssetCard } from '@/components/dashboard/jobs/asset-card';
import type { Asset } from '@/components/dashboard/jobs/types';

const assets = [
  {
    id: 'ASSET-002',
    mimeType: 'image/png',
    name: 'company-cover.png',
    size: '23 KB',
    url: '/assets/image-business-2.png',
  },
  { id: 'ASSET-001', mimeType: 'application/pdf', name: 'Presentation.pdf', size: '3 MB', url: '' },
] satisfies Asset[];

export function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h6">Assets ({assets.length})</Typography>
      </div>
      <Grid container spacing={3}>
        {assets.map((asset) => (
          <Grid key={asset.id} md={4} sm={6} xs={12}>
            <AssetCard asset={asset} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
