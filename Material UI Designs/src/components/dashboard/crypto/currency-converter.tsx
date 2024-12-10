import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { ArrowsDownUp as ArrowsDownUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowsDownUp';
import { CoinVertical as CoinVerticalIcon } from '@phosphor-icons/react/dist/ssr/CoinVertical';

export function CurrencyConverter(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <CoinVerticalIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Operation"
      />
      <Tabs sx={{ px: 3 }} value="buy">
        <Tab label="Buy" tabIndex={0} value="buy" />
        <Tab label="Sell" tabIndex={0} value="sell" />
      </Tabs>
      <Divider />
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <FormControl>
              <InputLabel>From</InputLabel>
              <OutlinedInput
                startAdornment={
                  <Box
                    alt="ETH"
                    component="img"
                    src="/assets/logo-eth.svg"
                    sx={{ height: '24px', mr: 1, width: '24px' }}
                  />
                }
                value="0.4567"
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <IconButton>
                <ArrowsDownUpIcon />
              </IconButton>
            </Box>
            <FormControl>
              <InputLabel>To</InputLabel>
              <OutlinedInput
                startAdornment={
                  <Box
                    alt="BTC"
                    component="img"
                    src="/assets/logo-btc.svg"
                    sx={{ height: '24px', mr: 1, width: '24px' }}
                  />
                }
                value="5.9093"
              />
            </FormControl>
          </Stack>
          <Typography color="text.secondary" variant="body2">
            1 BTC = {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(20024.9)}
          </Typography>
          <Button variant="contained">Buy Bitcoin</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
