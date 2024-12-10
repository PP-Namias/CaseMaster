import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Stack as StackIcon } from '@phosphor-icons/react/dist/ssr/Stack';

import { paths } from '@/paths';

export function Features(): React.JSX.Element {
  return (
    <Box sx={{ pt: '120px' }}>
      <Stack spacing={8}>
        <Stack maxWidth="700px" sx={{ mx: 'auto', px: 3 }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chip color="primary" icon={<StackIcon />} label="Choose your stack" variant="soft" />
            </Box>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              And so much more
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
              All the features you need to build a better experience, explore the possibilities, and unlock the full
              potential of what we have to offer.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button endIcon={<CaretRightIcon />} href={paths.purchase} target="_blank" variant="contained">
                Purchase now
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Container maxWidth="md">
          <Box component="img" src="/assets/home-techs.svg" sx={{ display: 'block', height: 'auto', width: '100%' }} />
        </Container>
      </Stack>
    </Box>
  );
}
