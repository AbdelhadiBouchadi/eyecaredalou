import { PatientProfile } from '@/components/shared/Patients/PatientProfile';
import { getPatientById } from '@/lib/actions/patient';
import { PatientWithRelations } from '@/types';

export default async function PatientPage({
  params,
}: {
  params: { patientId: string };
}) {
  const patient = (await getPatientById(
    params.patientId
  )) as PatientWithRelations;

  if (!patient) {
    return <div>Patient not found</div>;
  }

  return <PatientProfile patient={patient} />;
}
