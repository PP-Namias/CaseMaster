import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { PlugsConnected as PlugsConnectedIcon } from '@phosphor-icons/react/dist/ssr/PlugsConnected';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

export interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  installed: boolean;
}

export interface IntegrationsProps {
  integrations: Integration[];
}

export function Integrations({ integrations }: IntegrationsProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PlugsConnectedIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Integrations"
      />
      <CardContent>
        <Card sx={{ borderRadius: 1 }} variant="outlined">
          <Stack divider={<Divider />}>
            {integrations.map((integration) => (
              <Stack direction="row" key={integration.id} spacing={2} sx={{ alignItems: 'center', px: 2, py: 1 }}>
                <Avatar
                  src={integration.icon}
                  sx={{
                    bgcolor: 'var(--mui-palette-background-paper)',
                    boxShadow: 'var(--mui-shadows-8)',
                    color: 'var(--mui-palette-text-primary)',
                  }}
                />
                <Box sx={{ flex: '1 1 auto' }}>
                  <Typography variant="subtitle2">{integration.name}</Typography>
                  <Typography color="text.secondary" variant="caption">
                    {integration.description}
                  </Typography>
                </Box>
                <Button
                  color="secondary"
                  disabled={integration.installed}
                  endIcon={<PlusIcon />}
                  size="small"
                  variant="outlined"
                >
                  Install
                </Button>
              </Stack>
            ))}
          </Stack>
        </Card>
      </CardContent>
    </Card>
  );
}
