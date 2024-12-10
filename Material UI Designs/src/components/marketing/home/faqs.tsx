'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Question as QuestionIcon } from '@phosphor-icons/react/dist/ssr/Question';

const faqs = [
  {
    id: 'FAQ-1',
    question: 'Do you have a free demo to review the code before purchasing?',
    answer:
      'Yes, you can check out our open source dashboard template which should give you an overview of the code quality and folder structure. Keep in mind that some aspects may differ from this Paid version.',
  },
  {
    id: 'FAQ-2',
    question: 'How many projects can I build with Devias Kit PRO?',
    answer:
      "The license is per project (domain), but if you intend to develop an unknown number of projects feel free to contact us and we'll find a solution.",
  },
  {
    id: 'FAQ-3',
    question: 'How many projects can I build with this template?',
    answer:
      'Absolutely! If you intend to charge users for using your product Extended license is created specifically for this context.',
  },
  {
    id: 'FAQ-4',
    question: 'What browsers does the template support?',
    answer:
      "The components in MUI are designed to work in the latest, stable releases of all major browsers, including Chrome, Firefox, Safari, and Edge. We don't support Internet Explorer 11.",
  },
  {
    id: 'FAQ-5',
    question: 'For what kind of projects is the Standard license intended?',
    answer:
      'The Standard license is designed for internal applications in which staff will access the application. An example could be the back-office dashboard of a public-facing e-commerce website in which staff would sign in and manage inventory, customers, etc.',
  },
] satisfies { id: string; question: string; answer: string }[];

export function Faqs(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', py: '120px' }}>
      <Container maxWidth="md">
        <Stack spacing={8}>
          <Stack maxWidth="700px" sx={{ mx: 'auto' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chip color="primary" icon={<QuestionIcon />} label="FAQ" variant="soft" />
              </Box>
              <Typography sx={{ textAlign: 'center' }} variant="h3">
                Questions we get asked
              </Typography>
              <Typography color="text.secondary">
                Have another question you do not see here? Contact us by{' '}
                <Box
                  component="a"
                  href="mailto:support@deviasio.zendesk.com"
                  sx={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  email
                </Box>
                .
              </Typography>
            </Stack>
          </Stack>
          <Stack spacing={2}>
            {faqs.map((faq) => (
              <Faq key={faq.id} {...faq} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export interface FaqProps {
  answer: string;
  question: string;
}

function Faq({ answer, question }: FaqProps): React.JSX.Element {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  return (
    <Card sx={{ p: 3 }}>
      <Stack
        onClick={() => {
          setIsExpanded((prevState) => !prevState);
        }}
        sx={{ cursor: 'pointer' }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">{question}</Typography>
          {isExpanded ? <CaretDownIcon /> : <CaretRightIcon />}
        </Stack>
        <Collapse in={isExpanded}>
          <Typography color="text.secondary" sx={{ pt: 3 }} variant="body2">
            {answer}
          </Typography>
        </Collapse>
      </Stack>
    </Card>
  );
}
