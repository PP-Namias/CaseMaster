import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '../../types/metadata';
import { config } from '../../config';
import { ThreadsView } from '../../components/dashboard/mail/threads-view';

const metadata = { title: `Mail | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ThreadsView />
    </React.Fragment>
  );
}
