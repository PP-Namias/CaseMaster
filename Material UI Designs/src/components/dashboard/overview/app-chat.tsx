import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { ChatCircleText as ChatCircleTextIcon } from '@phosphor-icons/react/dist/ssr/ChatCircleText';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { dayjs } from '@/lib/dayjs';

export interface Message {
  id: string;
  content: string;
  author: { name: string; avatar?: string; status?: 'online' | 'offline' | 'away' | 'busy' };
  createdAt: Date;
}

export interface AppChatProps {
  messages: Message[];
}

export function AppChat({ messages }: AppChatProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ChatCircleTextIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="App chat"
      />
      <List
        disablePadding
        sx={{
          p: 1,
          '& .MuiListItemButton-root': { borderRadius: 1 },
          '& .MuiBadge-dot': {
            border: '2px solid var(--mui-palette-background-paper)',
            borderRadius: '50%',
            bottom: '5px',
            height: '12px',
            right: '5px',
            width: '12px',
          },
        }}
      >
        {messages.map((message) => (
          <ListItem disablePadding key={message.id}>
            <ListItemButton>
              <ListItemAvatar>
                {message.author.status === 'online' ? (
                  <Badge anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} color="success" variant="dot">
                    <Avatar src={message.author.avatar} />
                  </Badge>
                ) : (
                  <Avatar src={message.author.avatar} />
                )}
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={
                  <Typography noWrap variant="subtitle2">
                    {message.author.name}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" noWrap variant="body2">
                    {message.content}
                  </Typography>
                }
              />
              <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="caption">
                {dayjs(message.createdAt).fromNow()}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions>
        <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
          Go to chat
        </Button>
      </CardActions>
    </Card>
  );
}
