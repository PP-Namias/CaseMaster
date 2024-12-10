'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

import { DataTable } from '@/components/core/data-table';
import type { ColumnDef } from '@/components/core/data-table';

export interface Member {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: string;
}

const columns = [
  {
    formatter: (row): React.JSX.Element => (
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar src={row.avatar} />
        <div>
          <Typography variant="subtitle2">{row.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            {row.email}
          </Typography>
        </div>
      </Stack>
    ),
    name: 'User',
    width: '350px',
  },
  {
    formatter: (row): React.JSX.Element => {
      if (row.role === 'Owner') {
        return <Chip color="success" label="Owner" size="small" variant="soft" />;
      } else if (row.role === 'Active') {
        return <Chip color="primary" label="Active" size="small" variant="soft" />;
      } else if (row.role === 'Inactive') {
        return <Chip color="error" label="Inactive" size="small" variant="soft" />;
      } else if (row.role === 'Pending') {
        return <Chip color="warning" label="Pending" size="small" variant="soft" />;
      } else {
        return <Chip label={row.role} size="small" variant="soft" />;
      }
    },
    name: 'Status',
    width: '100px',
  },
  {
    formatter: (): React.JSX.Element => (
      <IconButton>
        <DotsThreeIcon weight="bold" />
      </IconButton>
    ),
    name: 'Actions',
    hideName: true,
    width: '100px',
    align: 'right',
  },
] satisfies ColumnDef<Member>[];

export interface MembersTableProps {
  rows: Member[];
}

export function MembersTable({ rows }: MembersTableProps): React.JSX.Element {
  return <DataTable<Member> columns={columns} rows={rows} />;
}
