'use client';

import { useState, useEffect } from 'react';
import CalendarView from '@/components/CalendarView';

export default function SchedulePage() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchedule() {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startDate: new Date().toISOString(),
          endDate: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString()
        })
      });
      const data = await res.json();
      setSchedule(data.generatedPlan || []);
      setLoading(false);
    }
    fetchSchedule();
  }, []);

  if (loading) return <div className="p-10 text-center text-blue-600 font-medium">Generating schedule...</div>;

  return (
    <div className="min-h-screen p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Generated Calendar</h1>
      <CalendarView events={schedule} />
    </div>
  );
}