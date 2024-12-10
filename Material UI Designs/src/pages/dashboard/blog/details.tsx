import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import { BreadcrumbsSeparator } from '@/components/core/breadcrumbs-separator';
import { RouterLink } from '@/components/core/link';
import { CommentAdd } from '@/components/dashboard/blog/comment-add';
import { CommentBox } from '@/components/dashboard/blog/comment-box';
import { Content } from '@/components/dashboard/blog/content';
import { Newsletter } from '@/components/dashboard/blog/newsletter';
import type { Comment } from '@/components/dashboard/blog/types';

const metadata = { title: `Details | Blog | Dashboard | ${config.site.name}` } satisfies Metadata;

const content = `## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.

Phasellus ullamcorper ultrices ullamcorper. Nunc auctor porttitor ex, non consequat ipsum aliquam at. Duis dapibus dolor in nisi viverra, a elementum nulla viverra. Etiam feugiat turpis leo, nec finibus diam rhoncus ac. Sed at metus et orci consequat facilisis vel vel diam.

## Cras at molestie lacus. Phasellus feugiat leo quis sem iaculis, sed mattis nibh accumsan.
  

Etiam faucibus massa auctor gravida finibus.
Cras nulla magna, dapibus sit amet accumsan nec, ullamcorper sit amet dolor.

Donec leo nisi, porta et gravida nec, tincidunt ac velit. Aliquam in turpis a quam tempus dapibus. Morbi in tellus tempor, hendrerit mi vel, aliquet tellus. Quisque vel interdum ante. Nunc quis purus sem. Donec at risus lacinia ipsum cursus condimentum at ac dui. Nulla bibendum feugiat tellus ac tristique. Proin auctor, lectus et accumsan varius, justo odio vulputate neque, et efficitur augue leo id ex. Aliquam eget turpis nisl. Nam sapien massa, sollicitudin et vehicula a, fringilla vitae purus. Praesent a vestibulum felis.

\`\`\`javascript
// This is a comment

const x = () => {};

\`\`\`

Class aptent taciti sociosqu ad litora torquent \`const d = 3;\` per conubia nostra, per inceptos himenaeos. Morbi maximus metus eget nulla malesuada, sit amet luctus est fringilla. Aenean imperdiet rhoncus justo, ut pharetra lorem gravida placerat. Duis et enim lorem. Aliquam placerat elit est, vitae fermentum ipsum finibus sed. Donec dapibus magna non tortor commodo rhoncus. Suspendisse luctus tincidunt eros, aliquet pellentesque neque venenatis quis. Aliquam auctor felis nec orci ornare gravida. Fusce ac neque sit amet nibh scelerisque molestie. Nullam in lorem viverra, aliquam nunc vel, interdum orci. Fusce mattis est neque, et tincidunt justo blandit quis. Etiam tincidunt purus in libero semper, vitae placerat dui vehicula. Pellentesque sit amet imperdiet purus, quis lacinia eros.

Duis placerat turpis non metus dapibus sagittis. Vestibulum ex massa, tempus pulvinar varius at, placerat non justo. Ut tristique nisl sed porta pulvinar. Nunc ex nibh, tempor eget elit vel, fringilla ornare risus. Praesent vel lacus finibus, laoreet nulla quis, semper tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec volutpat quis dui ac varius. Suspendisse potenti. Maecenas sagittis lacus vitae ex rhoncus, eu fringilla urna luctus.

## Donec vel erat augue. Aenean ut nisl cursus nulla tempus ultricies vel eget lorem.

Suspendisse pharetra dolor in massa molestie, vel molestie nunc accumsan. Cras varius aliquet pellentesque. Curabitur ac mi fermentum nibh congue pharetra in eu nunc. Vivamus mattis urna a fringilla facilisis. Cras finibus nulla in nulla imperdiet pharetra. Morbi vel tortor turpis.`;

const comments = [
  {
    id: 'MSG-002',
    content: 'Great article! Thanks for sharing.',
    author: { name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(2, 'hour').toDate(),
  },
  {
    id: 'MSG-001',
    createdAt: dayjs().subtract(8, 'hour').toDate(),
    author: { name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
    content: 'I find this article very helpful. Do you have any other resources on this topic?',
  },
] satisfies Comment[];

export function Page(): React.JSX.Element | null {
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
        <Stack spacing={8}>
          <Stack spacing={1}>
            <Typography variant="h4">Post</Typography>
            <Breadcrumbs separator={<BreadcrumbsSeparator />}>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.overview} variant="subtitle2">
                Dashboard
              </Link>
              <Link color="text.primary" component={RouterLink} href={paths.dashboard.blog.list} variant="subtitle2">
                Blog
              </Link>
              <Typography color="text.secondary" variant="subtitle2">
                Details
              </Typography>
            </Breadcrumbs>
          </Stack>
          <Card
            sx={{
              alignItems: 'center',
              borderRadius: 1,
              boxShadow: 'var(--mui-shadows-16)',
              display: 'flex',
              justifyContent: 'space-between',
              px: 3,
              py: 2,
            }}
          >
            <Typography variant="subtitle1">Hello, Sofia</Typography>
            <Button component={RouterLink} href={paths.dashboard.blog.create} variant="contained">
              Edit post
            </Button>
          </Card>
          <Stack spacing={3}>
            <div>
              <Chip label="Programming" />
            </div>
            <Stack spacing={2}>
              <Typography variant="h3">How to Create a Productivity Dashboard</Typography>
              <Typography color="text.secondary" variant="subtitle1">
                Learn how to create a productivity dashboard using Google Cloud and Supabase for your team.
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Avatar src="/assets/avatar-8.png" />
              <div>
                <Typography variant="subtitle2">
                  By Jie Yan •{' '}
                  {dayjs().subtract(39, 'minute').subtract(7, 'hour').subtract(5, 'day').format('MMM D, YYYY')}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  5 min read
                </Typography>
              </div>
            </Stack>
            <Box
              sx={{
                backgroundImage: 'url(/assets/image-business-2.png)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: 1,
                height: '380px',
              }}
            />
            <Container>
              <Content content={content} />
            </Container>
            <Divider />
            <Stack spacing={2}>
              {comments.map((comment) => (
                <CommentBox comment={comment} key={comment.id} />
              ))}
            </Stack>
            <Divider />
            <CommentAdd />
          </Stack>
          <Newsletter />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
