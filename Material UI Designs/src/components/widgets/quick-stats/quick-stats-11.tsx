import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';

export function QuickStats11(): React.JSX.Element {
  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', p: 3 }}>
      <Grid container spacing={3}>
        <Grid lg={4} xs={12}>
          <Card>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', px: 4, py: 3 }}>
              <div>
                <Box
                  alt="Tick"
                  component="img"
                  src="/assets/iconly-glass-tick.svg"
                  sx={{ height: 'auto', width: '48px' }}
                />
              </div>
              <Box sx={{ flex: '1 1 auto' }}>
                <Typography color="text.secondary" variant="body2">
                  Done tasks
                </Typography>
                <Typography variant="h4">{new Intl.NumberFormat('en-US').format(32)}</Typography>
              </Box>
            </Stack>
            <Divider />
            <CardActions>
              <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                See all tasks
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid lg={4} xs={12}>
          <Card>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', px: 4, py: 3 }}>
              <div>
                <Box
                  alt="Paper"
                  component="img"
                  src="/assets/iconly-glass-paper.svg"
                  sx={{ height: 'auto', width: '48px' }}
                />
              </div>
              <Box sx={{ flex: '1 1 auto' }}>
                <Typography color="text.secondary" variant="body2">
                  Open tickets
                </Typography>
                <Typography variant="h4">{new Intl.NumberFormat('en-US').format(21)}</Typography>
              </Box>
            </Stack>
            <Divider />
            <CardActions>
              <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                See all tickets
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid lg={4} xs={12}>
          <Card>
            <Stack direction="row" spacing={3} sx={{ alignItems: 'center', px: 4, py: 3 }}>
              <div>
                <Box
                  alt="Info"
                  component="img"
                  src="/assets/iconly-glass-info.svg"
                  sx={{ height: 'auto', width: '48px' }}
                />
              </div>
              <Box sx={{ flex: '1 1 auto' }}>
                <Typography color="text.secondary" variant="body2">
                  Pending issues
                </Typography>
                <Typography variant="h4">{new Intl.NumberFormat('en-US').format(4)}</Typography>
              </Box>
            </Stack>
            <Divider />
            <CardActions>
              <Button color="secondary" endIcon={<ArrowRightIcon />} size="small">
                See all issues
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
