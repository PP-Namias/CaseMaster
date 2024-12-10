import * as React from 'react';
import Box from '@mui/material/Box';
import Markdown from 'react-markdown';

export interface DescriptionProps {
  content: string;
}

export function Description({ content }: DescriptionProps): React.JSX.Element {
  return (
    <Box
      sx={{
        '& h2': { fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.2, mb: 3 },
        '& h3': { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.2, mb: 3 },
        '& p': { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5, mb: 2, mt: 0 },
      }}
    >
      <Markdown>{content}</Markdown>
    </Box>
  );
}
