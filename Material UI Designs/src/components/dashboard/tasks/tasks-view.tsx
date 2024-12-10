'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { BoardView } from './board-view';
import { ColumnModal } from './column-modal';
import { TaskModal } from './task-modal';
import { TasksContext } from './tasks-context';

// You may want to also have the List instead of Board.
// We do not handle the list at this moment.

export interface TasksViewProps {
  mode?: 'board' | 'list';
}

export function TasksView(_: TasksViewProps): React.JSX.Element {
  const {
    columns,
    tasks,
    currentColumnId,
    currentTaskId,
    setCurrentColumnId,
    setCurrentTaskId,
    updateColumn,
    updateTask,
    deleteTask,
    addComment,
  } = React.useContext(TasksContext);

  const currentColumn = currentColumnId ? columns.get(currentColumnId) : undefined;
  const currentTask = currentTaskId ? tasks.get(currentTaskId) : undefined;

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          px: 'var(--Content-paddingX)',
          py: 'var(--Content-paddingY)',
        }}
      >
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">Tasks</Typography>
            </Box>
            <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Member
              </Button>
            </div>
          </Stack>
          <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
            <BoardView />
          </Box>
        </Stack>
      </Box>
      {currentColumn ? (
        <ColumnModal
          column={currentColumn}
          onClose={(): void => {
            setCurrentColumnId(undefined);
          }}
          onColumnUpdate={updateColumn}
          open
        />
      ) : null}
      {currentTask ? (
        <TaskModal
          onClose={(): void => {
            setCurrentTaskId(undefined);
          }}
          onCommentAdd={addComment}
          onTaskDelete={(taskId: string): void => {
            setCurrentColumnId(undefined);
            deleteTask(taskId);
          }}
          onTaskUpdate={updateTask}
          open
          task={currentTask}
        />
      ) : null}
    </React.Fragment>
  );
}
