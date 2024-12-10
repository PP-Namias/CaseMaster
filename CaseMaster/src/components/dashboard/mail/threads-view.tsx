'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ArrowCounterClockwise as ArrowCounterClockwiseIcon } from '@phosphor-icons/react/dist/ssr/ArrowCounterClockwise';
import { CaretLeft as CaretLeftIcon } from '@phosphor-icons/react/dist/ssr/CaretLeft';
import { CaretRight as CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';

import { paths } from '@/paths';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSelection } from '@/hooks/use-selection';

import { MailContext } from './mail-context';
import { ThreadItem } from './thread-item';

export function ThreadsView(): React.JSX.Element {
  const { currentLabelId, threads, setOpenDesktopSidebar, setOpenMobileSidebar } = React.useContext(MailContext);

  const mdDown = useMediaQuery('down', 'md');

  const threadIds = React.useMemo(() => threads.map((thread) => thread.id), [threads]);
  const { deselectAll, deselectOne, selectAll, selectOne, selected } = useSelection(threadIds);

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0 }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'center',
          borderBottom: '1px solid var(--mui-palette-divider)',
          flex: '0 0 auto',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <div>
          <IconButton
            onClick={() => {
              if (mdDown) {
                setOpenMobileSidebar((prev) => !prev);
              } else {
                setOpenDesktopSidebar((prev) => !prev);
              }
            }}
          >
            <ListIcon />
          </IconButton>
        </div>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '0 0 auto' }}>
          <OutlinedInput
            placeholder="Search thread"
            startAdornment={
              <InputAdornment position="start">
                <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
              </InputAdornment>
            }
            sx={{ width: '200px' }}
          />
          <Tooltip title="Next page">
            <IconButton>
              <CaretLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Previous page">
            <IconButton>
              <CaretRightIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
              <ArrowCounterClockwiseIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {threads.length ? (
        <React.Fragment>
          <Box
            sx={{
              alignItems: 'center',
              borderBottom: '1px solid var(--mui-palette-divider)',
              display: { xs: 'none', md: 'flex' },
              p: 2,
            }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Checkbox
                checked={selected.size === threads.length}
                indeterminate={selected.size > 0 && selected.size < threads.length}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (event.target.checked) {
                    selectAll();
                  } else {
                    deselectAll();
                  }
                }}
              />
              <Typography variant="subtitle2">Select all</Typography>
            </Stack>
            <Tooltip title="More options">
              <IconButton>
                <DotsThreeIcon weight="bold" />
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{ overflowY: 'auto' }}>
            {threads.map((thread) => (
              <ThreadItem
                href={paths.dashboard.mail.details(currentLabelId, thread.id)}
                key={thread.id}
                onDeselect={() => {
                  deselectOne(thread.id);
                }}
                onSelect={() => {
                  selectOne(thread.id);
                }}
                selected={selected.has(thread.id)}
                thread={thread}
              />
            ))}
          </Box>
        </React.Fragment>
      ) : (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            justifyContent: 'center',
            overflowY: 'auto',
            p: 3,
          }}
        >
          <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <Box>
              <Box
                alt="No threads"
                component="img"
                src="/assets/not-found.svg"
                sx={{ height: 'auto', maxWidth: '100%', width: '120px' }}
              />
            </Box>
            <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="h6">
              There are no threads
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
