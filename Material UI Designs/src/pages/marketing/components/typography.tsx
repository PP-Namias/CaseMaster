import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';
import { Typography1 } from '@/components/widgets/typography/typography-1';

const metadata = { title: `Typography | Components | ${config.site.name}` } satisfies Metadata;

const components = [{ title: 'Typography 1', element: <Typography1 /> }] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Typography" />
    </React.Fragment>
  );
}
