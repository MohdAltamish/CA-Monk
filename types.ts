
export type Category = 'FINANCE' | 'TECH' | 'CAREER' | 'REGULATIONS' | 'SKILLS' | 'TAXATION' | 'DEVELOPMENT';

export interface Blog {
  id: number;
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}

export interface NewBlog {
  title: string;
  category: string[];
  description: string;
  date: string;
  coverImage: string;
  content: string;
}
