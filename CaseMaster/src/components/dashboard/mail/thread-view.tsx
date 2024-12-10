'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Chat as ChatIcon } from '@phosphor-icons/react/dist/ssr/Chat';
import { Chats as ChatsIcon } from '@phosphor-icons/react/dist/ssr/Chats';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { Trash as TrashIcon } from '@phosphor-icons/react/dist/ssr/Trash';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { RouterLink } from '@/components/core/link';

import { Attachments } from './attachments';
import { MailContext } from './mail-context';
import { Message } from './message';
import { Reply } from './reply';
import type { Thread } from './types';

/**
 * This method is used to get the thread from the context based on the thread ID.
 * The thread should be loaded from the API in the page, but for the sake of simplicity we are just using the context.
 */
function useThread(threadId: string): Thread | undefined {
  const { threads } = React.useContext(MailContext);

  return threads.find((thread) => thread.id === threadId);
}

export interface ThreadViewProps {
  threadId: string;
}

export function ThreadView({ threadId }: ThreadViewProps): React.JSX.Element {
  const { currentLabelId } = React.useContext(MailContext);

  const thread = useThread(threadId);

  if (!thread) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
        <Typography color="textSecondary" variant="h6">
          Thread not found
        </Typography>
      </Box>
    );
  }

  const backHref = paths.dashboard.mail.list(currentLabelId);

  const hasMessage = Boolean(thread.message);
  const hasAttachments = (thread.attachments ?? []).length > 0;

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid var(--mui-palette-divider)',
          flex: '0 0 auto',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <div>
          <IconButton component={RouterLink} href={backHref}>
            <ArrowLeftIcon />
          </IconButton>
        </div>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <OutlinedInput
            placeholder="Search message"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ width: '200px' }}
          />
          <Tooltip title="Previous">
            <IconButton>
              <CaretLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Next">
            <IconButton>
              <CaretRightIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', overflowY: 'auto', p: 3 }}>
        <Box sx={{ flex: '1 1 auto' }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar src={thread.from.avatar} sx={{ '--Avatar-size': '48px' }} />
              <div>
                <Typography component="span" variant="subtitle2">
                  {thread.from.name}
                </Typography>{' '}
                <Link color="text.secondary" component="span" variant="body2">
                  {thread.from.email}
                </Link>
                <Typography color="text.secondary" variant="subtitle2">
                  To:{' '}
                  {thread.to.map((person) => (
                    <Link color="inherit" key={person.email}>
                      {person.email}
                    </Link>
                  ))}
                </Typography>
                {thread.createdAt ? (
                  <Typography color="text.secondary" noWrap variant="caption">
                    {dayjs(thread.createdAt).format('MMM D, YYYY hh:mm:ss A')}
                  </Typography>
                ) : null}
              </div>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Reply">
                <IconButton>
                  <ChatIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Reply all">
                <IconButton>
                  <ChatsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton>
                  <TrashIcon />
                </IconButton>
              </Tooltip>
            </Stack>
            <Box sx={{ display: { md: 'none' } }}>
              <Tooltip title="More options">
                <IconButton>
                  <DotsThreeIcon weight="bold" />
                </IconButton>
              </Tooltip>
            </Box>
          </Stack>
          <Box sx={{ py: 3 }}>
            <Typography variant="h4">{thread.subject}</Typography>
          </Box>
          <Stack spacing={3}>
            {hasMessage ? <Message content={thread.message} /> : null}
            {hasAttachments ? <Attachments attachments={thread.attachments} /> : null}
          </Stack>
        </Box>
        <Reply />
      </Box>
    </Box>
  );
}
