import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { TasksProvider } from '@/components/dashboard/tasks/tasks-context';
import { TasksView } from '@/components/dashboard/tasks/tasks-view';
import type { Column, Task } from '@/components/dashboard/tasks/types';

const metadata = { title: `Tasks | Dashboard | ${config.site.name}` } satisfies Metadata;

const columns = [
  { id: 'COL-001', name: 'Todo', taskIds: ['TSK-001', 'TSK-002'] },
  { id: 'COL-002', name: 'Progress', taskIds: [] },
  { id: 'COL-003', name: 'Done', taskIds: ['TSK-003', 'TSK-004'] },
] satisfies Column[];

const tasks = [
  {
    id: 'TSK-001',
    author: { id: 'USR-000', name: 'PP Namias', username: 'sofia.rivers', avatar: '/assets/avatar.jpg' },
    title: 'Update the customer API for payments',
    description: 'Stripe has a new API version, we need to update it to the latest version',
    columnId: 'COL-001',
    createdAt: dayjs().subtract(8, 'day').toDate(),
    labels: ['Business', 'Design'],
    subscribed: true,
    dueDate: dayjs().add(7, 'day').toDate(),
    assignees: [{ id: 'USR-007', name: 'Nasimiyu Danai', username: 'nasimiyu.danai', avatar: '/assets/avatar-7.png' }],
    attachments: [
      {
        id: 'ATT-001',
        name: 'image-abstract-1.png',
        extension: 'png',
        url: '/assets/image-abstract-1.png',
        size: '24.8 KB',
      },
    ],
    subtasks: [
      { id: 'STSK-001', title: 'Create a logo', done: true },
      { id: 'STSK-002', title: 'Create text styles', done: true },
      { id: 'STSK-003', title: 'Create color styles', done: true },
      { id: 'STSK-004', title: 'Create effect styles', done: false },
      { id: 'STSK-005', title: 'Create multiple elements', done: false },
    ],
    comments: [
      {
        id: 'MSG-001',
        author: { id: 'USR-007', name: 'Nasimiyu Danai', username: 'nasimiyu.danai', avatar: '/assets/avatar-7.png' },
        createdAt: dayjs().subtract(5, 'day').toDate(),
        content: 'Hi, I have updated the API to the latest version.',
        comments: [
          {
            id: 'MSG-002',
            author: { id: 'USR-000', name: 'PP Namias', username: 'sofia.rivers', avatar: '/assets/avatar.jpg' },
            createdAt: dayjs().subtract(4, 'day').toDate(),
            content: 'Great! Thanks for the update.',
          },
        ],
      },
    ],
  },
  {
    id: 'TSK-002',
    author: { id: 'USR-005', name: 'Fran Perez', username: 'fran.perez', avatar: '/assets/avatar-5.png' },
    title: 'Fix the responsive issues on the home page',
    description: 'On mobile devices it looks a bit off, need to fix it',
    columnId: 'COL-001',
    createdAt: dayjs().subtract(2, 'day').toDate(),
    dueDate: dayjs().add(6, 'day').toDate(),
    subscribed: true,
    assignees: [
      { id: 'USR-005', name: 'Fran Perez', username: 'fran.perez', avatar: '/assets/avatar-5.png' },
      { id: 'USR-007', name: 'Nasimiyu Danai', username: 'nasimiyu.danai', avatar: '/assets/avatar-7.png' },
    ],
    attachments: [],
    subtasks: [],
    comments: [],
  },
  {
    id: 'TSK-003',
    author: { id: 'USR-009', name: 'Kendo Jenner', username: 'marcus.finn', avatar: '/assets/yvez.jpg' },
    title: 'Setup onboarding tour for new users',
    columnId: 'COL-003',
    createdAt: dayjs().subtract(3, 'day').toDate(),
    assignees: [
      { id: 'USR-003', name: 'Cj Juliane', username: 'carson.darrin', avatar: '/assets/CJ.jpg' },
      { id: 'USR-000', name: 'PP Namias', username: 'sofia.rivers', avatar: '/assets/avatar.jpg' },
    ],
    attachments: [],
    subtasks: [
      { id: 'STSK-006', title: 'Create a new user flow', done: true },
      { id: 'STSK-008', title: 'Create an organization settings step', done: false },
    ],
    comments: [],
  },
  {
    id: 'TSK-004',
    author: { id: 'USR-003', name: 'Cj Juliane', username: 'carson.darrin', avatar: '/assets/CJ.jpg' },
    title: 'Follow up with Devias team',
    description: 'We need to finish the project as soon as possible',
    columnId: 'COL-003',
    createdAt: dayjs().subtract(3, 'day').toDate(),
    subscribed: true,
    assignees: [{ id: 'USR-009', name: 'Kendo Jenner', username: 'marcus.finn', avatar: '/assets/yvez.jpg' }],
    attachments: [],
    subtasks: [],
    comments: [
      {
        id: 'MSG-003',
        author: { id: 'USR-003', name: 'Cj Juliane', username: 'carson.darrin', avatar: '/assets/CJ.jpg' },
        createdAt: dayjs().subtract(2, 'day').toDate(),
        content: 'Marcus, can you please follow up with the Devias team?',
      },
    ],
  },
] satisfies Task[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <TasksProvider columns={columns} tasks={tasks}>
        <TasksView />
      </TasksProvider>
    </React.Fragment>
  );
}
