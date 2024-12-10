import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { Colors1 } from '@/components/widgets/colors/colors-1';
import { Colors2 } from '@/components/widgets/colors/colors-2';
import { Colors3 } from '@/components/widgets/colors/colors-3';
import { Colors4 } from '@/components/widgets/colors/colors-4';
import { Colors5 } from '@/components/widgets/colors/colors-5';
import { Colors6 } from '@/components/widgets/colors/colors-6';
import { Colors7 } from '@/components/widgets/colors/colors-7';
import { Colors8 } from '@/components/widgets/colors/colors-8';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';

const metadata = { title: `Colors | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { element: <Colors1 />, title: 'Text colors' },
  { element: <Colors2 />, title: 'Primary colors' },
  { element: <Colors3 />, title: 'Secondary colors' },
  { element: <Colors4 />, title: 'Success colors' },
  { element: <Colors5 />, title: 'Info colors' },
  { element: <Colors6 />, title: 'Warning colors' },
  { element: <Colors7 />, title: 'Error colors' },
  { element: <Colors8 />, title: 'Neutral colors' },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Colors" />
    </React.Fragment>
  );
}
