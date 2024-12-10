'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';
import { Option } from '@/components/core/option';

interface Customer {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  country: string;
  state: string;
  city: string;
  orders: number;
  currency: string;
  spentAmount: number;
}

const customers = [
  {
    id: 'USR-005',
    name: 'Fran Perez',
    avatar: '/assets/avatar-5.png',
    email: 'fran.perez@domain.com',
    country: 'United States',
    state: 'Georgia',
    city: 'Atlanta',
    orders: 0,
    currency: 'USD',
    spentAmount: 0,
  },
  {
    id: 'USR-004',
    name: 'PP Namias',
    avatar: '/assets/Namias.png',
    email: 'penjani.inyene@domain.com',
    country: 'United States',
    state: 'Nevada',
    city: 'Carson City',
    orders: 4,
    currency: 'USD',
    spentAmount: 48.9,
  },
  {
    id: 'USR-003',
    name: 'Cj Juliane',
    avatar: '/assets/CJ.jpg',
    email: 'carson.darrin@domain.com',
    country: 'United States',
    state: 'Ohio',
    city: 'Cleveland',
    orders: 3,
    currency: 'USD',
    spentAmount: 241.94,
  },
  {
    id: 'USR-002',
    name: 'Siegbert Gottfried',
    avatar: '/assets/avatar-2.png',
    email: 'siegbert.gottfried@domain.com',
    country: 'United States',
    state: 'California',
    city: 'Los Angeles',
    orders: 2,
    currency: 'USD',
    spentAmount: 126.2,
  },
  {
    id: 'USR-001',
    name: 'Miron Vitold',
    avatar: '/assets/avatar-1.png',
    email: 'miron.vitold@domain.com',
    country: 'United States',
    state: 'Michigan',
    city: 'Southfield',
    orders: 1,
    currency: 'USD',
    spentAmount: 19.99,
  },
] satisfies Customer[];

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Prospect', value: 'isProspect' },
  { label: 'Returning', value: 'isReturning' },
] as const;

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar src={row.avatar} />
        <div>
          <Link color="inherit" sx={{ whiteSpace: 'nowrap' }} variant="subtitle2">
            {row.name}
          </Link>
          <Typography color="text.secondary" variant="body2">
            {row.email}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'Name',
    width: '350px',
  },
  {
    formatter: (row): React.JSX.Element => (
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="inherit">
        {row.city}, {row.state}, {row.country}
      </Typography>
    ),
    name: 'Location',
    width: '250px',
  },
  { field: 'orders', name: 'Orders', width: '150px' },
  {
    formatter: (row): string => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: row.currency }).format(row.spentAmount);
    },
    name: 'Spent',
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
] satisfies ColumnDef<Customer>[];

export function Table3(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <Tabs sx={{ px: 3 }} value="all" variant="scrollable">
          {tabs.map((tab) => (
            <Tab {...tab} key={tab.value} tabIndex={0} />
          ))}
        </Tabs>
        <Divider />
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', p: 3 }}>
          <OutlinedInput
            placeholder="Search customers"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ flex: '1 1 auto' }}
          />
          <Select defaultValue="desc" name="sort" sx={{ maxWidth: '100%', width: '120px' }}>
            <Option value="desc">Newest</Option>
            <Option value="asc">Oldest</Option>
          </Select>
        </Stack>
        <Divider />
        <Box sx={{ overflowX: 'auto' }}>
          <DataTable<Customer> columns={columns} rows={customers} selectable />
        </Box>
      </Card>
    </Box>
  );
}
