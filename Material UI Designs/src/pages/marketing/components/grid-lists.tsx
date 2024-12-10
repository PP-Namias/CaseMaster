import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { GridList1 } from '@/components/widgets/grid-lists/grid-list-1';
import { GridList2 } from '@/components/widgets/grid-lists/grid-list-2';
import { GridList3 } from '@/components/widgets/grid-lists/grid-list-3';
import { GridList4 } from '@/components/widgets/grid-lists/grid-list-4';
import { GridList5 } from '@/components/widgets/grid-lists/grid-list-5';
import { GridList6 } from '@/components/widgets/grid-lists/grid-list-6';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';

const metadata = { title: `Grid lists | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Grid list 1', element: <GridList1 /> },
  { title: 'Grid list 2', element: <GridList2 /> },
  { title: 'Grid list 3', element: <GridList3 /> },
  { title: 'Grid list 4', element: <GridList4 /> },
  { title: 'Grid list 5', element: <GridList5 /> },
  { title: 'Grid list 6', element: <GridList6 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Grid lists" />
    </React.Fragment>
  );
}
