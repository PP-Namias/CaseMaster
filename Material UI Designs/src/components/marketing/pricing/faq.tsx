'use client';

import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';

export interface FaqProps {
  answer: string;
  question: string;
}

export function Faq({ answer, question }: FaqProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <Stack
      onClick={() => {
        setIsExpanded((prevState) => !prevState);
      }}
      spacing={2}
      sx={{ cursor: 'pointer' }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">{question}</Typography>
        {isExpanded ? <CaretDownIcon /> : <CaretRightIcon />}
      </Stack>
      <Collapse in={isExpanded}>
        <Typography color="text.secondary" variant="body2">
          {answer}
        </Typography>
      </Collapse>
    </Stack>
  );
}
