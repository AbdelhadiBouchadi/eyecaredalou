import { Service } from './medical';

export interface ShareData {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
}

export interface AppointmentData {
  id: number;
  start: Date;
  end: Date;
  color: string;
  title: string;
  message: string;
  service: Service;
  shareData: ShareData;
}

export type ViewType = 'month' | 'week' | 'day';
