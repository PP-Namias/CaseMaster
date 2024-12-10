import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { DetailList1 } from '@/components/widgets/detail-lists/detail-list-1';
import { DetailList2 } from '@/components/widgets/detail-lists/detail-list-2';
import { DetailList3 } from '@/components/widgets/detail-lists/detail-list-3';
import { DetailList4 } from '@/components/widgets/detail-lists/detail-list-4';
import { DetailList5 } from '@/components/widgets/detail-lists/detail-list-5';
import { DetailList6 } from '@/components/widgets/detail-lists/detail-list-6';
import { DetailList7 } from '@/components/widgets/detail-lists/detail-list-7';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';

const metadata = { title: `Detail lists | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Detail list 1', element: <DetailList1 /> },
  { title: 'Detail list 2', element: <DetailList2 /> },
  { title: 'Detail list 3', element: <DetailList3 /> },
  { title: 'Detail list 4', element: <DetailList4 /> },
  { title: 'Detail list 5', element: <DetailList5 /> },
  { title: 'Detail list 6', element: <DetailList6 /> },
  { title: 'Detail list 7', element: <DetailList7 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Detail lists" />
    </React.Fragment>
  );
}
