import { BaseItem } from './common';

export interface MedicalRecord {
  id: number;
  date: string;
  amount: number;
  data: {
    id: number;
    title: string;
    value: string;
  }[];
  attachments: string[];
  vitalSigns: string[];
}

export interface Medicine extends BaseItem {
  name: string;
  measure: string;
  stock: number;
  price: number;
  status: string;
  instraction: string;
}

export interface Service extends BaseItem {
  name: string;
  price: number;
  date: string;
  status: boolean;
}

// For the services list where some fields might be optional
export interface ServiceListItem extends BaseItem {
  name: string;
  price?: number;
  date?: string;
  status?: boolean;
}
