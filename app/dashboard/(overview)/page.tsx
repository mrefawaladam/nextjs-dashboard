import SideNav from '@/app/ui/dashboard/sidenav';
import { Card } from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { 
  CardsSkeleton,
  RevenueChartSkeleton } from '@/app/ui/skeletons';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import CardWrapper from '@/app/ui/dashboard/cards';

import { 
  fetchLatestInvoices,
  fetchCardData
} from '@/app/lib/data';

export default async function Page() {
 
  const latestInvoices = await fetchLatestInvoices();
  const {
  } = await fetchCardData();
 
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <main>
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
            <LatestInvoices latestInvoices={latestInvoices} />
          </div>
        </main>
      </div>
    </div>
  );
}
