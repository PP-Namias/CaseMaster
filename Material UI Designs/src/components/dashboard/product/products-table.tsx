'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';

import { paths } from '@/paths';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';

export interface Product {
  id: string;
  name: string;
  image: string | null;
  category: string;
  type: string;
  quantity: number;
  currency: string;
  price: number;
  sku: string;
  status: 'published' | 'draft';
  createdAt: Date;
}

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
          <Link
            color="text.primary"
            component={RouterLink}
            href={paths.dashboard.products.preview('1')}
            sx={{ whiteSpace: 'nowrap' }}
            variant="subtitle2"
          >
            {row.name}
          </Link>
          <Typography color="text.secondary" variant="body2">
            in {row.category}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
    width: '300px',
  },
  { field: 'sku', name: 'SKU', width: '150px' },
  { field: 'quantity', name: 'Stock', width: '100px' },
  {
    formatter(row) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.price);
    },
    name: 'Price',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        draft: { label: 'Draft', icon: <ClockIcon color="var(--mui-palette-secondary-main)" /> },
        published: {
          label: 'Published',
          icon: <CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />,
        },
      } as const;
      const { label, icon } = mapping[row.status] ?? { label: 'Unknown', icon: null };

      return <Chip icon={icon} label={label} size="small" variant="outlined" />;
    },
    name: 'Status',
    width: '150px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton component={RouterLink} href={paths.dashboard.products.preview('1')}>
        <EyeIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Product>[];

export interface ProductsTableProps {
  rows?: Product[];
}

export function ProductsTable({ rows = [] }: ProductsTableProps): React.JSX.Element {
  return (
    <React.Fragment>
      <DataTable<Product> columns={columns} rows={rows} />
      {!rows.length ? (
        <Box sx={{ p: 3 }}>
          <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
            No products found
          </Typography>
        </Box>
      ) : null}
    </React.Fragment>
  );
}
