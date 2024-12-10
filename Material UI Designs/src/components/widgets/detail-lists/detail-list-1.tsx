import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

interface Asset {
  name: string;
  value: number;
  color: string;
}

const assets = [
  { name: 'US Dollars', value: 21500, color: '#6C76C4' },
  { name: 'Bitcoin', value: 15300, color: '#33BB78' },
  { name: 'XRP Ripple', value: 1076.81, color: '#FF4081' },
] satisfies Asset[];

export function DetailList1(): React.JSX.Element {
  const totalAmount = assets.reduce((acc, asset) => {
    return acc + asset.value;
  }, 0);

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Stack divider={<Divider />} spacing={2}>
              <div>
                <Typography variant="overline">Total balance</Typography>
                <Typography variant="h4">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalAmount)}
                </Typography>
              </div>
              <Stack spacing={2}>
                <Typography color="text.secondary" variant="overline">
                  Available currency
                </Typography>
                <List disablePadding>
                  {assets.map((asset) => (
                    <ListItem disableGutters key={asset.name} sx={{ py: 1.5 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
                        <Box sx={{ bgcolor: asset.color, height: '8px', width: '8px', borderRadius: '50%' }} />
                        <Typography variant="subtitle2">{asset.name}</Typography>
                      </Stack>
                      <Typography color="text.secondary" variant="subtitle2">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(asset.value)}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Stack>
              <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                <Button color="secondary" endIcon={<ArrowRightIcon />}>
                  Add money
                </Button>
                <Button color="secondary" endIcon={<ArrowRightIcon />}>
                  Withdraw funds
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
