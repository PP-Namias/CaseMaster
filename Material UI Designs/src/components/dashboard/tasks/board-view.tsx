'use client';

import * as React from 'react';
import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  getFirstCollision,
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type {
  CollisionDetection,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { logger } from '@/lib/default-logger';

import { ColumnItem } from './column-item';
import { ColumnList } from './column-list';
import { TaskCard } from './task-card';
import { TasksContext } from './tasks-context';
import type { Column, DnDData, Task } from './types';

const dropAnimation: DropAnimation = { ...defaultDropAnimation };

export function BoardView(): React.JSX.Element | null {
  const {
    columns,
    tasks,
    setCurrentColumnId,
    setCurrentTaskId,
    createColumn,
    clearColumn,
    deleteColumn,
    createTask,
    dragTask,
  } = React.useContext(TasksContext);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 10 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const [active, setActive] = React.useState<{ id: string; type: 'column' | 'task' } | null>(null);

  const collisionDetection = useCollisionDetection(columns, active);

  const activeTask = React.useMemo((): Task | undefined => {
    return active?.type === 'task' ? tasks.get(active.id) : undefined;
  }, [tasks, active]);

  const handleDragStart = React.useCallback((event: DragStartEvent): void => {
    if (!canDrag(event)) {
      return;
    }

    setActive({ id: event.active.id as string, type: event.active.data.current!.type as 'column' | 'task' });
  }, []);

  const handleDragOver = React.useCallback((_: DragOverEvent): void => {
    // console.log('handleDragOver', event);
  }, []);

  const handleDragEnd = React.useCallback(
    (event: DragEndEvent): void => {
      if (!canDrop(event)) {
        return;
      }

      dragTask(
        { id: event.active.id as string, type: event.active.data.current!.type as 'task' },
        { id: event.over!.id as string, type: event.over!.data.current!.type as 'column' | 'task' }
      );
    },
    [dragTask]
  );

  return (
    <DndContext
      collisionDetection={collisionDetection}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <ColumnList>
        {Array.from(columns.values()).map(({ taskIds, ...column }): React.JSX.Element => {
          const tasksFiltered = taskIds
            .map((taskId) => tasks.get(taskId))
            .filter((task) => typeof task !== 'undefined') as Task[];

          return (
            <ColumnItem
              column={column}
              key={column.id}
              onColumnClear={clearColumn}
              onColumnDelete={deleteColumn}
              onColumnEdit={setCurrentColumnId}
              onTaskCreate={createTask}
              onTaskOpen={setCurrentTaskId}
              tasks={tasksFiltered}
            />
          );
        })}
        <Box sx={{ flex: '0 0 auto' }}>
          <Button color="secondary" onClick={createColumn} startIcon={<PlusIcon />}>
            Add column
          </Button>
        </Box>
      </ColumnList>
      <DragOverlay dropAnimation={dropAnimation}>
        {activeTask ? (
          <div style={{ cursor: 'grab' }}>
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function useCollisionDetection(
  columns: Map<string, Column>,
  active: { id: string; type: 'column' | 'task' } | null
): CollisionDetection {
  const lastOverId = React.useRef<string | null>(null);

  return React.useCallback(
    (args) => {
      /**
       * Custom collision detection strategy optimized for multiple containers
       *
       * - First, find any droppable containers intersecting with the pointer.
       * - If there are none, find intersecting containers with the active draggable.
       * - If there are no intersecting containers, return the last matched intersection
       */

      if (active?.type === 'column' && columns.has(active.id)) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter((container) => columns.has(container.id as string)),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id') as string | null;

      if (overId !== null) {
        if (columns.has(overId)) {
          const columnTasks = columns.get(overId)?.taskIds ?? [];

          if (columnTasks.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) => container.id !== overId && columnTasks.includes(container.id as string)
              ),
            })[0]?.id as string | null;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId as UniqueIdentifier }];
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current as UniqueIdentifier }] : [];
    },
    [active, columns]
  );
}

function canDrag({ active }: DragStartEvent): boolean {
  if (active.data.current?.type !== 'task') {
    logger.warn('[DnD] onDragStart missing or invalid active type. Must be "task"');
    return false;
  }

  return true;
}

function canDrop({ active, over }: DragOverEvent): boolean {
  if (!over) {
    // Since all draggable tasks are inside droppable columns,
    // in theory there should always be an "over".
    return false;
  }

  if (!active.data.current || !['task'].includes((active.data.current as DnDData).type)) {
    // You might want to be able to drag columns.
    // We do did not implement this functionality.
    logger.warn('onDragEnd missing or invalid active type. Must be "task"');
    return false;
  }

  if (!over.data.current || !['column', 'task'].includes((over.data.current as DnDData).type)) {
    logger.warn('onDragEnd missing or invalid over type, Must be "column" or "task"');
    return false;
  }

  return true;
}
