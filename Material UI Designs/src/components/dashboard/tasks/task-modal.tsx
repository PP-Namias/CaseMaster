'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Archive as ArchiveIcon } from '@phosphor-icons/react/dist/ssr/Archive';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';

import { dayjs } from '@/lib/dayjs';

import type { Comment, Task } from './types';

export interface TaskModalProps {
  onClose?: () => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskUpdate?: (taskId: string, params: { title?: string; description?: string }) => void;
  onCommentAdd?: (taskId: string, content: string) => void;
  open: boolean;
  task: Task;
}

export function TaskModal({
  onClose,
  onTaskDelete,
  onTaskUpdate,
  onCommentAdd,
  open,
  task,
}: TaskModalProps): React.JSX.Element {
  const {
    assignees = [],
    attachments = [],
    comments = [],
    labels = [],
    subtasks = [],
    description = '',
    id,
    title,
  } = task;

  const [tab, setTab] = React.useState<string>('overview');

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', minHeight: 0, p: 0 }}>
        <Box sx={{ flex: '0 0 auto', p: 3 }}>
          <IconButton onClick={onClose}>
            <XIcon />
          </IconButton>
        </Box>
        <Divider />
        <Tabs
          onChange={(_, value: string) => {
            setTab(value);
          }}
          sx={{ px: 3 }}
          value={tab}
        >
          <Tab label="Overview" tabIndex={0} value="overview" />
          <Tab label="Subtasks" tabIndex={0} value="subtasks" />
          <Tab label="Comments" tabIndex={0} value="comments" />
        </Tabs>
        <Divider />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0, overflowY: 'auto', p: 3 }}>
          {tab === 'overview' ? (
            <Stack spacing={4} sx={{ flex: '1 1 auto' }}>
              <EditableDetails
                description={description}
                onUpdate={(params: { title: string; description: string }) => {
                  onTaskUpdate?.(id, params);
                }}
                title={title}
              />
              <Stack divider={<Divider />} spacing={2} sx={{ flex: '1 1 auto' }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Created by</Typography>
                  <Stack direction="row" spacing={2}>
                    <Avatar src={task.author.avatar} />
                    <div>
                      <Typography variant="subtitle2">{task.author.name}</Typography>
                      <Typography color="text.secondary" variant="body2">
                        @{task.author.username}
                      </Typography>
                    </div>
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Assignees</Typography>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {assignees.map(
                      (assignee): React.JSX.Element => (
                        <Avatar key={assignee.id} src={assignee.avatar} />
                      )
                    )}
                    <IconButton>
                      <PlusIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Due date</Typography>
                  <DatePicker format="MMM D, YYYY" name="dueDate" sx={{ maxWidth: '250px' }} />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Labels</Typography>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {labels.map((label) => (
                      <Chip
                        key={label}
                        label={label}
                        onDelete={() => {
                          // noop
                        }}
                        size="small"
                        variant="soft"
                      />
                    ))}
                    <IconButton>
                      <PlusIcon />
                    </IconButton>
                  </Stack>
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Attachments</Typography>
                  <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {attachments.map(
                      (attachment): React.JSX.Element => (
                        <Paper
                          key={attachment.id}
                          sx={{ borderRadius: 1, p: '4px 8px', maxWidth: '220px' }}
                          variant="outlined"
                        >
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                            <div>
                              <FileIcon fontSize="var(--icon-fontSize-lg)" />
                            </div>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography noWrap variant="body2">
                                {attachment.name}
                              </Typography>
                              <Typography color="text.secondary" variant="body2">
                                {attachment.size}
                              </Typography>
                            </Box>
                          </Stack>
                        </Paper>
                      )
                    )}
                    <IconButton>
                      <PlusIcon />
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  color="error"
                  onClick={() => {
                    onTaskDelete?.(id);
                  }}
                  startIcon={<ArchiveIcon />}
                >
                  Archive
                </Button>
              </Box>
            </Stack>
          ) : null}
          {tab === 'subtasks' ? (
            <Stack spacing={2}>
              {subtasks.length ? (
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography color="text.secondary" variant="subtitle2">
                      {countDoneSubtasks(subtasks)} of 5
                    </Typography>
                    <LinearProgress
                      sx={{ bgcolor: 'var(--mui-palette-background-level1)' }}
                      value={(100 / subtasks.length) * countDoneSubtasks(subtasks)}
                      variant="determinate"
                    />
                  </Stack>
                  <Stack gap={1}>
                    {subtasks.map(
                      (subtask): React.JSX.Element => (
                        <FormControlLabel
                          control={<Checkbox checked={subtask.done} />}
                          key={subtask.id}
                          label={subtask.title}
                        />
                      )
                    )}
                  </Stack>
                </Stack>
              ) : null}
              <div>
                <Button color="secondary" startIcon={<PlusIcon />} variant="outlined">
                  Add subtask
                </Button>
              </div>
            </Stack>
          ) : null}
          {tab === 'comments' ? (
            <Stack spacing={5}>
              {comments.length ? (
                <Stack spacing={3}>
                  {comments.map(
                    (comment, index): React.JSX.Element => (
                      <CommentItem comment={comment} connector={index < comments.length - 1} key={comment.id} />
                    )
                  )}
                </Stack>
              ) : (
                <Typography color="text.secondary" sx={{ fontStyle: 'italic' }} variant="body2">
                  No comments yet
                </Typography>
              )}
              <CommentAdd
                onAdd={(content: string): void => {
                  onCommentAdd?.(id, content);
                }}
              />
            </Stack>
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

interface EditableDetailsProps {
  description: string;
  onUpdate?: (params: { title: string; description: string }) => void;
  title: string;
}

function EditableDetails({
  description: initialDescription,
  onUpdate,
  title: initialTitle,
}: EditableDetailsProps): React.JSX.Element {
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [edit, setEdit] = React.useState<boolean>(false);

  React.useEffect((): void => {
    setTitle(initialTitle);
  }, [initialTitle]);

  React.useEffect((): void => {
    setDescription(initialDescription);
  }, [initialDescription]);

  const handleSave = React.useCallback((): void => {
    if (!title) {
      return;
    }

    onUpdate?.({ title, description });
    setEdit(false);
  }, [title, description, onUpdate]);

  if (edit) {
    return (
      <Stack spacing={2}>
        <OutlinedInput
          name="title"
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setTitle(event.target.value);
          }}
          value={title}
        />
        <OutlinedInput
          maxRows={5}
          minRows={3}
          multiline
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>): void => {
            if (!edit) {
              setEdit(true);
            }

            setDescription(event.target.value);
          }}
          placeholder="No description"
          value={description}
        />
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="secondary"
            onClick={(): void => {
              setTitle(initialTitle);
              setEdit(false);
            }}
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={(): void => {
              handleSave();
            }}
            size="small"
            variant="contained"
          >
            Save
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
        <Typography variant="h5">{title}</Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Stack>
      <IconButton
        onClick={(): void => {
          setEdit(true);
        }}
      >
        <PencilSimpleIcon />
      </IconButton>
    </Stack>
  );
}

