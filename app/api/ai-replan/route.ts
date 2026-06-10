import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { missedActivityId, currentSchedule } = await req.json();

  const prompt = `
    The user missed activity ${missedActivityId}. 
    Current schedule: ${JSON.stringify(currentSchedule)}.
    Suggest a substitute or adjustment preserving health priorities as a JSON array.
  `;

  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: prompt,
  });

  return NextResponse.json({ adjustedSchedule: JSON.parse(text) });
}