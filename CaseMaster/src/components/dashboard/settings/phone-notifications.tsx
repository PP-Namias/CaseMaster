import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';

export function PhoneNotifications(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PhoneIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Phone"
      />
      <CardContent>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Security updates</Typography>
            <Typography color="text.secondary" variant="body2">
              Important notifications about your account security.
            </Typography>
          </Stack>
          <Switch />
        </Stack>
      </CardContent>
    </Card>
  );
}
