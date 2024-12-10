import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

import { Lesson } from './lesson';
import type { Chapter } from './types';

export interface ChapterViewProps {
  chapter: Chapter;
}

export function ChapterView({ chapter }: ChapterViewProps): React.JSX.Element {
  return (
    <Box sx={{ position: 'relative', pb: 6 }}>
      <Card>
        <CardHeader subheader={chapter.description} title={chapter.title} />
        <Tabs sx={{ px: 3 }} value="lesson">
          <Tab label="Lesson" tabIndex={0} value="lesson" />
          <Tab label="Resources" tabIndex={0} value="resources" />
        </Tabs>
        <Divider />
        <CardContent>
          <Lesson content={chapter.lesson} />
        </CardContent>
      </Card>
      <Box
        sx={{
          bottom: 20,
          display: 'flex',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          zIndex: 1,
        }}
      >
        <Card sx={{ boxShadow: 'var(--mui-shadows-16)' }}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center', p: 1 }}>
            <Button color="secondary" size="small" startIcon={<ArrowLeftIcon />}>
              Prev
            </Button>
            <Typography color="text.secondary" variant="subtitle2">
              1/3
            </Typography>
            <Button color="secondary" size="small" startIcon={<ArrowRightIcon />}>
              Next
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}
