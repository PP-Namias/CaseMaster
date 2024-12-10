import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Link as LinkIcon } from '@phosphor-icons/react/dist/ssr/Link';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { Thumbnail } from '@/components/widgets/thumbnail';

const metadata = { title: `Components | ${config.site.name}` } satisfies Metadata;

interface Item {
  title: string;
  description: string;
  imageDark: string;
  imageLight: string;
  href: string;
  newTab?: boolean;
}

interface Section {
  title: string;
  items: Item[];
}

const sections: Section[] = [
  {
    title: 'Data Display',
    items: [
      {
        title: 'Detail Lists',
        description: '8 components',
        imageDark: `/assets/thumbnail-detail-list-dark.png`,
        imageLight: `/assets/thumbnail-detail-list-light.png`,
        href: paths.components.detailLists,
      },
      {
        title: 'Tables',
        description: '11 components',
        imageDark: `/assets/thumbnail-tables-dark.png`,
        imageLight: `/assets/thumbnail-tables-light.png`,
        href: paths.components.tables,
      },
      {
        title: 'Quick Stats',
        description: '8 components',
        imageDark: `/assets/thumbnail-quick-stats-dark.png`,
        imageLight: `/assets/thumbnail-quick-stats-light.png`,
        href: paths.components.quickStats,
      },
    ],
  },
  {
    title: 'Lists',
    items: [
      {
        title: 'Grouped Lists',
        description: '11 components',
        imageDark: `/assets/thumbnail-grouped-lists-dark.png`,
        imageLight: `/assets/thumbnail-grouped-lists-light.png`,
        href: paths.components.groupedLists,
      },
      {
        title: 'Grid Lists',
        description: '6 components',
        imageDark: `/assets/thumbnail-grid-lists-dark.png`,
        imageLight: `/assets/thumbnail-grid-lists-light.png`,
        href: paths.components.gridLists,
      },
    ],
  },
  {
    title: 'Forms',
    items: [
      {
        title: 'Forms',
        description: '17 components',
        imageDark: `/assets/thumbnail-forms-dark.png`,
        imageLight: `/assets/thumbnail-forms-light.png`,
        href: paths.components.forms,
      },
    ],
  },
  {
    title: 'Overlays',
    items: [
      {
        title: 'Modals',
        description: '12 components',
        imageDark: `/assets/thumbnail-modals-dark.png`,
        imageLight: `/assets/thumbnail-modals-light.png`,
        href: paths.components.modals,
      },
    ],
  },
  {
    title: 'Charts',
    items: [
      {
        title: 'Charts',
        description: '12 components',
        imageDark: `/assets/thumbnail-charts-dark.png`,
        imageLight: `/assets/thumbnail-charts-light.png`,
        href: paths.components.charts,
      },
    ],
  },
  {
    title: 'Components',
    items: [
      {
        title: 'Buttons',
        description: '',
        imageDark: `/assets/thumbnail-buttons-dark.png`,
        imageLight: `/assets/thumbnail-buttons-light.png`,
        href: paths.components.buttons,
      },
      {
        title: 'Typography',
        description: '',
        imageDark: `/assets/thumbnail-typography-dark.png`,
        imageLight: `/assets/thumbnail-typography-light.png`,
        href: paths.components.typography,
      },
      {
        title: 'Colors',
        description: '',
        imageDark: `/assets/thumbnail-colors-dark.png`,
        imageLight: `/assets/thumbnail-colors-light.png`,
        href: paths.components.colors,
      },
      {
        title: 'Inputs',
        description: '',
        imageDark: `/assets/thumbnail-inputs-dark.png`,
        imageLight: `/assets/thumbnail-inputs-light.png`,
        href: paths.components.inputs,
      },
    ],
  },
];

export function Page(): React.JSX.Element {
  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <main>
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-level1)',
            borderBottom: '1px solid var(--mui-palette-divider)',
            py: '120px',
          }}
        >
          <Container maxWidth="lg">
            <Stack spacing={1}>
              <Typography variant="h1">Browse components</Typography>
              <Typography color="text.secondary" variant="body1">
                Browse through over 100 individual components and over 35 screens
              </Typography>
            </Stack>
          </Container>
        </Box>
        <Box sx={{ py: '64px' }}>
          <Container maxWidth="lg">
            <Stack divider={<Divider />} spacing={3}>
              {sections.map((section) => (
                <Grid container key={section.title} spacing={3}>
                  <Grid lg={3} xs={12}>
                    <Typography sx={{ fontWeight: 600 }} variant="h5">
                      {section.title}
                    </Typography>
                  </Grid>
                  <Grid lg={9} xs={12}>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                        gap: 3,
                      }}
                    >
                      {section.items.map((item) => (
                        <Card
                          component={RouterLink}
                          href={item.href}
                          key={item.title}
                          sx={{ display: 'block', textDecoration: 'none', gridColumn: { xs: 'span 3', sm: 'span 1' } }}
                          variant="outlined"
                          {...(item.newTab && { component: 'a', target: '_blank' })}
                        >
                          <Stack spacing={2} sx={{ p: 2 }}>
                            <Thumbnail imageDark={item.imageDark} imageLight={item.imageLight} />
                            <div>
                              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-center' }}>
                                <Typography variant="subtitle2">{item.title}</Typography>
                                {item.newTab ? <LinkIcon /> : null}
                              </Stack>
                              <Typography color="text.secondary" variant="body2">
                                {item.description}
                              </Typography>
                            </div>
                          </Stack>
                        </Card>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              ))}
            </Stack>
          </Container>
        </Box>
      </main>
    </React.Fragment>
  );
}
