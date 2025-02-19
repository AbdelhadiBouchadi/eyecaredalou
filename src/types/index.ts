export * from './common';
export * from './medical';
export * from './menu';
import {
  Appointment,
  ConsultationType,
  EyeImage,
  MedicalRecord,
  Patient,
  Professor,
  SpecializedConsultation,
  SurgeryType,
  User,
} from '@prisma/client';

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

export type AppointmentWithRelations = Appointment & {
  patient: Patient;
  doctor: User;
  createdBy: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
};

export type AppointmentFormData = {
  patientId: string;
  doctorId: string;
  date: Date;
  consultationType: ConsultationType;
  specializedConsultation?: SpecializedConsultation;
  surgeryType?: SurgeryType;
  professor?: Professor;
  description?: string;
};
