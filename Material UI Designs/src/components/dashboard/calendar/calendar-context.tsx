'use client';

import * as React from 'react';

import type { Event, EventPriority } from './types';

function noop(): void {
  return undefined;
}

interface EventCreateParams {
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay: boolean;
  priority?: EventPriority;
}

interface EventUpdateParams {
  title?: string;
  description?: string;
  start?: Date;
  end?: Date;
  allDay?: boolean;
  priority?: EventPriority;
}

export interface CalendarContextValue {
  events: Map<string, Event>;
  currentEventId?: string;
  setCurrentEventId: (eventId?: string) => void;
  createEvent: (params: EventCreateParams) => void;
  deleteEvent: (eventId: string) => void;
  updateEvent: (eventId: string, params: EventUpdateParams) => void;
}

export const CalendarContext = React.createContext<CalendarContextValue>({
  events: new Map(),
  setCurrentEventId: noop,
  createEvent: noop,
  deleteEvent: noop,
  updateEvent: noop,
});

export interface CalendarProviderProps {
  children: React.ReactNode;
  events: Event[];
}

export function CalendarProvider({ children, events: initialEvents = [] }: CalendarProviderProps): React.JSX.Element {
  const [events, setEvents] = React.useState(new Map<string, Event>());
  const [currentEventId, setCurrentEventId] = React.useState<string>();

  React.useEffect((): void => {
    setEvents(new Map(initialEvents.map((event) => [event.id, event])));
  }, [initialEvents]);

  const handleCreateEvent = React.useCallback(
    (params: EventCreateParams) => {
      const updatedEvents = new Map<string, Event>(events);

      // Create event
      const event: Event = { id: `EV-${Date.now()}`, ...params };

      // Add event
      updatedEvents.set(event.id, event);

      // Dispatch update
      setEvents(updatedEvents);
    },
    [events]
  );

  const handleUpdateEvent = React.useCallback(
    (eventId: string, params: EventUpdateParams) => {
      const event = events.get(eventId);

      // Event might no longer exist
      if (!event) {
        return;
      }

      const updatedEvents = new Map<string, Event>(events);

      // Update event
      updatedEvents.set(eventId, { ...event, ...params });

      // Dispatch update
      setEvents(updatedEvents);
    },
    [events]
  );

  const handleDeleteEvent = React.useCallback(
    (eventId: string) => {
      const event = events.get(eventId);

      // Event might no longer exist
      if (!event) {
        return;
      }

      const updatedEvents = new Map<string, Event>(events);

      // Delete event
      updatedEvents.delete(eventId);

      // Dispatch update
      setEvents(updatedEvents);
    },
    [events]
  );

  return (
    <CalendarContext.Provider
      value={{
        events,
        currentEventId,
        setCurrentEventId,
        createEvent: handleCreateEvent,
        deleteEvent: handleDeleteEvent,
        updateEvent: handleUpdateEvent,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}
