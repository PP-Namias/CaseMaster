import * as React from 'react';
import Box from '@mui/material/Box';

import { FileIcon } from '@/components/core/file-icon';

import type { ItemType } from './types';

export interface ItemIconProps {
  extension?: string;
  type: ItemType;
}

export function ItemIcon({ type, extension }: ItemIconProps): React.JSX.Element {
  return type === 'folder' ? <FolderIcon /> : <FileIcon extension={extension} />;
}

function FolderIcon(): React.JSX.Element {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'inline-flex',
        flex: '0 0 auto',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
      }}
    >
      <Box alt="Folder" component="img" src="/assets/icon-folder.svg" sx={{ height: '100%', width: 'auto' }} />
    </Box>
  );
}
