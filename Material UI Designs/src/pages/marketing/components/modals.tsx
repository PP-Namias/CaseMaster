import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';
import { Modal1 } from '@/components/widgets/modals/modal-1';
import { Modal2 } from '@/components/widgets/modals/modal-2';
import { Modal3 } from '@/components/widgets/modals/modal-3';
import { Modal4 } from '@/components/widgets/modals/modal-4';
import { Modal5 } from '@/components/widgets/modals/modal-5';
import { Modal6 } from '@/components/widgets/modals/modal-6';
import { Modal7 } from '@/components/widgets/modals/modal-7';
import { Modal8 } from '@/components/widgets/modals/modal-8';
import { Modal9 } from '@/components/widgets/modals/modal-9';
import { Modal10 } from '@/components/widgets/modals/modal-10';

const metadata = { title: `Modals | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Modal 1', element: <Modal1 /> },
  { title: 'Modal 2', element: <Modal2 /> },
  { title: 'Modal 3', element: <Modal3 /> },
  { title: 'Modal 4', element: <Modal4 /> },
  { title: 'Modal 5', element: <Modal5 /> },
  { title: 'Modal 6', element: <Modal6 /> },
  { title: 'Modal 7', element: <Modal7 /> },
  { title: 'Modal 8', element: <Modal8 /> },
  { title: 'Modal 9', element: <Modal9 /> },
  { title: 'Modal 10', element: <Modal10 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Modals" />
    </React.Fragment>
  );
}
