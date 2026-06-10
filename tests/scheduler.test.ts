import { expect, test, describe } from 'vitest';
import { generateSchedule } from '../lib/scheduler';

describe('Scheduling Engine Constraints', () => {
  test('It should skip non-remote activities during travel', () => {
    const activities = [
      { id: '1', title: 'Gym Workout', priority: 1, durationMinutes: 60, remoteAllowed: false }
    ];
    const travel = [
      { id: 't1', startDate: new Date('2026-01-01'), endDate: new Date('2026-01-05'), destination: 'NYC' }
    ];

    const schedule = generateSchedule(
      activities, 
      [], 
      travel, 
      new Date('2026-01-02T00:00:00Z'), 
      new Date('2026-01-02T23:59:59Z')
    );
    
    expect(schedule.length).toBe(0);
  });
});