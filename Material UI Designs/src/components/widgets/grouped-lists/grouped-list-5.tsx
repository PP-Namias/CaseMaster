'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';

import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';

interface Product {
  id: string;
  name: string;
  image: string | null;
  currency: string;
  profit: number;
  sales: number;
  conversionRate: number;
}

const products = [
  {
    id: 'PRD-001',
    name: 'Erbology Aloe Vera',
    image: '/assets/product-1.png',
    currency: 'USD',
    profit: 53500,
    sales: 13153,
    conversionRate: 93,
  },
  {
    id: 'PRD-002',
    name: 'Lancome Rouge',
    image: '/assets/product-2.png',
    currency: 'USD',
    profit: 45763,
    sales: 10300,
    conversionRate: 76,
  },
  {
    id: 'PRD-003',
    name: 'Ritual of Sakura',
    image: '/assets/product-3.png',
    currency: 'USD',
    profit: 28700,
    sales: 5300,
    conversionRate: 60,
  },
  {
    id: 'PRD-004',
    name: 'Necessaire Body Lotion',
    image: '/assets/product-4.png',
    currency: 'USD',
    profit: 20400,
    sales: 1203,
    conversionRate: 46,
  },
  {
    id: 'PRD-005',
    name: 'Soja & Co. Eucalyptus',
    image: '/assets/product-5.png',
    currency: 'USD',
    profit: 15200,
    sales: 254,
    conversionRate: 41,
  },
] satisfies Product[];

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        {row.image ? (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'var(--mui-palette-background-level2)',
              backgroundImage: `url(${row.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              borderRadius: 1,
              display: 'flex',
              height: '80px',
              justifyContent: 'center',
              overflow: 'hidden',
              width: '80px',
            }}
          />
        ) : (
          <Box
            sx={{
              alignItems: 'center',
              bgcolor: 'var(--mui-palette-background-level2)',
              borderRadius: 1,
              display: 'flex',
              height: '80px',
              justifyContent: 'center',
              width: '80px',
            }}
          >
            <ImageIcon fontSize="var(--icon-fontSize-lg)" />
          </Box>
        )}
        <div>
          <Typography sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
            {row.name}
          </Typography>
          <Typography color="text.secondary" noWrap variant="body2">
            <Typography color="success.main" component="span" variant="subtitle2">
              {new Intl.NumberFormat('en-US').format(row.sales)}
            </Typography>{' '}
            sales
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
  },
  {
    formatter: (row): React.JSX.Element => (
      <div>
        <Typography variant="subtitle2">Profit</Typography>
        <Typography color="text.secondary" noWrap variant="body2">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: row.currency,
            maximumFractionDigits: 0,
          }).format(row.profit)}
        </Typography>
      </div>
    ),
    name: 'Profit',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
        <div>
          <Typography sx={{ textAlign: 'center' }} variant="subtitle2">
            {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
              row.conversionRate / 100
            )}
          </Typography>
          <Typography color="text.secondary" sx={{ whiteSpace: 'nowrap' }} variant="body2">
            Conversion rate
          </Typography>
        </div>
        <CircularProgress value={row.conversionRate} />
      </Stack>
    ),
    name: 'Conversion Rate',
    align: 'right',
  },
] satisfies ColumnDef<Product>[];

export function GroupedList5(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader
          action={
            <IconButton>
              <DotsThreeIcon weight="bold" />
            </IconButton>
          }
          title="Profitable products"
        />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Product> columns={columns} hideHead rows={products} />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
            See all
          </Button>
        </Box>
      </Card>
    </Box>
  );
}

interface CircularProgressProps {
  value: number;
}

function CircularProgress({ value }: CircularProgressProps): React.JSX.Element {
  return (
    <Box sx={{ height: '56px', width: '56px' }}>
      <svg viewBox="0 0 36 36">
        <Box
          component="path"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeDasharray="100, 100"
          sx={{ fill: 'none', stroke: 'rgba(0,0,0,0.05)', strokeWidth: '4px' }}
        />
        <Box
          component="path"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          strokeDasharray={`${value}, 100`}
          sx={{
            animation: '$progress 1s ease-out forwards',
            fill: 'none',
            stroke: 'var(--mui-palette-primary-main)',
            strokeWidth: '4px',
            '@keyframes progress': { '0%': { strokeDasharray: '0 100' } },
          }}
        />
      </svg>
    </Box>
  );
}
