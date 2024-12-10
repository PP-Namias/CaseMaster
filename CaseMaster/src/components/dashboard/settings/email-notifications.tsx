import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';

export function EmailNotifications(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <EnvelopeSimpleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Email"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Product updates</Typography>
              <Typography color="text.secondary" variant="body2">
                News, announcements, and product updates.
              </Typography>
            </Stack>
            <Switch defaultChecked />
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Security updates</Typography>
              <Typography color="text.secondary" variant="body2">
                Important notifications about your account security.
              </Typography>
            </Stack>
            <Switch />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