interface CommentItemProps {
  connector?: boolean;
  comment: Comment;
}

function CommentItem({ comment, connector }: CommentItemProps): React.JSX.Element {
  const { author, content, createdAt, comments } = comment;
  const canReply = author.id !== 'USR-000'; // authenticated user

  return (
    <Stack direction="row" spacing={2}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Avatar src={author.avatar} />
        {connector ? (
          <Box sx={{ flex: '1 1 auto', pt: 3 }}>
            <Box
              sx={{
                bgcolor: 'var(--mui-palette-divider)',
                height: '100%',
                minHeight: '24px',
                mx: 'auto',
                width: '1px',
              }}
            />
          </Box>
        ) : null}
      </Box>
      <Stack spacing={3} sx={{ flex: '1 1 auto' }}>
        <div>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
            <Tooltip arrow title={`@${author.username}`}>
              <Typography variant="subtitle2">{author.name}</Typography>
            </Tooltip>
            {createdAt ? (
              <Typography sx={{ whiteSpace: 'nowrap' }} variant="caption">
                {dayjs(createdAt).fromNow()}
              </Typography>
            ) : null}
          </Stack>
          <Typography variant="body2">{content}</Typography>
          {canReply ? (
            <div>
              <Link sx={{ cursor: 'pointer' }} variant="body2">
                Reply
              </Link>
            </div>
          ) : null}
        </div>
        {comments?.length ? (
          <Stack spacing={2}>
            {comments.map(
              (subComment, index): React.JSX.Element => (
                <CommentItem comment={subComment} connector={index < comments.length - 1} key={subComment.id} />
              )
            )}
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}

interface CommentAddProps {
  onAdd?: (content: string) => void;
}

function CommentAdd({ onAdd }: CommentAddProps): React.JSX.Element {
  const [content, setContent] = React.useState<string>('');

  const handleAdd = React.useCallback((): void => {
    if (!content) {
      return;
    }

    onAdd?.(content);
    setContent('');
  }, [content, onAdd]);

  return (
    <OutlinedInput
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={(): void => {
              handleAdd();
            }}
          >
            <PaperPlaneTiltIcon />
          </IconButton>
        </InputAdornment>
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
        setContent(event.target.value);
      }}
      onKeyUp={(event: React.KeyboardEvent): void => {
        if (event.key === 'Enter') {
          handleAdd();
        }
      }}
      placeholder="Add a comment..."
      startAdornment={
        <InputAdornment position="start">
          <Avatar src="/assets/avatar.jpg" />
        </InputAdornment>
      }
      sx={{ '--Input-paddingBlock': '12px' }}
      value={content}
    />
  );
}

function countDoneSubtasks(subtasks: Task['subtasks'] = []): number {
  return subtasks.reduce((acc, curr) => acc + (curr.done ? 1 : 0), 0);
}
