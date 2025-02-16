import { Gender, BloodGroup, AppointmentStatus } from '@prisma/client';

export interface Patient {
  id: string;
  fullName: string;
  profileImage?: string | null;
  age: number;
  gender: Gender;
  bloodGroup: BloodGroup;
  allergies: string;
  habits: string;
  medicalHistory: string;
  totalAppointments: number;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdBy?: {
    name: string | null;
    email: string | null;
  };
  medicalRecords?: MedicalRecord[];
  appointments?: Appointment[];
  eyeImages?: EyeImage[];
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: Date;
  complaint: string;
  diagnosis: string;
  treatment: string;
  prescription?: string | null;
  notes?: string | null;
  patient?: Patient;
}

export interface EyeImage {
  id: string;
  patientId: string;
  imageUrl: string;
  date: Date;
  description?: string | null;
  type: string;
  patient?: Patient;
}

export interface Doctor {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
  role: 'DOCTOR';
  specialization: string | null;
  appointments?: Appointment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  service: string;
  description?: string | null;
  patient?: Patient;
  doctor?: Doctor;
  createdAt: Date;
  updatedAt: Date;
}
