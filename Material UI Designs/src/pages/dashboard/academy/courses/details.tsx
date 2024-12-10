import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { ChapterView } from '@/components/dashboard/academy/chapter-view';
import { CourseSummary } from '@/components/dashboard/academy/course-summary';
import type { Chapter, Course } from '@/components/dashboard/academy/types';

const metadata = { title: `Course | Academy | ${config.site.name}` } satisfies Metadata;

const course = {
  id: 'CRS-001',
  title: 'React and Redux Tutorial',
  description: 'Introductory course for design and framework basics',
  duration: '78 hours',
  progress: 50,
} satisfies Course;

const chapters = [
  { id: 'CHAP-001', number: 1, title: 'Introduction', description: 'Introducing the app and how it works', lesson: '' },
  {
    id: 'CHAP-002',
    number: 2,
    title: 'Installing required packages',
    description: 'Installing the required packages for the project',
    lesson: `Alias animi labque, deserunt distinctio eum excepturi fuga iure labore magni molestias mollitia natus, officia pofro quis sunt 
temporibus veritatis voluptatem, voluptatum. Aut blanditiis esse et illum maxim, obcaecati possimus voluptate! Accusamus adipisci 
amet aperiam, assumenda consequuntur fugiat inventore iusto magnam molestias natus necessitatibus, nulla pariatur.

Adipisci alias animi debitis eos et impedit maiores, modi nam nobis officia optio perspiciatis, rerum. Accusantium esse nostrum odit quis quo:

\`\`\`ts
const mongoose = require('mongoose'),
const uniqueValidator = require('mongoose-unique-validator'),
const bcrypt = require('bcrypt'),

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const Email = new Schema({  address: {    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\\S+@\\S+\\.\\S+/, 'is invalid'],
    index: true,
  },
  // Change the default to true if you don't need to validate a new user's email address
  validated: { type: Boolean, default: false },
});
\`\`\``,
  },
  {
    id: 'CHAP-003',
    number: 3,
    title: 'Setting up the project',
    description: "Structuring the project's folders and files",
    lesson: '',
  },
] satisfies Chapter[];

export function Page(): React.JSX.Element {
  const currentChapter = chapters[1];

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <Grid container spacing={4}>
          <Grid md={4} xs={12}>
            <Stack spacing={3}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.academy.browse}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Academy
                </Link>
              </div>
              <CourseSummary chapters={chapters} course={course} currentChapterNumber={currentChapter.number} />
            </Stack>
          </Grid>
          <Grid md={8} xs={12}>
            <ChapterView chapter={currentChapter} />
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
