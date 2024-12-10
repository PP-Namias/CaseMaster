export interface Post {
  id: string;
  title: string;
  description: string;
  content?: string;
  cover: string;
  category: string;
  author: { name: string; avatar?: string };
  readTime: string;
  publishedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: { name: string; avatar?: string };
  createdAt: Date;
}
