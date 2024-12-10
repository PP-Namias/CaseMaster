import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { Smiley as SmileyIcon } from '@phosphor-icons/react/dist/ssr/Smiley';

import type { User } from '../../../types/user';

const user = {
  id: 'USR-000',
  name: 'PP Namias',
  avatar: '/assets/avatar.jpg',
  email: 'pp.namias@gmail.com',
} satisfies User;

export function Reply(): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', flex: '0 0 auto', p: 3 }}>
      <Avatar src={user.avatar} />
      <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
        <OutlinedInput maxRows={7} minRows={3} multiline placeholder="Leave a message" />
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
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
            <IconButton>
              <LinkIcon />
            </IconButton>
            <IconButton>
              <SmileyIcon />
            </IconButton>
          </Stack>
          <div>
            <Button variant="contained">Reply</Button>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
