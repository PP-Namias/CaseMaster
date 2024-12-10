import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import { File as FileIcon } from '@phosphor-icons/react/dist/ssr/File';
import { UserPlus as UserPlusIcon } from '@phosphor-icons/react/dist/ssr/UserPlus';

export function Help(): React.JSX.Element {
  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardContent>
        <Stack divider={<Divider />} spacing={2}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '0 0 auto' }}>
              <FileIcon fontSize="var(--icon-fontSize-lg)" />
            </Box>
            <Stack spacing={2}>
              <div>
                <Typography variant="subtitle1">Find courses</Typography>
                <Typography color="text.secondary" variant="body2">
                  Browse the latest written articles
                </Typography>
              </div>
              <div>
                <Button endIcon={<ArrowRightIcon />} size="small" variant="contained">
                  Courses
                </Button>
              </div>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
            <Box sx={{ flex: '0 0 auto' }}>
              <UserPlusIcon fontSize="var(--icon-fontSize-lg)" />
            </Box>
            <Stack spacing={2}>
              <div>
                <Typography variant="subtitle1">Find tutors</Typography>
                <Typography color="text.secondary" variant="body2">
                  Find tutors to help you with your studies
                </Typography>
              </div>
              <div>
                <Button color="secondary" endIcon={<ArrowRightIcon />} size="small" variant="contained">
                  Tutors
                </Button>
              </div>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
