export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  isActive: boolean;
  lastActivity?: Date;
}

export type ThreadType = 'direct' | 'group';

export interface Thread {
  id: string;
  type: ThreadType;
  participants: Participant[];
  unreadCount: number;
}

export interface Participant {
  id: string;
  name: string;
  avatar?: string;
}

export type MessageType = 'text' | 'image';

export interface Message {
  id: string;
  threadId: string;
  type: MessageType;
  content: string;
  author: { id: string; name: string; avatar?: string };
  createdAt: Date;
}
