import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Lock as LockIcon } from '@phosphor-icons/react/dist/ssr/Lock';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';

import { PropertyItem } from '@/components/core/property-item';
import { PropertyList } from '@/components/core/property-list';

export function DetailList2(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardHeader title="Contact details" />
        <Divider />
        <PropertyList divider={<Divider />} sx={{ '--PropertyItem-padding': '16px 24px' }}>
          {(
            [
              {
                key: 'Email',
                value: (
                  <div>
                    <Typography variant="body2">miron.vitold@domain.com</Typography>
                    <Chip color="success" label="Email verified" size="small" variant="soft" />
                  </div>
                ),
              },
              { key: 'Phone', value: '(425) 434-5535' },
              { key: 'Country', value: 'United States' },
              { key: 'State', value: 'Michigan' },
              { key: 'City', value: 'Southfield' },
              { key: 'Address1', value: '1721 Bartlett Avenue' },
              { key: 'Address2', value: '-' },
            ] satisfies { key: string; value: React.ReactNode }[]
          ).map(
            (item): React.JSX.Element => (
              <PropertyItem key={item.key} name={item.key} value={item.value} />
            )
          )}
        </PropertyList>
        <Divider />
        <Stack spacing={1} sx={{ alignItems: 'flex-start', p: 1 }}>
          <Button color="secondary" startIcon={<LockIcon />}>
            Reset &amp; send password
          </Button>
          <Button color="secondary" startIcon={<UserIcon />}>
            Login as customer
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
