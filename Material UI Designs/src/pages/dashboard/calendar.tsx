import * as React from 'react';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import type { Metadata } from '@/types/metadata';
import { config } from '@/config';
import { dayjs } from '@/lib/dayjs';
import { CalendarProvider } from '@/components/dashboard/calendar/calendar-context';
import { CalendarView } from '@/components/dashboard/calendar/calendar-view';
import type { Event, ViewMode } from '@/components/dashboard/calendar/types';

const metadata = { title: `Calendar | Dashboard | ${config.site.name}` } satisfies Metadata;

const events = [
  {
    id: 'EV-007',
    title: 'Sign contract',
    description: 'Discuss about the new partnership',
    start: dayjs().subtract(6, 'day').set('hour', 17).set('minute', 30).toDate(),
    end: dayjs().subtract(6, 'day').set('hour', 19).set('minute', 0).toDate(),
    allDay: false,
  },
  {
    id: 'EV-006',
    title: 'Lunch meeting',
    description: 'Meeting with the client',
    start: dayjs().add(2, 'day').set('hour', 12).set('minute', 0).toDate(),
    end: dayjs().add(2, 'day').set('hour', 15).set('minute', 30).toDate(),
    allDay: false,
  },
  {
    id: 'EV-005',
    title: 'Scrum meeting',
    description: 'Discuss about the new project',
    start: dayjs().add(5, 'day').set('hour', 8).set('minute', 0).toDate(),
    end: dayjs().add(5, 'day').set('hour', 12).set('minute', 0).toDate(),
    allDay: false,
  },
  {
    id: 'EV-004',
    title: 'Meet the team',
    description: 'Introduction to the new team members',
    start: dayjs().subtract(11, 'day').startOf('day').toDate(),
    end: dayjs().subtract(11, 'day').endOf('day').toDate(),
    allDay: true,
  },
  {
    id: 'EV-003',
    title: 'Fire John',
    description: 'Sorry, John!',
    start: dayjs().add(3, 'day').set('hour', 7).set('minute', 30).toDate(),
    end: dayjs().add(3, 'day').set('hour', 7).set('minute', 31).toDate(),
    allDay: false,
    priority: 'high',
  },
  {
    id: 'EV-002',
    title: 'Design meeting',
    description: 'Plan the new design for the landing page',
    start: dayjs().subtract(6, 'day').set('hour', 9).set('minute', 0).toDate(),
    end: dayjs().subtract(6, 'day').set('hour', 9).set('minute', 30).toDate(),
    allDay: false,
    priority: 'medium',
  },
  {
    id: 'EV-001',
    title: 'HR meeting',
    description: 'Discuss about the new open positions',
    start: dayjs().set('hour', 15).set('minute', 30).toDate(),
    end: dayjs().set('hour', 17).set('minute', 30).toDate(),
    allDay: false,
    priority: 'medium',
  },
] satisfies Event[];

export function Page(): React.JSX.Element {
  const { view = 'dayGridMonth' } = useExtractSearchParams();

  return (
    <React.Fragment>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <Box
        sx={{
          maxWidth: 'var(--Content-maxWidth)',
          m: 'var(--Content-margin)',
          p: 'var(--Content-padding)',
          width: 'var(--Content-width)',
        }}
      >
        <CalendarProvider events={events}>
          <CalendarView view={view} />
        </CalendarProvider>
      </Box>
    </React.Fragment>
  );
}

function useExtractSearchParams(): { view?: ViewMode } {
  const [searchParams] = useSearchParams();

  return { view: (searchParams.get('view') || undefined) as ViewMode | undefined };
}
