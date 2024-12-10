import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

export interface PlanProps {
  action: React.ReactNode;
  currency: string;
  description: string;
  features: string[];
  id: string;
  name: string;
  popular?: boolean;
  price: number;
}

export function Plan({ action, currency, description, id, features, name, price }: PlanProps): React.JSX.Element {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Stack spacing={2} sx={{ p: 3 }}>
        <div>
          <Box sx={{ height: '52px', width: '52px' }}>
            <PlanIcon name={id} />
          </Box>
        </div>
        <Box sx={{ alignItems: 'flex-end', display: 'flex', gap: 1 }}>
          <Typography variant="h4">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
              maximumFractionDigits: price === 0 ? 0 : 2,
            }).format(price)}
          </Typography>
          <Typography color="text.secondary" variant="subtitle2">
            /month
          </Typography>
        </Box>
        <Typography variant="h6">{name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={6} sx={{ display: 'flex', flex: '1 1 auto', p: 3 }}>
        <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
          {features.map((feature) => (
            <Stack direction="row" key={feature} spacing={1} sx={{ alignItems: 'center', display: 'flex' }}>
              <Box sx={{ display: 'flex' }}>
                <CheckIcon color="var(--mui-palette-success-main)" fontSize="var(--icon-fontSize-md)" />
              </Box>
              <Typography variant="subtitle2">{feature}</Typography>
            </Stack>
          ))}
        </Stack>
        {action}
      </Stack>
    </Card>
  );
}

interface PlanIconProps {
  name: string;
}

