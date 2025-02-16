import { AppointmentStatus } from '@prisma/client';
import { Doctor, Patient } from './patient';

export interface AppointmentData {
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

export type ConsultationType = 'SPECIALIZED' | 'SURGERY';

export type SpecializedConsultation =
  | 'GLAUCOMA'
  | 'SURFACE'
  | 'PEDIATRIC'
  | 'RETINA_UVEITIS';

export type SurgeryType =
  | 'CATARACT'
  | 'RETINA'
  | 'ANNEXES'
  | 'STRABISMUS'
  | 'CONGENITAL_CATARACT';

export type Professor = 'PR_MOUSTAINE' | 'PR_BOUSLOUS' | 'BOTH';

export const consultationTypes = [
  { value: 'SPECIALIZED', label: 'Consultations Spécialisées' },
  { value: 'SURGERY', label: 'Chirurgie Programmée' },
] as const;

export const specializedConsultations = [
  { value: 'GLAUCOMA', label: 'Consultation Glaucome' },
  { value: 'SURFACE', label: 'Consultation de Surface' },
  { value: 'PEDIATRIC', label: 'Consultation Pédiatrique' },
  { value: 'RETINA_UVEITIS', label: 'Consultation Rétine / Uvéite' },
] as const;

export const surgeryTypes = [
  { value: 'CATARACT', label: 'Chirurgie de Cataracte' },
  { value: 'RETINA', label: 'Chirurgie de Rétine' },
  { value: 'ANNEXES', label: 'Chirurgie des Annexes' },
  { value: 'STRABISMUS', label: 'Chirurgie de Strabisme' },
  { value: 'CONGENITAL_CATARACT', label: 'Chirurgie de Cataracte Congénitale' },
] as const;

export const professors = [
  { value: 'PR_MOUSTAINE', label: 'Pr Moustaine' },
  { value: 'PR_BOUSLOUS', label: 'Pr Bouslous' },
  { value: 'BOTH', label: 'Pr Moustaine / Pr Bouslous' },
] as const;

export type ViewType = 'month' | 'week' | 'day';

export type NavigateActionType = 'PREV' | 'NEXT' | 'TODAY' | 'DATE';
