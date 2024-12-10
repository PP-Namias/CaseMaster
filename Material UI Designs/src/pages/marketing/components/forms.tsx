import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { Form1 } from '@/components/widgets/forms/form-1';
import { Form2 } from '@/components/widgets/forms/form-2';
import { Form3 } from '@/components/widgets/forms/form-3';
import { Form4 } from '@/components/widgets/forms/form-4';
import { Form5 } from '@/components/widgets/forms/form-5';
import { Form6 } from '@/components/widgets/forms/form-6';
import { Form7 } from '@/components/widgets/forms/form-7';
import { Form8 } from '@/components/widgets/forms/form-8';
import { Form9 } from '@/components/widgets/forms/form-9';
import { Form10 } from '@/components/widgets/forms/form-10';
import { Form11 } from '@/components/widgets/forms/form-11';
import { Form12 } from '@/components/widgets/forms/form-12';
import { Form13 } from '@/components/widgets/forms/form-13';
import { Form14 } from '@/components/widgets/forms/form-14';
import { Form15 } from '@/components/widgets/forms/form-15';
import { Form16 } from '@/components/widgets/forms/form-16';
import { Layout } from '@/components/widgets/layout';
import type { Component } from '@/components/widgets/layout';

const metadata = { title: `Forms | Components | ${config.site.name}` } satisfies Metadata;

const components = [
  { title: 'Form 1', element: <Form1 /> },
  { title: 'Form 2', element: <Form2 /> },
  { title: 'Form 3', element: <Form3 /> },
  { title: 'Form 4', element: <Form4 /> },
  { title: 'Form 5', element: <Form5 /> },
  { title: 'Form 6', element: <Form6 /> },
  { title: 'Form 7', element: <Form7 /> },
  { title: 'Form 8', element: <Form8 /> },
  { title: 'Form 9', element: <Form9 /> },
  { title: 'Form 10', element: <Form10 /> },
  { title: 'Form 11', element: <Form11 /> },
  { title: 'Form 12', element: <Form12 /> },
  { title: 'Form 13', element: <Form13 /> },
  { title: 'Form 14', element: <Form14 /> },
  { title: 'Form 15', element: <Form15 /> },
  { title: 'Form 16', element: <Form16 /> },
] satisfies Component[];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Layout components={components} title="Forms" />
    </React.Fragment>
  );
}
