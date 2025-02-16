import { Suspense } from 'react';
import { getPatients, getPatientStats } from '@/lib/actions/patient';
import Loading from './loading';
import PatientsPage from '@/components/shared/Patients/PatientsPage';

export const revalidate = 0;

export default async function Page() {
  const [patients, stats] = await Promise.all([
    getPatients(),
    getPatientStats(),
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <PatientsPage patients={patients} stats={stats} />
    </Suspense>
  );
}
