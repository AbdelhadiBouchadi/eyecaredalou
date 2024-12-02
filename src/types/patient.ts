export interface Patient {
  id: string;
  title: string;
  image: string;
  admin: boolean;
  email: string;
  phone: string;
  age: number;
  gender: string;
  blood: string;
  totalAppointments: number;
  date: string;
}

export interface Doctor {
  id: number;
  user: Patient;
  title: string;
}

export interface Appointment {
  id: number;
  time: string;
  user: Patient;
  from: string;
  to: string;
  hours: number;
  status: string;
  doctor: Patient;
  date: string;
}
