export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  media?: string;
  progress: number;
}

export interface Chapter {
  id: string;
  number: number;
  description: string;
  lesson: string;
  title: string;
}
