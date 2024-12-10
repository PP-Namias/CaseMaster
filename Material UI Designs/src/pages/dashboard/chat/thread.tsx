import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { ThreadView } from '@/components/dashboard/chat/thread-view';
import type { ThreadType } from '@/components/dashboard/chat/types';

const metadata = { title: `Thread | Chat | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
  const { threadId, threadType } = useParams() as { threadId: string; threadType: ThreadType };

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ThreadView threadId={threadId} threadType={threadType} />
    </React.Fragment>
  );
}
