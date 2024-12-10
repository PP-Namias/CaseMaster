import * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type { DnDData } from './types';

export interface TaskDraggableProps {
  children: React.ReactNode;
  id: string;
}

export function TaskDraggable({ children, id }: TaskDraggableProps): React.JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    data: { type: 'task' } satisfies DnDData,
  });

  const style = { transform: CSS.Transform.toString(transform), transition, ...(isDragging && { opacity: 0 }) };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
