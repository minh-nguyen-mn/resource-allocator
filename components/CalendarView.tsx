'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

export default function CalendarView({ events }: { events: any[] }) {
  const formattedEvents = events.map(e => ({
    title: e.title,
    start: new Date(e.startTime),
    end: new Date(e.endTime),
  }));

  return (
    <div className="h-[600px] bg-white p-4 rounded shadow-sm border border-gray-200">
      <Calendar localizer={localizer} events={formattedEvents} startAccessor="start" endAccessor="end" />
    </div>
  );
}