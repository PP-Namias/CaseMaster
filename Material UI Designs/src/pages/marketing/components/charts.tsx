import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { Chart1 } from '@/components/widgets/charts/chart-1';
import { Chart2 } from '@/components/widgets/charts/chart-2';
import { Chart3 } from '@/components/widgets/charts/chart-3';
import { Chart4 } from '@/components/widgets/charts/chart-4';
import { Chart5 } from '@/components/widgets/charts/chart-5';
import { Chart6 } from '@/components/widgets/charts/chart-6';
import { Chart7 } from '@/components/widgets/charts/chart-7';
import { Chart8 } from '@/components/widgets/charts/chart-8';
import { Chart9 } from '@/components/widgets/charts/chart-9';
import { Chart10 } from '@/components/widgets/charts/chart-10';
import { Chart11 } from '@/components/widgets/charts/chart-11';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';

const metadata = { title: `Charts | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Chart 1', element: <Chart1 /> },
  { title: 'Chart 2', element: <Chart2 /> },
  { title: 'Chart 3', element: <Chart3 /> },
  { title: 'Chart 4', element: <Chart4 /> },
  { title: 'Chart 5', element: <Chart5 /> },
  { title: 'Chart 6', element: <Chart6 /> },
  { title: 'Chart 7', element: <Chart7 /> },
  { title: 'Chart 8', element: <Chart8 /> },
  { title: 'Chart 9', element: <Chart9 /> },
  { title: 'Chart 10', element: <Chart10 /> },
  { title: 'Chart 11', element: <Chart11 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Charts" />
    </React.Fragment>
  );
}
