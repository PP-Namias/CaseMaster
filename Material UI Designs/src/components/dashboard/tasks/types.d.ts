export interface DnDData {
  type: 'column' | 'task';
}

export interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  author: { id: string; name: string; username: string; avatar?: string };
  title: string;
  description?: string;
  columnId: string;
  createdAt: Date;
  labels?: string[];
  dueDate?: Date;
  subscribed?: boolean;
  assignees?: Assignee[];
  attachments?: Attachment[];
  subtasks?: Subtask[];
  comments?: Comment[];
}

export interface Assignee {
  id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface Attachment {
  id: string;
  name: string;
  extension: 'png' | 'pdf';
  url: string;
  size: string;
}

export interface Subtask {
  id: string;
  title: string;
  done?: boolean;
}

export interface Comment {
  id: string;
  author: { id: string; name: string; username: string; avatar?: string };
  content: string;
  createdAt: Date;
  comments?: Comment[];
}
