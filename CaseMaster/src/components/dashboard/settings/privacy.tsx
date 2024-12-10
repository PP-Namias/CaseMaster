import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { UserCircle as UserCircleIcon } from '@phosphor-icons/react/dist/ssr/UserCircle';

export function Privacy(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <UserCircleIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Privacy"
      />
      <CardContent>
        <Stack divider={<Divider />} spacing={3}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Make contact info public</Typography>
              <Typography color="text.secondary" variant="body2">
                Means that anyone viewing your profile will be able to see your contacts details.
              </Typography>
            </Stack>
            <Switch />
          </Stack>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Stack spacing={1}>
              <Typography variant="subtitle1">Available to hire</Typography>
              <Typography color="text.secondary" variant="body2">
                Toggling this will let your teammates know that you are available for acquiring new projects.
              </Typography>
            </Stack>
            <Switch defaultChecked />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
