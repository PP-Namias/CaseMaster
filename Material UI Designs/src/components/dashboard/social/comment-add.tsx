import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Smiley as SmileyIcon } from '@phosphor-icons/react/dist/ssr/Smiley';

import type { User } from '@/types/user';

const user = {
  id: 'USR-000',
  name: 'PP Namias',
  avatar: '/assets/avatar.jpg',
  email: 'pp.namias@gmail.com',
} satisfies User;

export function CommentAdd(): React.JSX.Element {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Avatar src={user.avatar} />
      <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
        <OutlinedInput multiline placeholder="Type your reply" rows={3} />
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <IconButton sx={{ display: { sm: 'none' } }}>
              <PlusIcon />
            </IconButton>
            <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <ImageIcon />
            </IconButton>
            <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <PaperclipIcon />
            </IconButton>
            <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <LinkIcon />
            </IconButton>
            <IconButton sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
              <SmileyIcon />
            </IconButton>
          </Stack>
          <div>
            <Button variant="contained">Send</Button>
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
}
