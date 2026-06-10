import { addMinutes, startOfDay } from 'date-fns';
import { isTraveling, checkResourceAvailability } from './constraints';

export function generateSchedule(
  activities: any[],
  availability: any[],
  travelPlans: any[],
  startDate: Date,
  endDate: Date
) {
  const schedule: any[] = [];
  const sortedActivities = [...activities].sort((a, b) => a.priority - b.priority);

  let currentDate = startOfDay(startDate);

  while (currentDate <= endDate) {
    const traveling = isTraveling(currentDate, travelPlans);

    for (const activity of sortedActivities) {
      if (traveling && !activity.remoteAllowed) continue;

      const duration = activity.durationMinutes;
      const proposedStart = new Date(currentDate.setHours(9, 0, 0, 0));
      const proposedEnd = addMinutes(proposedStart, duration);

      const requiredResources = [
        ...(activity.requiredEquipment || []), 
        ...(activity.requiredSpecialist ? [activity.requiredSpecialist] : [])
      ];

      const resourcesAvailable = requiredResources.every(resourceId => 
        checkResourceAvailability(resourceId, proposedStart, proposedEnd, availability)
      );

      const hasConflict = schedule.some(slot => 
        (proposedStart >= slot.startTime && proposedStart < slot.endTime)
      );

      if (resourcesAvailable && !hasConflict) {
        schedule.push({
          id: Math.random().toString(36).substr(2, 9),
          activityId: activity.id,
          title: activity.title,
          startTime: proposedStart,
          endTime: proposedEnd,
          isSubstitute: traveling
        });
        
        currentDate = addMinutes(currentDate, duration + 30); // Advance time slot + buffer
      }
    }
    currentDate = addMinutes(startOfDay(currentDate), 24 * 60); // Move to next day
  }

  return schedule;
}