'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import { UploadSimple as UploadSimpleIcon } from '@phosphor-icons/react/dist/ssr/UploadSimple';

import { useDialog } from '@/hooks/use-dialog';

import { Uploader } from './uploader';

export function UplaodButton(): React.JSX.Element {
  const uploadDialog = useDialog();

  return (
    <React.Fragment>
      <Button onClick={uploadDialog.handleOpen} startIcon={<UploadSimpleIcon />} variant="contained">
        Upload
      </Button>
      <Uploader onClose={uploadDialog.handleClose} open={uploadDialog.open} />
    </React.Fragment>
  );
}
