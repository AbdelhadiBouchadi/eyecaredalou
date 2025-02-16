export * from './common';
export * from './medical';
export * from './menu';
import { Appointment, EyeImage, MedicalRecord, Patient } from '@prisma/client';

export type PatientWithRelations = Patient & {
  appointments?: Appointment[];
  medicalRecords?: MedicalRecord[];
  eyeImages?: EyeImage[];
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
};
