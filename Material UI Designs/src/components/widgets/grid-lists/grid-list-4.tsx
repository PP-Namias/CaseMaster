import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

interface Applicant {
  id: string;
  name: string;
  avatar?: string;
  cover: string;
  skills: string[];
  commonContacts: number;
}

const applicants = [
  {
    id: 'USR-009',
    name: 'Kendo Jenner',
    avatar: '/assets/yvez.jpg',
    cover: '/assets/image-minimal-1.png',
    skills: ['UX', 'Frontend development', 'HTML5', 'VueJS', 'ReactJS'],
    commonContacts: 12,
  },
  {
    id: 'USR-000',
    name: 'PP Namias',
    avatar: '/assets/avatar.jpg',
    cover: '/assets/image-abstract-1.png',
    skills: ['Backend development', 'Firebase', 'MongoDB', 'ExpressJS'],
    commonContacts: 17,
  },
  {
    id: 'USR-003',
    name: 'Cj Juliane',
    avatar: '/assets/CJ.jpg',
    cover: '/assets/image-minimal-2.png',
    skills: ['UI', 'UX', 'Full-Stack development', 'Angular', 'ExpressJS'],
    commonContacts: 5,
  },
] satisfies Applicant[];

export function GridList4(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        {applicants.map((applicant) => (
          <Grid key={applicant.id} md={4} sm={6} xs={12}>
            <Card sx={{ height: '100%' }}>
              <CardMedia image={applicant.cover} sx={{ height: '200px' }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: '-50px' }}>
                <Avatar
                  alt="Applicant"
                  src={applicant.avatar}
                  sx={{ '--Avatar-size': '100px', border: '3px solid var(--mui-palette-background-paper)' }}
                />
              </Box>
              <CardContent>
                <Stack divider={<Divider />} spacing={3}>
                  <div>
                    <Typography sx={{ textAlign: 'center' }} variant="h6">
                      {applicant.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                      {applicant.commonContacts} contacts in common
                    </Typography>
                  </div>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
                    {(applicant.skills ?? []).map((skill) => (
                      <Chip key={skill} label={skill} sx={{ m: 0.5 }} variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
