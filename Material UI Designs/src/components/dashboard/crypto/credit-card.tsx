import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export type Brand = 'mastercard' | 'visa';

const brandBgs: Record<Brand, string> = {
  mastercard: '/assets/card-background-1.png',
  visa: '/assets/card-background-2.png',
};

const brandIcons: Record<Brand, string> = { mastercard: '/assets/logo-mastercard.svg', visa: '/assets/logo-visa.svg' };

export interface CreditCardProps {
  card: { id: string; brand: Brand; cardNumber: string; expiryDate: string; holderName: string };
}

export function CreditCard({ card }: CreditCardProps): React.JSX.Element {
  return (
    <Stack
      spacing={4}
      sx={{
        bgcolor: 'var(--mui-palette-primary-main)',
        backgroundImage: `url("${brandBgs[card.brand]}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        p: '32px 24px',
        borderRadius: '20px',
      }}
    >
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <Box alt="Contactless" component="img" src="/assets/contactless.svg" sx={{ height: 'auto', width: '24px' }} />
        <Box alt={card.brand} component="img" src={brandIcons[card.brand]} sx={{ height: 'auto', width: '56px' }} />
      </Box>
      <Typography
        sx={{
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, #FFFFFF 100%)',
          backgroundClip: 'text',
          fontSize: '1.25rem',
          fontWeight: 700,
          letterSpacing: '0.3em',
          lineHeight: 1.2,
          textFillColor: 'transparent',
        }}
      >
        {card.cardNumber}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography color="white" variant="caption">
            Card holder
          </Typography>
          <Typography color="white" variant="subtitle2">
            {card.holderName}
          </Typography>
        </div>
        <div>
          <Typography color="white" variant="caption">
            Expiry date
          </Typography>
          <Typography color="white" variant="subtitle2">
            {card.expiryDate}
          </Typography>
        </div>
        <div>
          <Box
            alt="Sim card"
            component="img"
            src="/assets/sim.svg"
            sx={{ display: 'block', height: 'auto', width: '48px' }}
          />
        </div>
      </Stack>
    </Stack>
  );
}
