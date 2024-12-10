'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ChatContext } from './chat-context';
import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';
import { ThreadToolbar } from './thread-toolbar';
import type { Message, MessageType, Thread, ThreadType } from './types';

/**
 * This method is used to get the thread from the context based on the thread type and ID.
 * The thread should be loaded from the API in the page, but for the sake of simplicity we are just using the context.
 */
function useThread(threadId: string): Thread | undefined {
  const { threads } = React.useContext(ChatContext);

  return threads.find((thread) => thread.id === threadId);
}

function useMessages(threadId: string): Message[] {
  const { messages } = React.useContext(ChatContext);

  return messages.get(threadId) ?? [];
}

export interface ThreadViewProps {
  threadId: string;
  threadType: ThreadType;
}

export function ThreadView({ threadId }: ThreadViewProps): React.JSX.Element | null {
  const { createMessage, markAsRead } = React.useContext(ChatContext);

  const thread = useThread(threadId);

  const messages = useMessages(threadId);

  const messagesRef = React.useRef<HTMLDivElement>(null);

  const handleThreadChange = React.useCallback(() => {
    markAsRead(threadId);
  }, [threadId, markAsRead]);

  React.useEffect(() => {
    handleThreadChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Prevent infinite loop
  }, [threadId]);

  const handleSendMessage = React.useCallback(
    async (type: MessageType, content: string) => {
      createMessage({ threadId, type, content });
    },
    [threadId, createMessage]
  );

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (!thread) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
        <Typography color="textSecondary" variant="h6">
          Thread not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <ThreadToolbar thread={thread} />
      <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Stack>
      <MessageAdd onSend={handleSendMessage} />
    </Box>
  );
}
