import { Suspense } from 'react';
import Loading from './loading';
import { getDoctors, getDoctorsStats } from '@/lib/actions/auth';
import DoctorsPage from '@/components/shared/Users/DoctorsPage';

export const revalidate = 0;

export default async function Page() {
  const [doctors, totalDoctors] = await Promise.all([
    getDoctors(),
    getDoctorsStats(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <DoctorsPage doctors={doctors} totalDoctors={totalDoctors} />
    </Suspense>
  );
}
