'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';
import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

const reviews = [
  {
    id: 'REV-5',
    author: 'Laurent B.',
    comment:
      'I keep buying new versions of the template because it is so good and the team at Devias keeps updating it following design trends and updates to NextJS and other libraries [...]',
  },
  {
    id: 'REV-4',
    author: 'Ali Hassan E.',
    comment:
      'I am very happy with the Devias template that I purchased. The team at Devias was very responsive and helpful before and after I bought the template. They were always quick to respond to my questions and they provided excellent customer support.',
  },
  {
    id: 'REV-3',
    author: 'Yossi T.',
    comment:
      'All in all amazing product, clean, bug-free, one of the FASTEST customer support products I have encountered in my life. Very high quality template, all written in a super clean and orgenized way. Highly recommended!',
  },
  {
    id: 'REV-2',
    author: 'Yossi T.',
    comment:
      'All in all amazing product, clean, bug-free, one of the FASTEST customer support products I have encountered in my life. Very high quality template, all written in a super clean and orgenized way. Highly recommended!',
  },
  {
    id: 'REV-1',
    author: 'Chris V.',
    comment: 'Best template out there. I purchase this every year. It saves a ton of time.',
  },
] as const;

export function Testimonails(): React.JSX.Element {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = React.useCallback((api: EmblaCarouselType) => {
    setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <Box
      sx={{
        bgcolor: 'var(--mui-palette-background-level1)',
        borderTop: '1px solid var(--mui-palette-divider)',
        pt: '120px',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={8}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Chip color="primary" icon={<UsersIcon />} label="Features" variant="soft" />
            </Box>
            <Typography sx={{ textAlign: 'center' }} variant="h3">
              What are people saying
            </Typography>
          </Stack>
          <Stack spacing={3} sx={{ '--slide-spacing': '1rem', '--slide-size': '100%', '--slide-height': ' 300px' }}>
            <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  backfaceVisibility: 'hidden',
                  display: 'flex',
                  touchAction: 'pan-y',
                  ml: 'calc(var(--slide-spacing) * -1)',
                }}
              >
                {reviews.map((review) => (
                  <Stack
                    key={review.id}
                    spacing={2}
                    sx={{
                      flex: '0 0 var(--slide-size)',
                      minWidth: 0,
                      pl: 'var(--slide-spacing)',
                      position: 'relative',
                    }}
                  >
                    <Typography color="text.secondary" sx={{ textAlign: 'center' }}>
                      {review.comment}
                    </Typography>
                    <Typography sx={{ textAlign: 'center' }}>{review.author}</Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
              <IconButton disabled={prevBtnDisabled} onClick={scrollPrev}>
                <CaretLeftIcon />
              </IconButton>
              <Stack direction="row" spacing={1} sx={{ flex: '1 1 auto', justifyContent: 'center' }}>
                {scrollSnaps.map((_, index) => (
                  <Box
                    // eslint-disable-next-line react/no-array-index-key -- index is unique
                    key={index}
                    onClick={() => {
                      scrollTo(index);
                    }}
                    sx={{
                      bgcolor:
                        index === selectedIndex
                          ? 'var(--mui-palette-primary-main)'
                          : 'var(--mui-palette-action-selected)',
                      borderRadius: '50%',
                      cursor: 'pointer',
                      height: '8px',
                      mx: '0.25rem',
                      width: '8px',
                    }}
                  />
                ))}
              </Stack>
              <IconButton disabled={nextBtnDisabled} onClick={scrollNext}>
                <CaretRightIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
