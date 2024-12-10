import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';

interface Asset {
  id: string;
  mimeType: string;
  name: string;
  size: string;
  url: string;
}

const assets = [
  {
    id: 'ASSET-003',
    mimeType: 'image/png',
    name: 'example-project1.png',
    size: '3 MB',
    url: '/assets/image-abstract-2.png',
  },
  { id: 'ASSET-002', mimeType: 'application/zip', name: 'docs.zip', size: '6.2 MB', url: '#' },
  {
    id: 'ASSET-001',
    mimeType: 'image/png',
    name: 'example-project2.png',
    size: '3.2 MB',
    url: '/assets/image-minimal-2.png',
  },
] satisfies Asset[];

export function GridList3(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        {assets.map((asset) => {
          const isImage = asset.mimeType.includes('image/');

          return (
            <Grid key={asset.id} md={4} sm={6} xs={12}>
              <Card>
                {isImage ? (
                  <CardMedia image={asset.url} sx={{ height: '140px' }} />
                ) : (
                  <Box
                    sx={{
                      alignItems: 'center',
                      bgcolor: 'var(--mui-palette-background-level2)',
                      display: 'flex',
                      height: '140px',
                      justifyContent: 'center',
                    }}
                  >
                    <FileIcon fontSize="var(--icon-fontSize-lg)" />
                  </Box>
                )}
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography noWrap variant="subtitle2">
                      {asset.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                      {asset.size}
                    </Typography>
                  </Box>
                  <div>
                    <Tooltip title="More options">
                      <IconButton edge="end">
                        <DotsThreeIcon weight="bold" />
                      </IconButton>
                    </Tooltip>
                  </div>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button color="secondary" size="small">
                    Download
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
