'use client';

import * as React from 'react';

import type { Column, Comment, Task } from './types';

function noop(): void {
  return undefined;
}

export interface TasksContextValue {
  columns: Map<string, Column>;
  tasks: Map<string, Task>;
  currentColumnId?: string;
  currentTaskId?: string;
  setCurrentColumnId: (columnId?: string) => void;
  setCurrentTaskId: (taskId?: string) => void;
  createColumn: () => void;
  updateColumn: (taskId: string, params: { name?: string }) => void;
  clearColumn: (columnId: string) => void;
  deleteColumn: (columnId: string) => void;
  dragTask: (active: { id: string; type: 'task' }, over: { id: string; type: 'column' | 'task' }) => void;
  createTask: (columnId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (taskId: string, params: { title?: string; description?: string }) => void;
  addComment: (taskId: string, content: string) => void;
}

export const TasksContext = React.createContext<TasksContextValue>({
  columns: new Map(),
  tasks: new Map(),
  setCurrentColumnId: noop,
  setCurrentTaskId: noop,
  createColumn: noop,
  updateColumn: noop,
  clearColumn: noop,
  deleteColumn: noop,
  dragTask: noop,
  createTask: noop,
  deleteTask: noop,
  updateTask: noop,
  addComment: noop,
});

export interface TasksProviderProps {
  children: React.ReactNode;
  columns: Column[];
  tasks: Task[];
}

export function TasksProvider({
  children,
  columns: initialColumns = [],
  tasks: initialTasks = [],
}: TasksProviderProps): React.JSX.Element {
  const [columns, setColumns] = React.useState(new Map<string, Column>());
  const [tasks, setTasks] = React.useState(new Map<string, Task>());
  const [currentColumnId, setCurrentColumnId] = React.useState<string>();
  const [currentTaskId, setCurrentTaskId] = React.useState<string>();

  React.useEffect((): void => {
    setColumns(new Map(initialColumns.map((column) => [column.id, column])));
  }, [initialColumns]);

  React.useEffect((): void => {
    setTasks(new Map(initialTasks.map((task) => [task.id, task])));
  }, [initialTasks]);

  const handleCreateColumn = React.useCallback((): void => {
    const column = { id: `COL-${Date.now()}`, name: 'Untitled', taskIds: [] } satisfies Column;

    const updatedColumns = new Map<string, Column>(columns);

    // Add column
    updatedColumns.set(column.id, column);

    // Dispatch update
    setColumns(updatedColumns);
  }, [columns]);

  const handleUpdateColumn = React.useCallback(
    (columnId: string, { name }: { name?: string }): void => {
      const column = columns.get(columnId);

      // Column might no longer exist
      if (!column) {
        return;
      }

      const updatedColumns = new Map<string, Column>(columns);

      const updatedColumn = { ...column };

      if (typeof name !== 'undefined') {
        updatedColumn.name = name;
      }

      // Update column
      updatedColumns.set(updatedColumn.id, updatedColumn);

      // Dispatch update
      setColumns(updatedColumns);
    },
    [columns]
  );

  const handleClearColumn = React.useCallback(
    (columnId: string): void => {
      const column = columns.get(columnId);

      // Column might no longer exist
      if (!column) {
        return;
      }

      const updatedTasks = new Map<string, Task>(tasks);

      // Delete tasks
      column.taskIds.forEach((taskId): void => {
        updatedTasks.delete(taskId);
      });

      const updatedColumns = new Map<string, Column>(columns);

      const updatedColumn = { ...column, taskIds: [] };

      // Update column
      updatedColumns.set(updatedColumn.id, updatedColumn);

      // Dispatch update
      setColumns(updatedColumns);
      setTasks(updatedTasks);
    },
    [columns, tasks]
  );

  const handleDeleteColumn = React.useCallback(
    (columnId: string): void => {
      const column = columns.get(columnId);

      // Column might no longer exist
      if (!column) {
        return;
      }

      const updatedTasks = new Map<string, Task>(tasks);

      // Delete tasks
      column.taskIds.forEach((taskId): void => {
        updatedTasks.delete(taskId);
      });

      const updatedColumns = new Map<string, Column>(columns);

      // Delete column
      updatedColumns.delete(column.id);

      // Dispatch update
      setColumns(updatedColumns);
      setTasks(updatedTasks);
    },
    [columns, tasks]
  );

  const handleDragTask = React.useCallback(
    (active: { id: string; type: 'task' }, over: { id: string; type: 'column' | 'task' }): void => {
      const activeTask = tasks.get(active.id);

      // Active task and might no longer exist
      if (!activeTask) {
        return;
      }

      const activeColumn = columns.get(activeTask.columnId);

      // Active column might no longer exist
      if (!activeColumn) {
        return;
      }

      // Dropped over a column
      if (over.type === 'column') {
        // Dropped on the same column, reorder at the end
        if (activeTask.columnId === over.id) {
          const updatedActiveColumn = {
            ...activeColumn,
            taskIds: [...activeColumn.taskIds.filter((taskId) => taskId !== activeTask.id), activeTask.id],
          } satisfies Column;

          const updatedColumns = new Map<string, Column>(columns);

          updatedColumns.set(updatedActiveColumn.id, updatedActiveColumn);

          // Dispatch update
          setColumns(updatedColumns);
        }
        // Dropped in a different column, move at the end
        else {
          const overColumn = columns.get(over.id);

          // Over column might no longer exist
          if (!overColumn) {
            return;
          }

          // Change task column
          const updatedActiveTask = { ...activeTask, columnId: overColumn.id } satisfies Task;

          const updatedTasks = new Map<string, Task>(tasks);

          updatedTasks.set(updatedActiveTask.id, updatedActiveTask);

          // Remove task from active column
          const updatedActiveColumn = {
            ...activeColumn,
            taskIds: activeColumn.taskIds.filter((taskId) => taskId !== activeTask.id),
          } satisfies Column;

          // Add task to over column
          const updatedOverColumn = { ...overColumn, taskIds: [...overColumn.taskIds, activeTask.id] } satisfies Column;

          const updatedColumns = new Map<string, Column>(columns);

          updatedColumns.set(updatedActiveColumn.id, updatedActiveColumn);
          updatedColumns.set(updatedOverColumn.id, updatedOverColumn);

          // Dispatch update
          setTasks(updatedTasks);
          setColumns(updatedColumns);
        }
      }
      // Dropped over a task
      else {
        // Dropped over self
        if (activeTask.id === over.id) {
          return;
        }

        const overTask = tasks.get(over.id);

        // Over task might no longer exist
        if (!overTask) {
          return;
        }

        // Dropped on the same column, reorder
        if (activeTask.columnId === overTask.columnId) {
          const oldTaskIndex = activeColumn.taskIds.findIndex((taskId) => taskId === activeTask.id);
          const newTaskIndex = activeColumn.taskIds.findIndex((taskId) => taskId === overTask.id);

          const updatedActiveColumn = {
            ...activeColumn,
            taskIds: arrayMove(activeColumn.taskIds, oldTaskIndex, newTaskIndex),
          } satisfies Column;

          const updatedColumns = new Map<string, Column>(columns);

          updatedColumns.set(updatedActiveColumn.id, updatedActiveColumn);

          // Dispatch update
          setColumns(updatedColumns);
        }
        // Dopped on a different column, move at position
        else {
          const overColumn = columns.get(overTask.columnId);

          // Column might no longer exist
          if (!overColumn) {
            return;
          }

          // Change task column
          const updatedActiveTask = { ...activeTask, columnId: overColumn.id } satisfies Task;

          const updatedTasks = new Map<string, Task>(tasks);

          updatedTasks.set(updatedActiveTask.id, updatedActiveTask);

          // Find new task position
          const overTaskIndex = overColumn.taskIds.findIndex((taskId) => taskId === overTask.id);

          // Remove task from active column
          const updatedActiveColumn = {
            ...activeColumn,
            taskIds: activeColumn.taskIds.filter((taskId) => taskId !== activeTask.id),
          } satisfies Column;

          // Add task to over column at position
          const updatedOverColumn = {
            ...overColumn,
            taskIds: arrayInsert(overColumn.taskIds, overTaskIndex, activeTask.id),
          } satisfies Column;

          const updatedColumns = new Map<string, Column>(columns);

          updatedColumns.set(updatedActiveColumn.id, updatedActiveColumn);
          updatedColumns.set(updatedOverColumn.id, updatedOverColumn);

          // Dispatch update
          setTasks(updatedTasks);
          setColumns(updatedColumns);
        }
      }
    },
    [columns, tasks]
  );

  const handleCreateTask = React.useCallback(
    (columnId: string): void => {
      const column = columns.get(columnId);

      // Column might no longer exist
      if (!column) {
        return;
      }

      // Create the new task
      const task = {
        id: `TSK-${Date.now()}`,
        author: { id: 'USR-000', name: 'PP Namias', username: 'sofia.rivers', avatar: '/assets/avatar.jpg' },
        title: 'Untitled',
        columnId,
        createdAt: new Date(),
      } satisfies Task;

      const updatedTasks = new Map<string, Task>(tasks);

      // Add it to the tasks
      updatedTasks.set(task.id, task);

      // Add the task to the column
      const updatedColumn = { ...column, taskIds: [task.id, ...column.taskIds] } satisfies Column;

      const updatedColumns = new Map<string, Column>(columns);

      updatedColumns.set(updatedColumn.id, updatedColumn);

      // Dispatch update
      setTasks(updatedTasks);
      setColumns(updatedColumns);
    },
    [columns, tasks]
  );

  const handleDeleteTask = React.useCallback(
    (taskId: string): void => {
      const task = tasks.get(taskId);

      // Task might no longer exist
      if (!task) {
        return;
      }

      const updatedTasks = new Map<string, Task>(tasks);

      // Delete the task
      updatedTasks.delete(task.id);

      const updatedColumns = new Map<string, Column>(columns);

      // Delete the task ID from column
      const column = updatedColumns.get(task.columnId);

      // Column might no longer exist
      if (column) {
        const updatedColumn = { ...column, taskId: column.taskIds.filter((id) => id !== task.id) };

        updatedColumns.set(updatedColumn.id, updatedColumn);
      }

      // Dispatch update
      setColumns(updatedColumns);
      setTasks(updatedTasks);
    },
    [columns, tasks]
  );

  const handleUpdateTask = React.useCallback(
    (taskId: string, { title, description }: { title?: string; description?: string }): void => {
      const task = tasks.get(taskId);

      // Task might no longer exist
      if (!task) {
        return;
      }

      const updatedTasks = new Map<string, Task>(tasks);

      const updatedTask = { ...task };

      // Title changed
      if (typeof title !== 'undefined') {
        updatedTask.title = title;
      }

      // Description changed
      if (typeof description !== 'undefined') {
        updatedTask.description = description;
      }

      updatedTasks.set(updatedTask.id, updatedTask);

      // Dispatch update
      setTasks(updatedTasks);
    },
    [tasks]
  );

  const handleAddComment = React.useCallback(
    (taskId: string, content: string): void => {
      const task = tasks.get(taskId);

      // Task might no longer exist
      if (!task) {
        return;
      }

      // Copy existing tasks
      const updatedTasks = new Map<string, Task>(tasks);

      // Create the comment and add it to the task
      const comment = {
        id: `MSG-${Date.now()}`,
        author: { id: 'USR-000', name: 'PP Namias', username: 'sofia.rivers', avatar: '/assets/avatar.jpg' },
        content,
        createdAt: new Date(),
      } satisfies Comment;

      updatedTasks.set(task.id, { ...task, comments: [...(task.comments ?? []), comment] });

      // Dispatch update
      setTasks(updatedTasks);
    },
    [tasks]
  );

  return (
    <TasksContext.Provider
      value={{
        columns,
        tasks,
        currentColumnId,
        currentTaskId,
        setCurrentColumnId,
        setCurrentTaskId,
        createColumn: handleCreateColumn,
        updateColumn: handleUpdateColumn,
        clearColumn: handleClearColumn,
        deleteColumn: handleDeleteColumn,
        dragTask: handleDragTask,
        createTask: handleCreateTask,
        deleteTask: handleDeleteTask,
        updateTask: handleUpdateTask,
        addComment: handleAddComment,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const TasksConsumer = TasksContext.Consumer;

function arrayMove<T = unknown>(arr: T[], from: number, to: number): T[] {
  const copy = [...arr];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

function arrayInsert<T = unknown>(arr: T[], index: number, item: T): T[] {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
}
