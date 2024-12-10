export interface Post {
  id: string;
  author: { name: string; avatar?: string };
  content?: string;
  media?: string;
  comments: Comment[];
  isLiked: boolean;
  likes: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: { name: string; avatar?: string };
  createdAt: Date;
}
