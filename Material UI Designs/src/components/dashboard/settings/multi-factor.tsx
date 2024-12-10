import * as React from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { Key as KeyIcon } from '@phosphor-icons/react/dist/ssr/Key';

export function MultiFactor(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <KeyIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Multi factor authentication"
      />
      <CardContent>
        <Stack spacing={3}>
          <Grid container spacing={3}>
            <Grid xl={6} xs={12}>
              <Card sx={{ height: '100%' }} variant="outlined">
                <CardContent>
                  <Stack spacing={4}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Box
                          sx={{
                            bgcolor: 'var(--mui-palette-error-main)',
                            borderRadius: '50%',
                            display: 'block',
                            height: '8px',
                            width: '8px',
                          }}
                        />
                        <Typography color="error" variant="body2">
                          Off
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Authenticator app</Typography>
                      <Typography color="text.secondary" variant="body2">
                        Use an authenticator app to generate one time security codes.
                      </Typography>
                    </Stack>
                    <div>
                      <Button endIcon={<ArrowRightIcon />} variant="contained">
                        Set up authenticator
                      </Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid xl={6} xs={12}>
              <Card sx={{ height: '100%' }} variant="outlined">
                <CardContent>
                  <Stack spacing={4}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                        <Box
                          sx={{
                            bgcolor: 'var(--mui-palette-error-main)',
                            borderRadius: '50%',
                            display: 'block',
                            height: '8px',
                            width: '8px',
                          }}
                        />
                        <Typography color="error" variant="body2">
                          Off
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Text message</Typography>
                      <Typography color="text.secondary" variant="body2">
                        Use your mobile phone to receive security codes via SMS.
                      </Typography>
                    </Stack>
                    <div>
                      <Button endIcon={<ArrowRightIcon />} variant="contained">
                        Set up phone
                      </Button>
                    </div>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Alert color="success">
            87% of the technology industry has already implemented MFA and it is the top sector with the highest MFA
            adoption rate.
          </Alert>
        </Stack>
      </CardContent>
    </Card>
  );
}
