import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Lightbulb as LightbulbIcon } from '@phosphor-icons/react/dist/ssr/Lightbulb';

export interface InsightProps {
  insights: { id: string; title: string; description: string }[];
}

export function Insight({ insights }: InsightProps): React.JSX.Element {
  const insight = insights[0];

  return (
    <Card
      sx={{
        bgcolor: 'var(--mui-palette-primary-main)',
        color: 'var(--mui-palette-primary-contrastText)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
      }}
    >
      <Box
        component="img"
        src="/assets/pulse.svg"
        sx={{ height: '450px', left: 0, position: 'absolute', top: 0, width: '450px', zIndex: 0 }}
      />
      <CardHeader
        action={
          <IconButton color="inherit">
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <LightbulbIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        sx={{ zIndex: 1 }}
        title="Insight"
      />
      <CardContent sx={{ zIndex: 1 }}>
        <Stack key={insight.id} spacing={3}>
          <Typography color="inherit" variant="h1">
            {insight.title}
          </Typography>
          <Typography color="inherit">{insight.description}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
