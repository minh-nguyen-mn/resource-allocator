import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function Dashboard() {
  const activityCount = await prisma.activity.count();
  const availabilityCount = await prisma.availability.count();

  return (
    <main className="min-h-screen p-10 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Resource Allocator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Activities</h3>
          <p className="text-3xl font-semibold mt-2">{activityCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 uppercase">Resource Blocks</h3>
          <p className="text-3xl font-semibold mt-2">{availabilityCount}</p>
        </div>
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200 flex items-center justify-center hover:bg-blue-50 transition">
          <Link href="/schedule" className="text-lg font-medium text-blue-600 hover:underline">
            View Schedule &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}