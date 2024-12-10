import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Faq } from './faq';

const faqs = [
  {
    id: 'FAQ-5',
    question: 'Do you have a free demo to review the code before purchasing?',
    answer:
      'Yes, you can check out our open source dashboard template which should give you an overview of the code quality and folder structure. Keep in mind that some aspects may differ from this Paid version.',
  },
  {
    id: 'FAQ-4',
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
    id: 'FAQ-2',
    question: 'What browsers does the template support?',
    answer:
      "The components in MUI are designed to work in the latest, stable releases of all major browsers, including Chrome, Firefox, Safari, and Edge. We don't support Internet Explorer 11.",
  },
  {
    id: 'FAQ-1',
    question: 'For what kind of projects is the Standard license intended?',
    answer:
      'The Standard license is designed for internal applications in which staff will access the application. An example could be the back-office dashboard of a public-facing e-commerce website in which staff would sign in and manage inventory, customers, etc.',
  },
] satisfies { id: string; question: string; answer: string }[];

export function Faqs(): React.JSX.Element {
  return (
    <Box sx={{ py: '120px' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <Stack spacing={2}>
              <Typography variant="h3">Everything you need to know</Typography>
              <Typography color="text.secondary" variant="subtitle2">
                Frequently asked questions
              </Typography>
            </Stack>
          </Grid>
          <Grid md={6} xs={12}>
            <Stack spacing={3}>
              {faqs.map((faq) => (
                <Faq key={faq.id} {...faq} />
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
