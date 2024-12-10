import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import { Password as PasswordIcon } from '@phosphor-icons/react/dist/ssr/Password';

export function PasswordForm(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PasswordIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Change PIN"
      />
      <CardContent>
        <Stack spacing={3}>
          <Stack spacing={3}>
            <FormControl>
              <InputLabel>Current PIN</InputLabel>
              <OutlinedInput name="oldPassword" type="password" />
            </FormControl>
            <FormControl>
              <InputLabel>New PIN</InputLabel>
              <OutlinedInput name="password" type="password" />
            </FormControl>
            <FormControl>
              <InputLabel>Confirm new PIN</InputLabel>
              <OutlinedInput name="confirmPassword" type="password" />
            </FormControl>
          </Stack>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained">Update</Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
