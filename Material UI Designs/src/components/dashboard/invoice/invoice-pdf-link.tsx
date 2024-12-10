'use client';

import * as React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';

import { InvoicePDFDocument } from '@/components/dashboard/invoice/invoice-pdf-document';

// This component should receive the `invoice` prop from the parent component.
// The invoice data should be passed to the `InvoicePDFDocument` component.

export interface InvoicePDFLinkProps {
  children: React.ReactNode;
  invoice: unknown;
}

export function InvoicePDFLink({ children }: InvoicePDFLinkProps): React.JSX.Element {
  return (
    <PDFDownloadLink document={<InvoicePDFDocument invoice={undefined} />} fileName="invoice">
      {children}
    </PDFDownloadLink>
  );
}
