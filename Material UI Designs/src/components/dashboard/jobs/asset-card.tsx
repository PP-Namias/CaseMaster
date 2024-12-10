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
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';

import type { Asset } from './types';

export interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps): React.JSX.Element {
  const isImage = asset.mimeType.includes('image/');

  return (
    <Card sx={{ borderRadius: 1 }} variant="outlined">
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
  );
}
