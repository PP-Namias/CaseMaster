import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';

interface Referral {
  color: string;
  initials: string;
  name: string;
  value: number;
}

const referrals = [
  { color: '#455A64', initials: 'GT', name: 'GitHub', value: 53032 },
  { color: '#00BCD4', initials: 'TW', name: 'Twitter', value: 39551 },
  { color: '#3949AB', initials: 'HN', name: 'Hacker News', value: 23150 },
  { color: '#F44336', initials: 'SO', name: 'Stack Overflow', value: 14093 },
  { color: '#E65100', initials: 'RD', name: 'Reddit.com', value: 7251 },
  { color: '#263238', initials: 'DE', name: 'Dev.to', value: 5694 },
  { color: '#0D47A1', initials: 'FB', name: 'Facebook', value: 3643 },
  { color: '#263238', initials: 'MD', name: 'Medium', value: 1654 },
] satisfies Referral[];

export function GroupedList2(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardHeader
            action={
              <IconButton>
                <DotsThreeIcon weight="bold" />
              </IconButton>
            }
            title="Top referrals"
          />
          <Divider />
          <Box sx={{ overflowX: 'auto' }}>
            <List disablePadding>
              {referrals.map((referral, index) => (
                <ListItem divider={index < referrals.length - 1} key={referral.name}>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: referral.color, color: 'var(--mui-palette-common-white)' }}>
                      {referral.initials}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography noWrap variant="subtitle2">
                        {referral.name}
                      </Typography>
                    }
                  />
                  <Typography color="text.secondary" variant="body2">
                    {new Intl.NumberFormat('en-US').format(referral.value)}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
