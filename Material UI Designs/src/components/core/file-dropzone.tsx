'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CloudArrowUp as CloudArrowUpIcon } from '@phosphor-icons/react/dist/ssr/CloudArrowUp';
import type { DropzoneOptions, FileWithPath } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

export type File = FileWithPath;

export interface FileDropzoneProps extends DropzoneOptions {
  caption?: string;
  files?: File[];
  onRemove?: (file: File) => void;
  onRemoveAll?: () => void;
  onUpload?: () => void;
}

export function FileDropzone({ caption, ...props }: FileDropzoneProps): React.JSX.Element {
  const { getRootProps, getInputProps, isDragActive } = useDropzone(props);

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          alignItems: 'center',
          border: '1px dashed var(--mui-palette-divider)',
          borderRadius: 1,
          cursor: 'pointer',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(isDragActive && { bgcolor: 'var(--mui-palette-action-selected)', opacity: 0.5 }),
          '&:hover': { ...(!isDragActive && { bgcolor: 'var(--mui-palette-action-hover)' }) },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar
            sx={{
              '--Avatar-size': '64px',
              '--Icon-fontSize': 'var(--icon-fontSize-lg)',
              bgcolor: 'var(--mui-palette-background-paper)',
              boxShadow: 'var(--mui-shadows-8)',
              color: 'var(--mui-palette-text-primary)',
            }}
          >
            <CloudArrowUpIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
          <Stack spacing={1}>
            <Typography variant="h6">
              <Typography component="span" sx={{ textDecoration: 'underline' }} variant="inherit">
                Click to upload
              </Typography>{' '}
              or drag and drop
            </Typography>
            {caption ? (
              <Typography color="text.secondary" variant="body2">
                {caption}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
