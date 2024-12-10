import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowLeft as ArrowLeftIcon } from '@phosphor-icons/react/dist/ssr/ArrowLeft';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { paths } from '@/paths';
import { RouterLink } from '@/components/core/link';
import { ProductEditForm } from '@/components/dashboard/product/product-edit-form';

const metadata = { title: `Details | Products | Dashboard | ${config.site.name}` } satisfies Metadata;

export function Page(): React.JSX.Element {
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
        <Stack spacing={4}>
          <Stack spacing={3}>
            <div>
              <Link
                color="text.primary"
                component={RouterLink}
                href={paths.dashboard.products.list}
                sx={{ alignItems: 'center', display: 'inline-flex', gap: 1 }}
                variant="subtitle2"
              >
                <ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />
                Products
              </Link>
            </div>
            <div>
              <Typography variant="h4">Edit product</Typography>
            </div>
          </Stack>
          <ProductEditForm
            product={{
              id: 'PRD-001',
              name: 'Erbology Aloe Vera',
              handle: 'healthcare-erbology',
              category: 'Healthcare',
              type: 'physical',
              description:
                '<h2>Erbology Aloe Vera is a natural, eco-friendly, and vegan product.</h2><p>It is made from natural ingredients. It is a great product for healthcare.</p>',
              tags: 'Natural, Eco-Friendly, Vegan',
              currency: 'USD',
              price: 24,
              images: [{ id: 'IMG-001', url: '/assets/product-1.png', fileName: 'product-1.png' }],
              sku: '401_1BBXBK',
              barcode: '',
              quantity: 10,
              backorder: true,
              height: 25,
              width: 15,
              length: 5,
              weight: 0.25,
            }}
          />
        </Stack>
      </Box>
    </React.Fragment>
  );
}
