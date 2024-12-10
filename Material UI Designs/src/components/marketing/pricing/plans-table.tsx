import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { Plan } from './plan';

export function PlansTable(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', py: { xs: '60px', sm: '120px' } }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              Start today. Boost up your services!
            </Typography>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body1">
              Join 10,000+ developers &amp; designers using Devias to power modern web projects.
            </Typography>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <Switch defaultChecked />
              <Typography variant="body1">Billed annually</Typography>
              <Chip color="success" label="25% OFF" size="small" />
            </Stack>
          </Stack>
          <div>
            <Grid container spacing={3}>
              <Grid md={4} xs={12}>
                <Plan
                  action={<Button variant="outlined">Select</Button>}
                  currency="USD"
                  description="To familiarize yourself with our tools."
                  features={['Create contracts', 'Chat support', 'Email alerts']}
                  id="startup"
                  name="Startup"
                  price={0}
                />
              </Grid>
              <Grid md={4} xs={12}>
                <Plan
                  action={<Button variant="contained">Start free trial</Button>}
                  currency="USD"
                  description="Best for small teams with up to 10 members."
                  features={['All previous', 'Highlights reporting', 'Data history', 'Unlimited users']}
                  id="standard"
                  name="Standard"
                  popular
                  price={14.99}
                />
              </Grid>
              <Grid md={4} xs={12}>
                <Plan
                  action={
                    <Button color="secondary" variant="contained">
                      Contact us
                    </Button>
                  }
                  currency="USD"
                  description="For larger teams managing multiple projects."
                  features={[
                    'All previous',
                    'Unlimited contacts',
                    'Analytics platform',
                    'Public API access',
                    'Send and sign unlimited contracts',
                  ]}
                  id="business"
                  name="Business"
                  price={29.99}
                />
              </Grid>
            </Grid>
          </div>
          <div>
            <Typography color="text.secondary" component="p" sx={{ textAlign: 'center' }} variant="caption">
              30% of our income goes into Whale Charity
            </Typography>
          </div>
        </Stack>
      </Container>
    </Box>
  );
}
