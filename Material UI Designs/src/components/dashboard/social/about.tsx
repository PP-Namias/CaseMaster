import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BookOpen as BookOpenIcon } from '@phosphor-icons/react/dist/ssr/BookOpen';
import { Briefcase as BriefcaseIcon } from '@phosphor-icons/react/dist/ssr/Briefcase';
import { EnvelopeSimple as EnvelopeSimpleIcon } from '@phosphor-icons/react/dist/ssr/EnvelopeSimple';
import { House as HouseIcon } from '@phosphor-icons/react/dist/ssr/House';

export function About(): React.JSX.Element {
  return (
    <Card>
      <CardHeader title="About" />
      <CardContent>
        <Stack spacing={2}>
          <Typography color="text.secondary" variant="subtitle2">
            &quot; Everyone thinks of changing the world, but no one thinks of changing himself. &quot;
          </Typography>
          <List disablePadding sx={{ '& .MuiListItem-root': { px: 0, py: 2 } }}>
            <ListItem divider>
              <ListItemIcon>
                <BriefcaseIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography noWrap variant="subtitle2">
                    Product Designer at{' '}
                    <Link color="text.primary" variant="subtitle2">
                      Devias IO
                    </Link>
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" noWrap variant="body2">
                    Past: UX Designer{' '}
                    <Link color="text.secondary" variant="body2">
                      Focus Aesthetic Dynamics
                    </Link>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <BookOpenIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Link color="text.secondary" noWrap sx={{ cursor: 'pointer' }} underline="always" variant="body2">
                    Add school or collage
                  </Link>
                }
              />
            </ListItem>
            <ListItem divider>
              <ListItemIcon>
                <HouseIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography noWrap variant="subtitle2">
                    Lives in{' '}
                    <Link color="text.primary" variant="subtitle2">
                      Bucharest
                    </Link>
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" noWrap variant="body2">
                    Originally from{' '}
                    <Link color="text.secondary" variant="body2">
                      Rm. Valcea
                    </Link>
                  </Typography>
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EnvelopeSimpleIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography noWrap variant="subtitle2">
                    pp.namias@gmail.com
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </Stack>
      </CardContent>
    </Card>
  );
}
