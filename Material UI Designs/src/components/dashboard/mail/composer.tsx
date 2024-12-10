'use client';

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
import { ArrowsInSimple as ArrowsInSimpleIcon } from '@phosphor-icons/react/dist/ssr/ArrowsInSimple';
import { ArrowsOutSimple as ArrowsOutSimpleIcon } from '@phosphor-icons/react/dist/ssr/ArrowsOutSimple';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import type { EditorEvents } from '@tiptap/react';

import { TextEditor } from '@/components/core/text-editor/text-editor';

export interface ComposerProps {
  onClose?: () => void;
  open: boolean;
}

export function Composer({ onClose, open }: ComposerProps): React.JSX.Element | null {
  const [isMaximized, setIsMaximized] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [subject, setSubject] = React.useState<string>('');
  const [to, setTo] = React.useState<string>('');

  const handleSubjectChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  }, []);

  const handleMessageChange = React.useCallback(({ editor }: EditorEvents['update']) => {
    setMessage(editor.getText());
  }, []);

  const handleToChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  }, []);

  if (!open) {
    return null;
  }

  return (
    <Paper
      sx={{
        border: '1px solid var(--mui-palette-divider)',
        bottom: 0,
        boxShadow: 'var(--mui-shadows-16)',
        height: '600px',
        m: 2,
        maxWidth: '100%',
        position: 'fixed',
        right: 0,
        width: '600px',
        zIndex: 'var(--mui-zIndex-modal)',
        ...(isMaximized && { borderRadius: 0, height: '100%', left: 0, m: 0, top: 0, width: '100%' }),
      }}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: 'flex', p: 2 }}>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography variant="h6">New message</Typography>
        </Box>
        {isMaximized ? (
          <IconButton
            onClick={() => {
              setIsMaximized(false);
            }}
          >
            <ArrowsInSimpleIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              setIsMaximized(true);
            }}
          >
            <ArrowsOutSimpleIcon />
          </IconButton>
        )}
        <IconButton onClick={onClose}>
          <XIcon />
        </IconButton>
      </Stack>
      <div>
        <Input onChange={handleToChange} placeholder="To" value={to} />
        <Divider />
        <Input onChange={handleSubjectChange} placeholder="Subject" value={subject} />
        <Divider />
        <Box sx={{ '& .tiptap-root': { border: 'none', borderRadius: 0 }, '& .tiptap-container': { height: '300px' } }}>
          <TextEditor content={message} onUpdate={handleMessageChange} placeholder="Leave a message" />
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
      </div>
    </Paper>
  );
}
