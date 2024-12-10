'use client';

import * as React from 'react';
import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import stylisRTLPlugin from 'stylis-plugin-rtl';

import type { Direction } from '@/styles/theme/types';

function styleCache(): EmotionCache {
  return createCache({ key: 'rtl', prepend: true, stylisPlugins: [stylisRTLPlugin] });
}

export interface RTLProps {
  children: React.ReactNode;
  direction?: Direction;
}

export function Rtl({ children, direction = 'ltr' }: RTLProps): React.JSX.Element {
  React.useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === 'rtl') {
    return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
