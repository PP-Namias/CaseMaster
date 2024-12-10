'use client';

import * as React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { TaskCard } from './task-card';
import { TaskDraggable } from './task-draggable';
import type { DnDData, Task } from './types';

export interface ColumnDroppableProps {
  id: string;
  onTaskCreate?: () => void;
  onTaskOpen?: (taskId: string) => void;
  tasks: Task[];
}

export function ColumnDroppable({ id, onTaskCreate, onTaskOpen, tasks }: ColumnDroppableProps): React.JSX.Element {
  const { over, setNodeRef } = useDroppable({ id, data: { type: 'column' } satisfies DnDData });

  const isOver = over ? over.id === id || tasks.find((task) => task.id === over.id) : false;

  return (
    <Stack
      ref={setNodeRef}
      spacing={3}
      sx={{
        bgcolor: 'var(--mui-palette-background-level1)',
        borderRadius: '20px',
        flex: '0 0 auto',
        minHeight: '250px',
        p: 3,
        ...(isOver && { bgcolor: 'var(--mui-palette-background-level2)' }),
      }}
    >
      <Button color="secondary" onClick={onTaskCreate} startIcon={<PlusIcon />}>
        Add task
      </Button>
      {tasks.map(
        (task): React.JSX.Element => (
          <TaskDraggable id={task.id} key={task.id}>
            <TaskCard onOpen={onTaskOpen} task={task} />
          </TaskDraggable>
        )
      )}
    </Stack>
  );
}
