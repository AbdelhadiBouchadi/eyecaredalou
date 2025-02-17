import { Suspense } from 'react';
import { getAppointments } from '@/lib/actions/appointment';
import AppointmentsPage from '@/components/shared/Appointments/AppointmentsPage';
import Loading from './loading';

export const revalidate = 0;

export default async function Page() {
  const appointments = await getAppointments();

  return (
    <Suspense fallback={<Loading />}>
      <AppointmentsPage appointments={appointments} />
    </Suspense>
  );
}
