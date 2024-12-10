import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export function Form3(): React.JSX.Element {
  return (
    <Box sx={{ p: 3 }}>
      <CardHeader title="Notifications" />
      <Divider />
      <CardContent>
        <Grid container spacing={6} wrap="wrap">
          <Grid md={4} sm={6} xs={12}>
            <Stack spacing={2}>
              <div>
                <Typography variant="subtitle2">System</Typography>
                <Typography color="text.secondary" variant="body2">
                  You will receive emails in your business email address
                </Typography>
              </div>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Email alerts" />
                <FormControlLabel control={<Checkbox />} label="Push notifications" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Text message" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Phone calls" />
              </FormGroup>
            </Stack>
          </Grid>
          <Grid md={4} sm={6} xs={12}>
            <Stack spacing={2}>
              <div>
                <Typography variant="subtitle2">Chat app</Typography>
                <Typography color="text.secondary" variant="body2">
                  You will receive emails in your business email address
                </Typography>
              </div>
              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Email" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Push notifications" />
              </FormGroup>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button variant="contained">Save settings</Button>
      </CardActions>
    </Box>
  );
}
