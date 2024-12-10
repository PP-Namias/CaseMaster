import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Check as CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';

export function Modal9(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 3 }}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar sx={{ bgcolor: 'var(--mui-palette-success-50)', color: 'var(--mui-palette-success-main)' }}>
                <CheckIcon fontSize="var(--Icon-fontSize)" />
              </Avatar>
            </Box>
            <Stack spacing={1} sx={{ textAlign: 'center' }}>
              <Typography variant="h5">Payment successful</Typography>
              <Typography color="text.secondary" variant="body2">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident facere eum obcaecati pariatur magnam
                eius fugit nostrum sint enim, amet rem aspernatur distinctio tempora repudiandae, maiores quod. Ad,
                expedita assumenda!
              </Typography>
            </Stack>
            <Button variant="contained">Go back to dashboard</Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
