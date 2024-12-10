'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';

import { paths } from '@/paths';
import { NoSsr } from '@/components/core/no-ssr';

export function StartBuilding(): React.JSX.Element {
  const { colorScheme } = useColorScheme();

  return (
    <Box sx={{ bgcolor: 'var(--mui-palette-background-level1)', pb: '60px' }}>
      <Container>
        <Box
          sx={{
            borderRadius: '20px',
            border: '1px solid transparent',
            color: 'var(--mui-palette-common-white)',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              bgcolor: 'var(--mui-palette-neutral-950)',
              borderRadius: '20px',
              bottom: '1px',
              left: '-1px',
              position: 'absolute',
              right: '1px',
              top: '-1px',
              zIndex: 0,
            }}
          >
            <Box
              sx={{
                alignItems: 'center',
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 0,
              }}
            >
              <Box component="img" src="/assets/home-cosmic.svg" sx={{ height: 'auto', width: '1600px' }} />
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
                zIndex: 1,
              }}
            >
              <Box component="img" src="/assets/home-rectangles.svg" sx={{ height: 'auto', width: '1900px' }} />
            </Box>
          </Box>
          <Stack
            spacing={3}
            sx={{
              flex: '0 1 auto',
              position: 'relative',
              px: '64px',
              py: '120px',
              width: { xs: '100%', md: '45%' },
              zIndex: 1,
            }}
          >
            <Stack spacing={2}>
              <Typography color="inherit" variant="h3">
                Start building today.
              </Typography>
              <Typography color="neutral.300">
                Focus on building your app, not on integrating APIs. The kit provides the essential code you need to
                launch quickly.
              </Typography>
            </Stack>
            <div>
              <Button endIcon={<CaretRightIcon />} href={paths.purchase} target="_blank" variant="contained">
                Purchase now
              </Button>
            </div>
          </Stack>
          <Box
            sx={{
              alignItems: { xs: 'flex-end', md: 'stretch' },
              borderRadius: '20px',
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              pl: { xs: '64px', md: 0 },
              position: 'relative',
              zIndex: 2,
            }}
          >
            <NoSsr>
              <Box sx={{ height: '340px', position: 'relative', width: { xs: '80%', md: '100%' } }}>
                <Box
                  sx={{
                    bgcolor: '#8057f4',
                    filter: 'blur(50px)',
                    height: '40px',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    zIndex: 0,
                  }}
                />
                <Box sx={{ height: '100%', position: 'relative', width: '100%', zIndex: 1 }}>
                  <Box
                    component="img"
                    src={colorScheme === 'dark' ? '/assets/home-cta-dark.png' : '/assets/home-cta-light.png'}
                    sx={{
                      display: 'block',
                      bottom: '1px',
                      height: '100%',
                      left: 0,
                      position: 'absolute',
                      width: 'auto',
                    }}
                  />
                </Box>
              </Box>
            </NoSsr>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
