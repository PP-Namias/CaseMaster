export type ItemType = 'file' | 'folder';

export interface Item {
  id: string;
  type: ItemType;
  name: string;
  extension?: string;
  author?: { name: string; avatar?: string };
  isFavorite?: boolean;
  isPublic?: boolean;
  tags: string[];
  shared: { name: string; avatar?: string }[];
  itemsCount?: number;
  size: string;
  createdAt: Date;
  updatedAt: Date;
}