function PlanIcon({ name }: PlanIconProps): React.JSX.Element | null {
  switch (name) {
    case 'startup':
      return (
        <svg fill="none" height="33" viewBox="0 0 24 33" width="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.7898 0.492981L23.0191 5.55771C23.2324 5.67468 23.4097 5.84498 23.5332 6.05102C23.6567 6.25713 23.7218 6.49154 23.7218 6.73031C23.7218 6.96907 23.6567 7.20348 23.5332 7.4096C23.4097 7.61564 23.2324 7.78594 23.0191 7.9029L13.7899 12.9679C13.2008 13.2911 12.5366 13.4609 11.861 13.4609C11.1852 13.4609 10.521 13.2911 9.93202 12.9679L0.702682 7.9029C0.489532 7.78594 0.312084 7.61564 0.188587 7.4096C0.0650921 7.20348 -9.53674e-06 6.96907 -9.53674e-06 6.73031C-9.53674e-06 6.49154 0.0650921 6.25713 0.188587 6.05102C0.312084 5.84498 0.489532 5.67468 0.702682 5.55771L9.93202 0.492981C10.521 0.169739 11.1852 -5.72205e-06 11.861 -5.72205e-06C12.5366 -5.72205e-06 13.2008 0.169739 13.7898 0.492981Z"
            fill="var(--mui-palette-primary-main)"
          />
        </svg>
      );
    case 'standard':
      return (
        <svg fill="none" height="33" viewBox="0 0 33 33" width="33" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.4946 0.492981L27.7239 5.55771C27.9372 5.67468 28.1145 5.84498 28.238 6.05102C28.3615 6.25713 28.4266 6.49154 28.4266 6.73031C28.4266 6.96907 28.3615 7.20348 28.238 7.4096C28.1145 7.61564 27.9372 7.78594 27.7239 7.9029L18.4947 12.9679C17.9056 13.2911 17.2414 13.4609 16.5658 13.4609C15.89 13.4609 15.2258 13.2911 14.6368 12.9679L5.40749 7.9029C5.19434 7.78594 5.01689 7.61564 4.89339 7.4096C4.7699 7.20348 4.70479 6.96907 4.70479 6.73031C4.70479 6.49154 4.7699 6.25713 4.89339 6.05102C5.01689 5.84498 5.19434 5.67468 5.40749 5.55771L14.6368 0.492981C15.2258 0.169739 15.89 -5.72205e-06 16.5658 -5.72205e-06C17.2414 -5.72205e-06 17.9056 0.169739 18.4946 0.492981Z"
            fill="var(--mui-palette-primary-main)"
          />
          <path
            d="M18.4448 5.2478L31.6626 12.5013C31.8758 12.6183 32.0532 12.7886 32.1767 12.9946C32.3002 13.2007 32.3653 13.4351 32.3653 13.6739C32.3653 13.9127 32.3002 14.1471 32.1767 14.3532C32.0532 14.5593 31.8758 14.7295 31.6626 14.8466L18.4448 22.1C17.8558 22.4231 17.1916 22.593 16.516 22.593C15.8403 22.593 15.1761 22.4231 14.5871 22.1L1.3693 14.8466C1.15615 14.7295 0.978699 14.5593 0.855202 14.3532C0.731705 14.1471 0.666607 13.9127 0.666607 13.6739C0.666607 13.4351 0.731705 13.2007 0.855202 12.9946C0.978699 12.7886 1.15615 12.6183 1.3693 12.5013L14.5871 5.2478C15.1761 4.92464 15.8403 4.75489 16.516 4.75489C17.1916 4.75489 17.8558 4.92464 18.4448 5.2478Z"
            fill="var(--mui-palette-primary-main)"
            opacity="0.7"
          />
        </svg>
      );
    case 'business':
      return (
        <svg fill="none" height="33" viewBox="0 0 43 33" width="43" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.0075 0.49292L32.2369 5.55765C32.4501 5.67462 32.6275 5.84492 32.751 6.05096C32.8745 6.25707 32.9396 6.49148 32.9396 6.73025C32.9396 6.96901 32.8745 7.20342 32.751 7.40954C32.6275 7.61558 32.4501 7.78587 32.2369 7.90284L23.0076 12.9678C22.4186 13.2911 21.7543 13.4609 21.0787 13.4609C20.403 13.4609 19.7387 13.2911 19.1498 12.9678L9.92043 7.90284C9.70728 7.78587 9.52983 7.61558 9.40633 7.40954C9.28284 7.20342 9.21773 6.96901 9.21773 6.73025C9.21773 6.49148 9.28284 6.25707 9.40633 6.05096C9.52983 5.84492 9.70728 5.67462 9.92043 5.55765L19.1498 0.49292C19.7387 0.169678 20.403 -6.67572e-05 21.0787 -6.67572e-05C21.7543 -6.67572e-05 22.4186 0.169678 23.0075 0.49292Z"
            fill="var(--mui-palette-primary-main)"
          />
          <path
            d="M22.9577 5.24774L36.1755 12.5012C36.3886 12.6182 36.5661 12.7885 36.6896 12.9945C36.8131 13.2007 36.8782 13.4351 36.8782 13.6738C36.8782 13.9126 36.8131 14.1471 36.6896 14.3531C36.5661 14.5592 36.3886 14.7295 36.1755 14.8465L22.9577 22.0999C22.3687 22.4231 21.7045 22.5929 21.0288 22.5929C20.3532 22.5929 19.6889 22.4231 19.1 22.0999L5.88218 14.8465C5.66903 14.7295 5.49158 14.5592 5.36808 14.3531C5.24458 14.1471 5.17949 13.9126 5.17949 13.6738C5.17949 13.4351 5.24458 13.2007 5.36808 12.9945C5.49158 12.7885 5.66903 12.6182 5.88218 12.5012L19.1 5.24774C19.6889 4.92458 20.3532 4.75483 21.0288 4.75483C21.7045 4.75483 22.3687 4.92458 22.9577 5.24774Z"
            fill="var(--mui-palette-primary-main)"
            opacity="0.7"
          />
          <path
            d="M23.259 10.0018L41.6317 20.0843C41.8445 20.2012 42.0217 20.3711 42.145 20.5769C42.2683 20.7826 42.3333 21.0167 42.3333 21.2551C42.3333 21.4935 42.2683 21.7275 42.145 21.9333C42.0217 22.139 41.8445 22.309 41.6317 22.4258L23.2589 32.5081C22.6709 32.8307 22.0078 33.0002 21.3332 33.0002C20.6587 33.0002 19.9955 32.8307 19.4075 32.5081L1.03479 22.4258C0.821995 22.309 0.644833 22.139 0.521538 21.9333C0.398247 21.7275 0.333252 21.4935 0.333252 21.2551C0.333252 21.0167 0.398247 20.7826 0.521538 20.5769C0.644833 20.3711 0.821995 20.2012 1.03479 20.0843L19.4075 10.0018C19.9955 9.67921 20.6587 9.50966 21.3332 9.50966C22.0078 9.50966 22.6709 9.67921 23.259 10.0018Z"
            fill="var(--mui-palette-primary-main)"
            opacity="0.4"
          />
        </svg>
      );
    default:
      return null;
  }
}
