'use client';

import * as React from 'react';

import { PDFViewer } from '@/components/core/pdf-viewer';
import { InvoicePDFDocument } from '@/components/dashboard/invoice/invoice-pdf-document';

export function Page(): React.JSX.Element {
  return (
    <PDFViewer style={{ border: 'none', height: '100vh', width: '100vw' }}>
      <InvoicePDFDocument invoice={undefined} />
    </PDFViewer>
  );
}
