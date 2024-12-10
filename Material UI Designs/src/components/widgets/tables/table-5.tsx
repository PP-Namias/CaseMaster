'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Image as ImageIcon } from '@phosphor-icons/react/dist/ssr/Image';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { Option } from '@/components/core/option';

interface Product {
  id: string;
  name: string;
  image: string | null;
  category: string;
  tags: string;
  availability: 'in_stock' | 'limited' | 'out_of_stock';
  quantity: number;
  currency: string;
  price: number;
}

const products = [
  {
    id: 'PRD-004',
    name: 'Necessaire Body Lotion',
    image: '/assets/product-4.png',
    category: 'Skincare',
    tags: 'Lotion, Vegan, Hypoallergenic',
    availability: 'limited',
    quantity: 5,
    currency: 'USD',
    price: 17.99,
  },
  {
    id: 'PRD-003',
    name: 'Ritual of Sakura',
    image: '/assets/product-3.png',
    category: 'Skincare',
    tags: 'Cream, Dry skin, Moisturizer',
    availability: 'in_stock',
    quantity: 8,
    currency: 'USD',
    price: 155,
  },
  {
    id: 'PRD-002',
    name: 'Lancome Rouge',
    image: '/assets/product-2.png',
    category: 'Makeup',
    tags: 'Lipstick, Red, Matte',
    availability: 'out_of_stock',
    quantity: 0,
    currency: 'USD',
    price: 95,
  },
  {
    id: 'PRD-001',
    name: 'Erbology Aloe Vera',
    image: '/assets/product-1.png',
    category: 'Healthcare',
    tags: 'Natural, Eco-Friendly, Vegan',
    availability: 'in_stock',
    quantity: 10,
    currency: 'USD',
    price: 24,
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
          <Link color="text.primary" sx={{ whiteSpace: 'nowrap' }} underline="none" variant="subtitle2">
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
  {
    formatter: (row): React.JSX.Element => {
      const mapping = {
        in_stock: { label: 'In stock', color: 'success' },
        limited: { label: 'Limited', color: 'warning' },
        out_of_stock: { label: 'Out of stock', color: 'error' },
      } as const;
      const { label, color } = mapping[row.availability] ?? { label: 'Unknown', color: 'secondary' };

      return <Chip color={color} label={label} size="small" variant="soft" />;
    },
    name: 'Inventory',
    width: '150px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {row.quantity}
      </Typography>
    ),
    name: 'Quantity',
    width: '100px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography noWrap variant="inherit">
        {row.tags}
      </Typography>
    ),
    name: 'Tags',
    width: '150px',
  },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.price);
    },
    name: 'Price',
    width: '100px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton>
        <PencilSimpleIcon />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Product>[];

export function Table5(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 3 }}>
          <OutlinedInput
            placeholder="Search products"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ maxWidth: '100%', width: '500px' }}
          />
          <Select defaultValue="desc" name="sort" sx={{ maxWidth: '100%', width: '240px' }}>
            <Option value="desc">Newest</Option>
            <Option value="asc">Oldest</Option>
          </Select>
          <Select defaultValue="" name="category" sx={{ maxWidth: '100%', width: '240px' }}>
            <Option value="">All categories</Option>
            <Option value="Healthcare">Healthcare</Option>
            <Option value="Makeup">Makeup</Option>
            <Option value="Skincare">Skincare</Option>
          </Select>
          <Select defaultValue="" name="availability" sx={{ maxWidth: '100%', width: '240px' }}>
            <Option value="">Availability</Option>
            <Option value="in_stock">In stock</Option>
            <Option value="limited">Limited</Option>
            <Option value="out_of_stock">Out of stock</Option>
          </Select>
          <FormControlLabel control={<Switch name="shippable" />} label="Shippable" />
        </Stack>
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Product> columns={columns} rows={products} selectable />
        </Box>
      </Card>
    </Box>
  );
}
