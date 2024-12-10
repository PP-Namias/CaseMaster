import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DownloadSimple as DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';

import type { Attachment } from './types';

export interface AttachmentsProps {
  attachments?: Attachment[];
}

export function Attachments({ attachments = [] }: AttachmentsProps): React.JSX.Element {
  const count = attachments.length;

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{count} attachments</Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {attachments.map((attachment) => (
          <Stack
            direction="row"
            key={attachment.id}
            spacing={1}
            sx={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}
          >
            {attachment.type === 'image' ? <Avatar src={attachment.url} variant="rounded" /> : null}
            {attachment.type === 'file' ? (
              <Avatar variant="rounded">
                <FileIcon fontSize="var(--Icon-fontSize)" />
              </Avatar>
            ) : null}
            <div>
              <Typography noWrap variant="subtitle2">
                {attachment.name}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {attachment.size}
              </Typography>
            </div>
          </Stack>
        ))}
      </Stack>
      <div>
        <Button color="secondary" size="small" startIcon={<DownloadSimpleIcon />}>
          Download all
        </Button>
      </div>
    </Stack>
  );
}
