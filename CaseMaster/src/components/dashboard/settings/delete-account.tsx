import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Warning as WarningIcon } from '@phosphor-icons/react/dist/ssr/Warning';

export function DeleteAccount(): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <WarningIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Transfer Admin Role"
      />
      <CardContent>
        <Stack spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="subtitle1">
            Transfer admin responsibilities to another user. Once assigned, the new admin will have full control, and you will no longer have admin access unless reassigned.          </Typography>
          <Button color="error" variant="outlined">
            Transfer Admin Role
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
