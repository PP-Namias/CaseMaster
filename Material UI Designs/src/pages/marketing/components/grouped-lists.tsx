import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { GroupedList1 } from '@/components/widgets/grouped-lists/grouped-list-1';
import { GroupedList2 } from '@/components/widgets/grouped-lists/grouped-list-2';
import { GroupedList3 } from '@/components/widgets/grouped-lists/grouped-list-3';
import { GroupedList4 } from '@/components/widgets/grouped-lists/grouped-list-4';
import { GroupedList5 } from '@/components/widgets/grouped-lists/grouped-list-5';
import { GroupedList6 } from '@/components/widgets/grouped-lists/grouped-list-6';
import { GroupedList7 } from '@/components/widgets/grouped-lists/grouped-list-7';
import { GroupedList8 } from '@/components/widgets/grouped-lists/grouped-list-8';
import { GroupedList9 } from '@/components/widgets/grouped-lists/grouped-list-9';
import { GroupedList10 } from '@/components/widgets/grouped-lists/grouped-list-10';
import { GroupedList11 } from '@/components/widgets/grouped-lists/grouped-list-11';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';

const metadata = { title: `Grouped lists | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Grouped list 1', element: <GroupedList1 /> },
  { title: 'Grouped list 2', element: <GroupedList2 /> },
  { title: 'Grouped list 3', element: <GroupedList3 /> },
  { title: 'Grouped list 4', element: <GroupedList4 /> },
  { title: 'Grouped list 5', element: <GroupedList5 /> },
  { title: 'Grouped list 6', element: <GroupedList6 /> },
  { title: 'Grouped list 7', element: <GroupedList7 /> },
  { title: 'Grouped list 8', element: <GroupedList8 /> },
  { title: 'Grouped list 9', element: <GroupedList9 /> },
  { title: 'Grouped list 10', element: <GroupedList10 /> },
  { title: 'Grouped list 11', element: <GroupedList11 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Grouped lists" />
    </React.Fragment>
  );
}
