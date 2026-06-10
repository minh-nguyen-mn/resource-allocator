import { isWithinInterval } from 'date-fns';

export interface TravelPlan {
  id: string;
  startDate: Date;
  endDate: Date;
  destination: string;
}

export function isTraveling(date: Date, travelPlans: TravelPlan[]): boolean {
  return travelPlans.some(plan => 
    isWithinInterval(date, { start: plan.startDate, end: plan.endDate })
  );
}

export function checkResourceAvailability(
  resourceId: string, 
  start: Date, 
  end: Date, 
  availabilities: any[]
): boolean {
  const resourceAvail = availabilities.filter(a => a.resourceId === resourceId);
  if (resourceAvail.length === 0) return true; // Assume available if unconstrained
  
  return resourceAvail.some(a => 
    start >= new Date(a.start) && end <= new Date(a.end) && a.isAvailable
  );
}