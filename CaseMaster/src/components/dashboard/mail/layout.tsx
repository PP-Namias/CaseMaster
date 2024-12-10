import * as React from 'react';
import { useParams } from 'react-router-dom';

import dayjs from 'dayjs';
import { MailProvider } from '../mail/mail-context';
import { MailView } from './mail-view';
import type { Label, Thread } from './types';

function filterThreads(threads: Thread[], labelId: string): Thread[] {
  return threads.filter((thread) => {
    if (['inbox', 'sent', 'drafts', 'trash'].includes(labelId)) {
      return thread.folder === labelId;
    }

    if (labelId === 'important') {
      return thread.isImportant;
    }

    if (labelId === 'starred') {
      return thread.isStarred;
    }

    if (thread.labels.includes(labelId)) {
      return true;
    }

    return false;
  });
}

const labels = [
  { id: 'inbox', type: 'system', name: 'Inbox', unreadCount: 1, totalCount: 0 },
  { id: 'sent', type: 'system', name: 'Sent', unreadCount: 0, totalCount: 0 },
  { id: 'trash', type: 'system', name: 'Archive', unreadCount: 0, totalCount: 1 },
  { id: 'important', type: 'system', name: 'Important', unreadCount: 0, totalCount: 1 },
  { id: 'starred', type: 'system', name: 'Starred', unreadCount: 1, totalCount: 1 },
  { id: 'civil', type: 'custom', name: 'Civil Cases', color: '#43A048', unreadCount: 0, totalCount: 1 },
  { id: 'motions', type: 'custom', name: 'Motions', color: '#1E88E5', unreadCount: 1, totalCount: 2 },
  { id: 'special', type: 'custom', name: 'Special Cases', color: '#FB8A00', unreadCount: 0, totalCount: 1 },
] satisfies Label[];

const threads = [
  {
    id: 'TRD-004',
    from: { avatar: '/assets/yvez.jpg', email: 'kendo_counsel@gmail.com', name: 'Kendo Jenner' },
    to: [{ avatar: '/assets/avatar.jpg', email: 'pp.namias@gmail.com', name: 'PP Namias' }],
    subject: 'CHI MING TSOI, petitioner, vs. COURT OF APPEALS, GINA LAO TSOI',
    message: `Good day, Attorney,

It appears that there is absence of empathy between petitioner and private respondent. That is — a shared feeling which between husband and wife must be experienced not only by having spontaneous sexual intimacy but a deep sense of spiritual communion. Marital union is a two-way process. An expressive interest in each other's feelings at a time it is needed by the other can go a long way in deepening the marital relationship. Marriage is definitely not for children but for two consenting adults who view the relationship with love amor gignit amorem, respect, sacrifice and a continuing commitment to compromise, conscious of its value as a sublime social institution.

IN VIEW OF THE FOREGOING PREMISES, the assailed decision of the Court of Appeals dated November 29, 1994 is hereby AFFIRMED in all respects and the petition is hereby DENIED for lack of merit.

Looking forward to hearing from you soon.

Best regards,

Kendo Jenner`,
    attachments: 
    [
      { id: 'ATT-002', name: '101424_motion_recon.pdf', size: '782.3 KB', type: 'file', url: 'https://docs.google.com/document/d/1PJTN1G_Xvw1sd8hHm6_zwPhxGJbaoe7waLocHcgH8XQ/edit?usp=sharing ' },
      { id: 'ATT-003', name: '2nd file format.pdf', size: '782.3 KB', type: 'file', url: 'https://docs.google.com/document/d/1PJTN1G_Xvw1sd8hHm6_zwPhxGJbaoe7waLocHcgH8XQ/edit?usp=sharing ' },
    ],
    folder: 'inbox',
    labels: ['civil', 'motions'],
    isImportant: true,
    isStarred: false,
    isUnread: true,
    createdAt: dayjs().subtract(3, 'hour').toDate(),
  },
  {
    id: 'ATT-004',
    from: { name: 'PP Namias', avatar: '/assets/Namias.png', email: 'penjani.inyene@domain.com' },
    to: [{ name: 'PP Namias', avatar: '/assets/avatar.jpg', email: 'pp.namias@gmail.com' }],
    subject: 'Mailing Test',
    message: `1st line,

message blah blah 
1\n
2 '/n'
3 '\n'
4
5
6
7
8
9
blah.

folder: 'inbox',\n
labels: ['motions'],\n
isImportant: false,\n
isStarred: false,\n
isUnread: false,\n
createdAt: dayjs().subtract(2, 'day').toDate(),\n
`,
    folder: 'inbox',
    labels: ['motions'],
    isImportant: false,
    isStarred: false,
    isUnread: false,
    createdAt: dayjs().subtract(2, 'day').toDate(),
  },
  {
    id: 'ATT-005',
    from: { name: 'Cj Juliane', avatar: '/assets/CJ.jpg', email: 'cj.juliane@gmail.com' },
    to: [{ name: 'PP Namias', avatar: '/assets/avatar.jpg', email: 'pp.namias@gmail.com' }],
    subject: 'Mail archive',
    message: `this message must be on archieved-ish or trash idk \n
    folder: 'archive',\n
    labels: ['special'],\n
    isImportant: false,\n
    isStarred: false,\n
    isUnread: true,\n
    createdAt: dayjs().subtract(2, 'day').toDate(),

    
    `,
    folder: 'trash',
    labels: ['special'],
    isImportant: false,
    isStarred: false,
    isUnread: true,
    createdAt: dayjs().subtract(2, 'day').toDate(),
  },
] satisfies Thread[];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const { labelId } = useParams() as { labelId: string };

  const filteredThreads = filterThreads(threads, labelId);

  return (
    <MailProvider currentLabelId={labelId} labels={labels} threads={filteredThreads}>
      <MailView>{children}</MailView>
    </MailProvider>
  );
}
