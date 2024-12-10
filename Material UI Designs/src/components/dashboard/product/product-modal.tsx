'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CheckCircle as CheckCircleIcon } from '@phosphor-icons/react/dist/ssr/CheckCircle';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import { useNavigate } from 'react-router-dom';

import { paths } from '@/paths';
import { dayjs } from '@/lib/dayjs';
import type { ColumnDef } from '@/components/core/data-table';
import { DataTable } from '@/components/core/data-table';
import { RouterLink } from '@/components/core/link';
import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

interface Image {
  id: string;
  url: string;
  fileName: string;
  primary?: boolean;
}

const imageColumns = [
  {
    formatter: (row): React.JSX.Element => {
      return (
        <Box
          sx={{
            backgroundImage: `url(${row.url})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            bgcolor: 'var(--mui-palette-background-level2)',
            borderRadius: 1,
            flex: '0 0 auto',
            height: '40px',
            width: '40px',
          }}
        />
      );
    },
    name: 'Image',
    width: '100px',
  },
  { field: 'fileName', name: 'File name', width: '300px' },
  {
    formatter: (row): React.JSX.Element => {
      return row.primary ? <Chip color="secondary" label="Primary" size="small" variant="soft" /> : <span />;
    },
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Image>[];

const images = [
  { id: 'IMG-001', url: '/assets/product-1.png', fileName: 'product-1.png', primary: true },
] satisfies Image[];

export interface ProductModalProps {
  open: boolean;
  productId?: string;
}

export function ProductModal({ open }: ProductModalProps): React.JSX.Element | null {
  const navigate = useNavigate();

  // This component should load the product from the API based on the productId prop.
  // For the sake of simplicity, we are just using a static product object.

  const handleClose = React.useCallback(() => {
    navigate(paths.dashboard.products.list);
  }, [navigate]);

  return (
    <Dialog
      maxWidth="sm"
      onClose={handleClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': { height: '100%', width: '100%' },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" sx={{ alignItems: 'center', flex: '0 0 auto', justifyContent: 'space-between' }}>
          <Typography variant="h6">PRD-001</Typography>
          <IconButton onClick={handleClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Stack spacing={3} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Stack spacing={3}>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Details</Typography>
              <Button
                color="secondary"
                component={RouterLink}
                href={paths.dashboard.products.details('1')}
                startIcon={<PencilSimpleIcon />}
              >
                Edit
              </Button>
            </Stack>
            <Card sx={{ borderRadius: 1 }} variant="outlined">
              <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                {(
                  [
                    { key: 'Name', value: 'Erbology Aloe Vera' },
                    { key: 'Category', value: 'Healthcare' },
                    { key: 'Type', value: 'Physical' },
                    { key: 'Tags', value: 'Natural, Eco-Friendly, Vegan' },
                    {
                      key: 'Price',
                      value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(24),
                    },
                    {
                      key: 'Status',
                      value: (
                        <Chip
                          icon={<CheckCircleIcon color="var(--mui-palette-success-main)" weight="fill" />}
                          label="Published"
                          size="small"
                          variant="outlined"
                        />
                      ),
                    },
                    {
                      key: 'Created at',
                      value: dayjs().subtract(3, 'hour').subtract(5, 'day').format('MMMM D, YYYY hh:mm A'),
                    },
                  ] satisfies { key: string; value: React.ReactNode }[]
                ).map(
                  (item): React.JSX.Element => (
                    <PropertyItem key={item.key} name={item.key} value={item.value} />
                  )
                )}
              </PropertyList>
            </Card>
            <Stack spacing={3}>
              <Typography variant="h6">Images</Typography>
              <Card sx={{ borderRadius: 1 }} variant="outlined">
                <Box sx={{ overflowX: 'auto' }}>
                  <DataTable<Image> columns={imageColumns} rows={images} />
                </Box>
              </Card>
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h6">Stock & invetory</Typography>
              <Card sx={{ borderRadius: 1 }} variant="outlined">
                <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '12px 24px' }}>
                  {(
                    [
                      { key: 'SKU', value: '401_1BBXBK' },
                      { key: 'Barcode', value: '' },
                      { key: 'Quantity', value: 10 },
                      { key: 'Height', value: '25 cm' },
                      { key: 'Width', value: '15 cm' },
                      { key: 'Length', value: '5 cm' },
                      { key: 'Weight', value: '0.25 kg' },
                    ] satisfies { key: string; value: React.ReactNode }[]
                  ).map(
                    (item): React.JSX.Element => (
                      <PropertyItem key={item.key} name={item.key} value={item.value} />
                    )
                  )}
                </PropertyList>
              </Card>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
