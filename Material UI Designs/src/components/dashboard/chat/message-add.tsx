'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';

import type { User } from '@/types/user';

import type { MessageType } from './types';

const user = {
  id: 'USR-000',
  name: 'PP Namias',
  avatar: '/assets/avatar.jpg',
  email: 'pp.namias@gmail.com',
} satisfies User;

export interface MessageAddProps {
  disabled?: boolean;
  onSend?: (type: MessageType, content: string) => void;
}

export function MessageAdd({ disabled = false, onSend }: MessageAddProps): React.JSX.Element {
  const [content, setContent] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleAttach = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  }, []);

  const handleSend = React.useCallback(() => {
    if (!content) {
      return;
    }

    onSend?.('text', content);
    setContent('');
  }, [content, onSend]);

  const handleKeyUp = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '0 0 auto', px: 3, py: 1 }}>
      <Avatar src={user.avatar} sx={{ display: { xs: 'none', sm: 'inline' } }} />
      <OutlinedInput
        disabled={disabled}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder="Leave a message"
        sx={{ flex: '1 1 auto' }}
        value={content}
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Tooltip title="Send">
          <span>
            <IconButton
              color="primary"
              disabled={!content || disabled}
              onClick={handleSend}
              sx={{
                bgcolor: 'var(--mui-palette-primary-main)',
                color: 'var(--mui-palette-primary-contrastText)',
                '&:hover': { bgcolor: 'var(--mui-palette-primary-dark)' },
              }}
            >
              <PaperPlaneTiltIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Stack direction="row" spacing={1} sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Tooltip title="Attach photo">
            <span>
              <IconButton disabled={disabled} edge="end" onClick={handleAttach}>
                <CameraIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Attach file">
            <span>
              <IconButton disabled={disabled} edge="end" onClick={handleAttach}>
                <PaperclipIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Stack>
      <input hidden ref={fileInputRef} type="file" />
    </Stack>
  );
}
