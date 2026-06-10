import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { generateSchedule } from '@/lib/scheduler';

export async function POST(req: Request) {
  const { startDate, endDate } = await req.json();

  const [activities, availability, travelPlans] = await Promise.all([
    prisma.activity.findMany(),
    prisma.availability.findMany({
      where: { start: { gte: new Date(startDate) }, end: { lte: new Date(endDate) } }
    }),
    prisma.travelPlan.findMany({
      where: { startDate: { gte: new Date(startDate) } }
    })
  ]);

  const schedule = generateSchedule(
    activities, 
    availability, 
    travelPlans, 
    new Date(startDate), 
    new Date(endDate)
  );

  return NextResponse.json({ generatedPlan: schedule });
}