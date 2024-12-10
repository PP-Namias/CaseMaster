import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

export function Form16(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card>
          <CardHeader subheader="Create a new account to continue" title="Sign up" />
          <CardContent>
            <Stack divider={<Divider />} spacing={3}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <InputLabel>Name</InputLabel>
                  <OutlinedInput name="name" />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput name="email" type="email" />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput name="password" type="password" />
                </FormControl>
                <div>
                  <FormControlLabel
                    control={<Checkbox name="terms" />}
                    label={
                      <React.Fragment>
                        I have read the <Link>terms and conditions</Link>
                      </React.Fragment>
                    }
                  />
                </div>
                <Button variant="contained">Create account</Button>
              </Stack>
              <div>
                <Link variant="subtitle2">Having an account</Link>
              </div>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
