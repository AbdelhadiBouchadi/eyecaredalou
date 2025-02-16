'use server';

import { revalidatePath } from 'next/cache';
import { AppointmentStatus } from '@prisma/client';
import { db } from '@/db';
import {
  AppointmentFormValues,
  UpdateAppointmentFormValues,
} from '../validator';
import { auth } from '@/auth';

export async function createAppointment(data: AppointmentFormValues) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const appointment = await db.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status as AppointmentStatus,
        consultationType: data.consultationType,
        specializedConsultation: data.specializedConsultation,
        surgeryType: data.surgeryType,
        professor: data.professor,
        description: data.description || '',
        createdById: session.user.id,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    // Update patient's total appointments
    await db.patient.update({
      where: { id: data.patientId },
      data: {
        totalAppointments: {
          increment: 1,
        },
      },
    });

    revalidatePath('/appointments');
    return { success: true, appointment };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updateAppointment(
  id: string,
  data: UpdateAppointmentFormValues
) {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error('Unauthorized');
    }

    const appointment = await db.appointment.update({
      where: { id },
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status as AppointmentStatus,
        consultationType: data.consultationType,
        specializedConsultation: data.specializedConsultation,
        surgeryType: data.surgeryType,
        professor: data.professor,
        description: data.description,
        createdById: session.user.id,
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    revalidatePath('/appointments');
    return { success: true, appointment };
  } catch (error) {
    console.error('Error updating appointment:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getAppointments() {
  try {
    const appointments = await db.appointment.findMany({
      orderBy: {
        date: 'desc',
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    return appointments;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
}

export async function getAppointmentById(id: string) {
  try {
    const appointment = await db.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
      },
    });

    return appointment;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw error;
  }
}

export async function getAppointmentsByPatientId(patientId: string) {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        patientId,
      },
      orderBy: {
        date: 'desc',
      },
      include: {
        patient: true,
        doctor: true,
      },
    });

    return appointments;
  } catch (error) {
    console.error('Error fetching appointments by patient ID:', error);
    throw error;
  }
}

export async function deleteAppointment(id: string) {
  try {
    const appointment = await db.appointment.delete({
      where: { id },
    });

    revalidatePath('/appointments');
    return { success: true, appointment };
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return { success: false, error: (error as Error).message };
  }
}
