import { useState, useEffect, useMemo } from 'react';
import type { CalendarEvent } from '../types';
import { calendarEvents } from '../data/events';

export type ViewType = 'month' | 'week' | 'list';
export type AudienceFilter = 'all' | 'teachers' | 'students' | 'general';
export type EventStatus = 'planned' | 'ongoing' | 'completed';

interface FiltersState {
  audience: AudienceFilter;
  eventType: string;
  status: EventStatus | 'all';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export const useCalendarEvents = () => {
  const [events, setEvents] = useState<CalendarEvent[]>(calendarEvents);
  const [view, setView] = useState<ViewType>('month');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [filters, setFilters] = useState<FiltersState>({
    audience: 'all',
    eventType: 'all',
    status: 'all',
  });
  const [loading, setLoading] = useState(false);

  // Simulate API call
  const fetchEvents = async () => {
    setLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setEvents(calendarEvents);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Get event status based on dates
  const getEventStatus = (event: CalendarEvent): EventStatus => {
    const now = new Date();
    const eventDate = new Date(event.date);
    const eventEndDate = event.endDate ? new Date(event.endDate) : eventDate;

    if (eventDate > now) {
      return 'planned';
    } else if (eventEndDate < now) {
      return 'completed';
    } else {
      return 'ongoing';
    }
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const status = getEventStatus(event);
      
      // Audience filter
      if (filters.audience !== 'all' && event.category !== filters.audience) {
        return false;
      }

      // Event type filter
      if (filters.eventType !== 'all' && event.type !== filters.eventType) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && status !== filters.status) {
        return false;
      }

      // Date range filter
      if (filters.dateRange) {
        const eventDate = new Date(event.date);
        if (eventDate < filters.dateRange.start || eventDate > filters.dateRange.end) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  // Get events for current month/week
  const visibleEvents = useMemo(() => {
    if (view === 'list') {
      return filteredEvents;
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (view === 'month') {
      return filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === year && eventDate.getMonth() === month;
      });
    }

    // Week view
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  }, [filteredEvents, currentDate, view]);

  const updateFilter = (key: keyof FiltersState, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const goToNextPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToPrevPeriod = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return {
    events: visibleEvents,
    allEvents: filteredEvents,
    view,
    setView,
    currentDate,
    setCurrentDate,
    filters,
    updateFilter,
    loading,
    getEventStatus,
    goToNextPeriod,
    goToPrevPeriod,
    goToToday,
  };
};

