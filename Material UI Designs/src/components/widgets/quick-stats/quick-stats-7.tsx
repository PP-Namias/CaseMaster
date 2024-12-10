import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function QuickStats7(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Profile progress" />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <LinearProgress value={50} variant="determinate" />
            <Typography color="text.secondary" variant="subtitle2">
              50% set up complete
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
