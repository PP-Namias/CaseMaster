import * as React from 'react';
import Box from '@mui/material/Box';
import Markdown from 'react-markdown';
import type { Components } from 'react-markdown';

import { CodeHighlighter } from '@/components/core/code-highlighter';

const components = { code: CodeHighlighter as Components['code'] } satisfies Components;

export interface LessonProps {
  content: string;
}

export function Lesson({ content }: LessonProps): React.JSX.Element {
  return (
    <Box
      sx={{
        '& h2': { fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.2, mb: 3 },
        '& h3': { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.2, mb: 3 },
        '& p': { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5, mb: 2, mt: 0 },
      }}
    >
      <Markdown components={components}>{content}</Markdown>
    </Box>
  );
}
