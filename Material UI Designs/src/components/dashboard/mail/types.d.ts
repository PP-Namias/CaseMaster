export interface Attachment {
  id: string;
  type: 'file' | 'image';
  name?: string;
  size?: string;
  url?: string;
}

export interface Sender {
  name: string;
  avatar?: string;
  email: string;
}

export interface Receiver {
  name: string;
  avatar?: string;
  email: string;
}

export interface Thread {
  id: string;
  from: Sender;
  to: Receiver[];
  subject: string;
  message: string;
  attachments?: Attachment[];
  folder: Folder;
  labels: string[];
  isImportant: boolean;
  isStarred: boolean;
  isUnread: boolean;
  createdAt: Date;
}

export type Folder = 'inbox' | 'sent' | 'drafts' | 'spam' | 'trash';

export type LabelType = 'system' | 'custom';

export interface Label {
  id: string;
  type: LabelType;
  name: string;
  color?: string;
  unreadCount?: number;
  totalCount?: number;
}
