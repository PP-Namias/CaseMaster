import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

export interface PreviewerProps {
  children: React.ReactNode;
  title: string;
}

export function Previewer({ children, title }: PreviewerProps): React.JSX.Element {
  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <Divider />
      {children}
    </Card>
  );
}
