import HomePage from '@/components/shared/HomePage';
import { getDashboardStats } from '@/lib/actions/stats';
import { Suspense } from 'react';
import Loading from './loading';

export const revalidate = 0;

export default async function Page() {
  const stats = await getDashboardStats();
  return (
    <Suspense fallback={<Loading />}>
      <HomePage stats={stats} />
    </Suspense>
  );
}
