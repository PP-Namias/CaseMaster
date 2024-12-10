import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ArrowsOutSimple as ArrowsOutSimpleIcon } from '@phosphor-icons/react/dist/ssr/ArrowsOutSimple';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { TextEditor } from '@/components/core/text-editor/text-editor';

export function Modal1(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Paper
        sx={{
          border: '1px solid var(--mui-palette-divider)',
          boxShadow: 'var(--mui-shadows-16)',
          maxWidth: '100%',
          mx: 'auto',
          width: '600px',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: 'flex', p: 2 }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h6">New message</Typography>
          </Box>
          <IconButton>
            <ArrowsOutSimpleIcon />
          </IconButton>
          <IconButton>
            <XIcon />
          </IconButton>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto' }}>
          <Input fullWidth placeholder="To" />
          <Divider />
          <Input fullWidth placeholder="Subject" />
          <Divider />
          <Box
            sx={{ '& .tiptap-root': { border: 'none', borderRadius: 0 }, '& .tiptap-container': { height: '300px' } }}
          >
            <TextEditor content="" placeholder="Leave a message" />
          </Box>
          <Divider />
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <Tooltip title="Attach image">
                <IconButton>
                  <ImageIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Attach file">
                <IconButton>
                  <PaperclipIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <div>
              <Button variant="contained">Send</Button>
            </div>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
