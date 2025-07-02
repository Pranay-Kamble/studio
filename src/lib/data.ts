import type { User, Subject, Tag, Question } from './types';
import { Book, FlaskConical, Code, Sigma, History } from 'lucide-react';

export const users: User[] = [
  { id: 'user-1', name: 'Alice', avatar: 'https://placehold.co/40x40.png?text=A' },
  { id: 'user-2', name: 'Bob', avatar: 'https://placehold.co/40x40.png?text=B' },
  { id: 'user-3', name: 'Charlie', avatar: 'https://placehold.co/40x40.png?text=C' },
  { id: 'user-4', name: 'Diana', avatar: 'https://placehold.co/40x40.png?text=D' },
];

export const subjects: Subject[] = [
  { id: 'subj-1', name: 'Literature', icon: Book },
  { id: 'subj-2', name: 'Chemistry', icon: FlaskConical },
  { id: 'subj-3', name: 'Computer Science', icon: Code },
  { id: 'subj-4', name: 'Mathematics', icon: Sigma },
  { id: 'subj-5', name: 'History', icon: History },
];

export const tags: Tag[] = [
  { id: 'tag-1', name: 'calculus' },
  { id: 'tag-2', name: 'react' },
  { id: 'tag-3', name: 'shakespeare' },
  { id: 'tag-4', name: 'organic-chemistry' },
  { id: 'tag-5', name: 'data-structures' },
  { id: 'tag-6', name: 'world-war-2' },
];

export const questions: Question[] = [
  {
    id: 'q-1',
    title: 'How to solve this differential equation?',
    content: 'I am struggling with the following problem: y\'\' - 2y\' + y = e^t. I have tried using the method of undetermined coefficients but I am getting stuck. Can someone walk me through the steps?',
    author: users[0],
    subject: subjects[3],
    tags: [tags[0]],
    attachments: [],
    createdAt: new Date(2023, 10, 15, 10, 30, 0),
    answers: [
      {
        id: 'a-1-1',
        content: 'First, you need to solve the homogeneous equation r^2 - 2r + 1 = 0, which gives you a repeated root r=1. So the complementary solution is yc = c1*e^t + c2*t*e^t. For the particular solution, since e^t is part of the homogeneous solution, you should try yp = A*t^2*e^t. Differentiating and substituting this back into the original equation should give you the value of A.',
        author: users[1],
        attachments: [],
        createdAt: new Date(2023, 10, 15, 11, 0, 0),
      },
    ],
  },
  {
    id: 'q-2',
    title: 'What is the main theme in Hamlet?',
    content: 'I am writing an essay on Hamlet and need help identifying the central theme. I think it is revenge, but my professor mentioned it is more complex. What are other significant themes to explore?',
    author: users[2],
    subject: subjects[0],
    tags: [tags[2]],
    attachments: [],
    createdAt: new Date(2023, 10, 14, 14, 0, 0),
    answers: [
      {
        id: 'a-2-1',
        content: "While revenge is definitely a major driver of the plot, you could also explore themes of mortality, madness (both real and feigned), and the corrupting nature of power. The 'to be or not to be' soliloquy is a great place to start for the theme of mortality.",
        author: users[0],
        attachments: [],
        createdAt: new Date(2023, 10, 14, 15, 20, 0),
      },
      {
        id: 'a-2-2',
        content: 'I agree. Another key theme is deception and appearance vs. reality. Almost no one in the play is what they seem. Claudius pretends to be a good king, Rosencrantz and Guildenstern pretend to be good friends, and Hamlet himself feigns madness. This constant uncertainty is central to the tragedy.',
        author: users[3],
        attachments: [],
        createdAt: new Date(2023, 10, 14, 16, 5, 0),
      },
    ],
  },
  {
    id: 'q-3',
    title: 'Help with state management in React',
    content: 'I am building a complex application and prop-drilling is becoming a nightmare. What are the best state management solutions for React in 2023? I have heard of Redux, Zustand, and Context API. What are the pros and cons?',
    author: users[3],
    subject: subjects[2],
    tags: [tags[1], tags[4]],
    attachments: [],
    createdAt: new Date(2023, 10, 13, 9, 0, 0),
    answers: [],
  },
];
