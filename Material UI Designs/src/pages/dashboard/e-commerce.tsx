import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Helmet } from 'react-helmet-async';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { Conversions } from '@/components/dashboard/e-commerce/conversions';
import { CostBreakdown } from '@/components/dashboard/e-commerce/cost-breakdown';
import { SalesByCountry } from '@/components/dashboard/e-commerce/sales-by-country';
import { Stats } from '@/components/dashboard/e-commerce/stats';
import { TopProducts } from '@/components/dashboard/e-commerce/top-products';

const metadata = { title: `E-commerce | Dashboard | ${config.site.name}` } satisfies Metadata;

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
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '1 1 auto' }}>
              <Typography variant="h4">E-commerce</Typography>
            </Box>
            <div>
              <Button startIcon={<PlusIcon />} variant="contained">
                Add product
              </Button>
            </div>
          </Stack>
          <Grid container spacing={4}>
            <Grid xs={12}>
              <Stats
                data={[
                  { name: 'Jan 1', v1: 35, v2: 3350 },
                  { name: 'Jan 2', v1: 41, v2: 3440 },
                  { name: 'Jan 2', v1: 32, v2: 3054 },
                  { name: 'Jan 3', v1: 34, v2: 3780 },
                  { name: 'Jan 4', v1: 53, v2: 3849 },
                  { name: 'Jan 5', v1: 48, v2: 4241 },
                  { name: 'Jan 6', v1: 59, v2: 4170 },
                  { name: 'Jan 7', v1: 57, v2: 4051 },
                  { name: 'Jan 8', v1: 66, v2: 4364 },
                  { name: 'Jan 9', v1: 71, v2: 4385 },
                  { name: 'Jan 10', v1: 72, v2: 4912 },
                  { name: 'Jan 11', v1: 78, v2: 4623 },
                  { name: 'Jan 12', v1: 71, v2: 4673 },
                  { name: 'Jan 13', v1: 63, v2: 4465 },
                  { name: 'Jan 14', v1: 66, v2: 4221 },
                  { name: 'Jan 15', v1: 80, v2: 5237 },
                  { name: 'Jan 16', v1: 78, v2: 5303 },
                  { name: 'Jan 17', v1: 95, v2: 5701 },
                  { name: 'Jan 18', v1: 92, v2: 5725 },
                  { name: 'Jan 19', v1: 87, v2: 5856 },
                  { name: 'Jan 20', v1: 98, v2: 6401 },
                  { name: 'Jan 21', v1: 101, v2: 6733 },
                  { name: 'Jan 22', v1: 97, v2: 6640 },
                  { name: 'Jan 23', v1: 97, v2: 6576 },
                  { name: 'Jan 24', v1: 104, v2: 7300 },
                  { name: 'Jan 25', v1: 105, v2: 7285 },
                  { name: 'Jan 26', v1: 106, v2: 7389 },
                  { name: 'Jan 27', v1: 112, v2: 7705 },
                  { name: 'Jan 28', v1: 115, v2: 8212 },
                  { name: 'Jan 29', v1: 110, v2: 8301 },
                  { name: 'Jan 30', v1: 115, v2: 8531 },
                  { name: 'Jan 31', v1: 118, v2: 8700 },
                ]}
              />
            </Grid>
            <Grid lg={8} xs={12}>
              <Conversions
                data={[
                  { name: 'Direct calls', value: 35690 },
                  { name: 'Quote requests', value: 14859 },
                  { name: 'Ads', value: 45120 },
                  { name: 'Affiliate links', value: 3950 },
                  { name: 'Email campaigns', value: 12011 },
                  { name: 'Other', value: 5486 },
                ]}
              />
            </Grid>
            <Grid lg={4} xs={12}>
              <CostBreakdown
                data={[
                  { name: 'Strategy', value: 14859, color: 'var(--mui-palette-success-main)' },
                  { name: 'Outsourcing', value: 35690, color: 'var(--mui-palette-warning-main)' },
                  { name: 'Marketing', value: 45120, color: 'var(--mui-palette-primary-main)' },
                  { name: 'Other', value: 25486, color: 'var(--mui-palette-background-level2)' },
                ]}
              />
            </Grid>
            <Grid lg={8} xs={12}>
              <SalesByCountry
                sales={[
                  { countryCode: 'us', countryName: 'United States', value: 60 },
                  { countryCode: 'es', countryName: 'Spain', value: 20 },
                  { countryCode: 'uk', countryName: 'United Kingdom', value: 10 },
                  { countryCode: 'de', countryName: 'Germany', value: 5 },
                  { countryCode: 'ca', countryName: 'Canada', value: 5 },
                ]}
              />
            </Grid>
            <Grid lg={4} xs={12}>
              <TopProducts
                products={[
                  {
                    id: 'PRD-001',
                    name: 'Erbology Aloe Vera',
                    image: '/assets/product-1.png',
                    category: 'Healthcare',
                    sales: 13153,
                  },
                  {
                    id: 'PRD-002',
                    name: 'Lancome Rouge',
                    image: '/assets/product-2.png',
                    category: 'Makeup',
                    sales: 10300,
                  },
                  {
                    id: 'PRD-003',
                    name: 'Ritual of Sakura',
                    image: '/assets/product-3.png',
                    category: 'Skincare',
                    sales: 5300,
                  },
                  {
                    id: 'PRD-004',
                    name: 'Necessaire Body Lotion',
                    image: '/assets/product-4.png',
                    category: 'Skincare',
                    sales: 1203,
                  },
                  {
                    id: 'PRD-005',
                    name: 'Soja & Co. Eucalyptus',
                    image: '/assets/product-5.png',
                    category: 'Skincare',
                    sales: 254,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
}
