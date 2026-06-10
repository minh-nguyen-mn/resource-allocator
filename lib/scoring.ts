export function calculateScore(
  priority: number, 
  conflictCount: number, 
  travelPenalty: boolean
): number {
  // Lower score is better (priority 1 is best)
  let score = priority * 10; 
  if (conflictCount > 0) score += 50 * conflictCount;
  if (travelPenalty) score += 100;
  
  return score;
}