'use server';

import { db } from '@/db';

export async function getDashboardStats() {
  try {
    // Get total patients and appointments
    const [totalPatients, totalAppointments] = await Promise.all([
      db.patient.count(),
      db.appointment.count(),
    ]);

    // Get current month for reference
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Initialize arrays for monthly stats
    const patientStats = new Array(12).fill(0);
    const appointmentStats = new Array(12).fill(0);

    // Get all patients and appointments for the last 12 months
    const startDate = new Date(currentYear, currentMonth - 11, 1); // 12 months ago
    const endDate = new Date(currentYear, currentMonth + 1, 0); // End of current month

    const [patients, appointments] = await Promise.all([
      db.patient.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          createdAt: true,
        },
      }),
      db.appointment.findMany({
        where: {
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          date: true,
        },
      }),
    ]);

    // Process patients
    patients.forEach((patient) => {
      const month = patient.createdAt.getMonth();
      const year = patient.createdAt.getFullYear();
      const index = (month - currentMonth + 12) % 12;
      patientStats[index]++;
    });

    // Process appointments
    appointments.forEach((appointment) => {
      const month = appointment.date.getMonth();
      const year = appointment.date.getFullYear();
      const index = (month - currentMonth + 12) % 12;
      appointmentStats[index]++;
    });

    // Calculate percentage changes
    const calculatePercentChange = (
      currentValue: number,
      previousValue: number
    ) => {
      if (previousValue === 0) return currentValue > 0 ? 100 : 0;
      return Number(
        (((currentValue - previousValue) / previousValue) * 100).toFixed(2)
      );
    };

    // Get current and previous month indices
    const currentMonthIndex = 11; // Last index in our array
    const prevMonthIndex = 10; // Second to last index

    const patientPercentChange = calculatePercentChange(
      patientStats[currentMonthIndex],
      patientStats[prevMonthIndex]
    );

    const appointmentPercentChange = calculatePercentChange(
      appointmentStats[currentMonthIndex],
      appointmentStats[prevMonthIndex]
    );

    return {
      totalPatients,
      totalAppointments,
      patientStats,
      appointmentStats,
      patientPercentChange,
      appointmentPercentChange,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}
