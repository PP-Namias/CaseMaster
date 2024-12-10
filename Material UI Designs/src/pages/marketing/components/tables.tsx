import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import type { Component } from '@/components/widgets/layout';
import { Layout } from '@/components/widgets/layout';
import { Table1 } from '@/components/widgets/tables/table-1';
import { Table2 } from '@/components/widgets/tables/table-2';
import { Table3 } from '@/components/widgets/tables/table-3';
import { Table4 } from '@/components/widgets/tables/table-4';
import { Table5 } from '@/components/widgets/tables/table-5';
import { Table6 } from '@/components/widgets/tables/table-6';
import { Table7 } from '@/components/widgets/tables/table-7';
import { Table8 } from '@/components/widgets/tables/table-8';
import { Table9 } from '@/components/widgets/tables/table-9';
import { Table10 } from '@/components/widgets/tables/table-10';

const metadata = { title: `Tables | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Table 1', element: <Table1 /> },
  { title: 'Table 2', element: <Table2 /> },
  { title: 'Table 3', element: <Table3 /> },
  { title: 'Table 4', element: <Table4 /> },
  { title: 'Table 5', element: <Table5 /> },
  { title: 'Table 6', element: <Table6 /> },
  { title: 'Table 7', element: <Table7 /> },
  { title: 'Table 8', element: <Table8 /> },
  { title: 'Table 9', element: <Table9 /> },
  { title: 'Table 10', element: <Table10 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Tables" />
    </React.Fragment>
  );
}
