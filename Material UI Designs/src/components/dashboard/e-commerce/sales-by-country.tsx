'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GlobeHemisphereEast as GlobeHemisphereEastIcon } from '@phosphor-icons/react/dist/ssr/GlobeHemisphereEast';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const geoUrl = '/assets/world-countries.json';

export type CountryCode = 'au' | 'ca' | 'de' | 'es' | 'in' | 'ru' | 'uk' | 'us';

const flagIcons: Record<CountryCode, string> = {
  au: '/assets/flag-au.svg',
  ca: '/assets/flag-ph.svg',
  de: '/assets/flag-de.svg',
  es: '/assets/flag-ph.svg',
  in: '/assets/flag-in.svg',
  ru: '/assets/flag-ru.svg',
  uk: '/assets/flag-uk.svg',
  us: '/assets/flag-us.svg',
};

export interface Sale {
  countryCode: CountryCode;
  countryName: string;
  value: number;
}

export interface SalesByCountryProps {
  sales: Sale[];
}

export function SalesByCountry({ sales }: SalesByCountryProps): React.JSX.Element {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <GlobeHemisphereEastIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Sales by country"
      />
      <CardContent>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          <Stack spacing={2} sx={{ flex: '0 0 auto', width: '260px' }}>
            <Stack spacing={2}>
              <Typography color="text.secondary">Total</Typography>
              <Typography variant="h4">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(
                  152000
                )}
              </Typography>
            </Stack>
            <Stack component="ul" spacing={2} sx={{ listStyle: 'none', m: 0, p: 0 }}>
              {sales.map((sale) => {
                const icon = flagIcons[sale.countryCode];

                return (
                  <Stack direction="row" key={sale.countryCode} spacing={1} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        backgroundImage: `url(${icon})`,
                        backgroundPosition: 'center center',
                        backgroundSize: '200%',
                        borderRadius: '50%',
                        flex: '0 0 auto',
                        height: '24px',
                        overflow: 'hidden',
                        width: '24px',
                      }}
                    />
                    <Box sx={{ flex: '1 1 auto' }}>
                      <Typography variant="subtitle2">{sale.countryName}</Typography>
                      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                        <LinearProgress
                          sx={{ flex: '1 1 auto', height: '6px' }}
                          value={sale.value}
                          variant="determinate"
                        />
                        <Typography>
                          {new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 2 }).format(
                            sale.value / 100
                          )}
                        </Typography>
                      </Stack>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Box sx={{ flex: '1 1 auto' }}>
            <ComposableMap height={750} width={1200}>
              <Geographies geography={geoUrl}>
                {({ geographies }): (React.JSX.Element | null)[] =>
                  geographies.map(
                    (geo: Record<string, unknown> & { id: string; rsmKey: string }): React.JSX.Element | null => {
                      // Hide Antartica
                      if (geo.id === 'ATA') {
                        return null;
                      }

                      return (
                        <Geography
                          fill={geo.id === 'USA' ? 'var(--mui-palette-primary-main)' : 'var(--mui-palette-grey-200)'}
                          geography={geo}
                          key={geo.rsmKey}
                          stroke="var(--mui-palette-neutral-100)"
                        />
                      );
                    }
                  )
                }
              </Geographies>
            </ComposableMap>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
