import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { Receipt as ReceiptIcon } from '@phosphor-icons/react/dist/ssr/Receipt';

import { InvoicesTable } from './invoices-table';
import type { Invoice } from './invoices-table';

export interface InvoicesProps {
  invoices: Invoice[];
}

export function Invoices({ invoices }: InvoicesProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <ReceiptIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        subheader="If you've just made a payment, it may take a few hours for it to appear in the table below."
        title="Invoice history"
      />
      <CardContent>
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <InvoicesTable rows={invoices} />
          </Box>
        </Card>
      </CardContent>
    </Card>
  );
}
