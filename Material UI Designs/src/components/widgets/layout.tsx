import * as React from 'react';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';

import { paths } from '@/paths';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { Previewer } from '@/components/widgets/previewer';

export interface Component {
  title: string;
  element: React.JSX.Element;
}

export interface LayoutProps {
  breadcrumbs?: { title: string; href?: string }[];
  components: Component[];
  title: string;
}

export function Layout({ breadcrumbs, components, title }: LayoutProps): React.JSX.Element {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-level1)',
          borderBottom: '1px solid var(--mui-palette-divider)',
          py: '120px',
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {!breadcrumbs ? (
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.components.index}
                  sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                  variant="subtitle2"
                >
                  <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                  Components
                </Link>
              </div>
            ) : null}
            <div>
              <Typography variant="h1">{title}</Typography>
            </div>
            {breadcrumbs ? (
              <div>
                <Breadcrumbs separator={<BreadcrumbsSeparator />}>
                  {breadcrumbs.map((breadcrumb, index) => {
                    if (breadcrumbs.length - 1 === index) {
                      return (
                        <Typography color="text.secondary" key={breadcrumb.title} variant="subtitle2">
                          {breadcrumb.title}
                        </Typography>
                      );
                    }

                    return (
                      <Link
                        color="text.primary"
                        component={RouterLink}
                        href={breadcrumb.href!}
                        key={breadcrumb.title}
                        variant="subtitle2"
                      >
                        {breadcrumb.title}
                      </Link>
                    );
                  })}
                </Breadcrumbs>
              </div>
            ) : null}
          </Stack>
        </Container>
      </Box>
      <Box sx={{ py: '64px' }}>
        <Container maxWidth="lg">
          <Stack spacing={8}>
            {components.map((component) => (
              <Previewer key={component.title} title={component.title}>
                {component.element}
              </Previewer>
            ))}
          </Stack>
        </Container>
      </Box>
    </main>
  );
}
