import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Markdown from 'react-markdown';

const tags = ['React JS'] satisfies string[];

const description = `Design files are attached in the files tab.

Develop the web app screens for our product called "PDFace". Please look at the wireframes, system activity workflow and read the section above to understand what we're trying to archive.

There's not many screens we need designed, but there will be modals and various other system triggered events that will need to be considered.

The project has been created in Sketch so let me know if there are any problems opening this project and I'll try to convert into a usable file.`;

export function DetailList5(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardContent>
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Project Name
              </Typography>
              <Typography variant="subtitle2">Develop a PDF Export App</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Tags
              </Typography>
              <div>
                {tags.map((tag) => (
                  <Chip key={tag} label={tag} variant="outlined" />
                ))}
              </div>
            </Stack>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Description
              </Typography>
              <Box
                sx={{
                  '& h2': { fontWeight: 500, fontSize: '1.5rem', lineHeight: 1.2, mb: 3 },
                  '& h3': { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.2, mb: 3 },
                  '& p': { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5, mb: 2, mt: 0 },
                }}
              >
                <Markdown>{description}</Markdown>
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
