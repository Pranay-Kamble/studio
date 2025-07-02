import type { LucideIcon } from 'lucide-react';

export type User = {
  id: string;
  name: string;
  avatar: string;
  collegeId?: string;
};

export type Subject = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export type Tag = {
  id: string;
  name: string;
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf' | 'other';
};

export type Answer = {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  attachments: Attachment[];
  summary?: string;
};

export type Question = {
  id: string;
  title: string;
  content: string;
  author: User;
  subject: Subject;
  tags: Tag[];
  answers: Answer[];
  attachments: Attachment[];
  createdAt: Date;
};
