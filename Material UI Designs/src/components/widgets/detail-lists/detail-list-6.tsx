import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { dayjs } from '@/lib/dayjs';

export function DetailList6(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={3}>
            <Avatar src="/assets/avatar-11.png" />
            <div>
              <Link color="text.primary" underline="none" variant="subtitle2">
                Omar Darobe
              </Link>
              <Typography color="text.secondary" sx={{ display: 'block', lineHeight: 1 }} variant="overline">
                Contest holder
              </Typography>
            </div>
          </Stack>
          <List sx={{ '& .MuiListItem-root': { justifyContent: 'space-between', px: 0, py: 2 } }}>
            <ListItem divider>
              <Typography variant="subtitle2">Deadline</Typography>
              <Typography color="text.secondary" variant="body2">
                {dayjs().add(14, 'day').format('DD MMM YYYY')}
              </Typography>
            </ListItem>
            <ListItem divider>
              <Typography variant="subtitle2">Budget</Typography>
              <Typography color="text.secondary" variant="body2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(12500)}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="subtitle2">Last update</Typography>
              <Typography color="text.secondary" variant="body2">
                {dayjs().subtract(23, 'minute').format('DD MMM YYYY')}
              </Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
}
