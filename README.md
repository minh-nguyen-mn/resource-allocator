# Resource Allocator

A constraint-based scheduling MVP for healthcare operations. Built with Next.js 15, Prisma, and deployed on Vercel.

## Setup
1. `npm install`
2. Create `.env` and set `DATABASE_URL` (Neon/Supabase PostgreSQL).
3. `npx prisma db push`
4. `npm run generate-data` to seed `/data`.
5. `npm run dev`

## Architecture
- **Algorithm**: Greedily assigns high-priority tasks using a time-blocking heuristic while evaluating travel/resource constraints.
- **AI Re-planning**: Hits an OpenAI-compatible endpoint to suggest schedule permutations upon missed activities.