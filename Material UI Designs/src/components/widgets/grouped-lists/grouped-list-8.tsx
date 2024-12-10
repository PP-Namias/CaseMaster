import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface Member {
  id: string;
  name: string;
  avatar?: string;
  job: string;
}

const members = [
  { id: 'USR-009', name: 'Kendo Jenner', avatar: '/assets/yvez.jpg', job: 'Front End Developer' },
  { id: 'USR-003', name: 'Cj Juliane', avatar: '/assets/CJ.jpg', job: 'UX Designer' },
  { id: 'USR-008', name: 'Jie Yan', avatar: '/assets/avatar-8.png', job: 'Copyright' },
] satisfies Member[];

export function GroupedList8(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography variant="overline">Project members</Typography>
            <List disablePadding>
              {members.map((member) => (
                <ListItem disableGutters key={member.id}>
                  <ListItemAvatar>
                    <Avatar src={member.avatar} />
                  </ListItemAvatar>
                  <ListItemText
                    disableTypography
                    primary={<Typography variant="subtitle2">{member.name}</Typography>}
                    secondary={
                      <Typography color="text.secondary" variant="body2">
                        {member.job}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button color="secondary" size="small">
              Manage members
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
}
