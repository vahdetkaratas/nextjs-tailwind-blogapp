export interface Author {
  id?: number;
  name: string;
  email?: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  id: string;
  title: string;
  body: string;
  userId?: number;
  hashtags?: string[];
  categories?: string[];
  author?: Author;
  createdAt?: string;
  updatedAt?: string;
  readTime?: number;
  likes?: number;
  views?: number;
}
