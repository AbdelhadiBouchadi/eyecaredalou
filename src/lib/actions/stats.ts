'use server';

import { db } from '@/db';

export async function getDashboardStats() {
  try {
    const [totalPatients, totalAppointments] = await Promise.all([
      // Get total patients
      db.patient.count(),
      // Get total appointments for today
      db.appointment.count({
        where: {
          date: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(23, 59, 59, 999)),
          },
        },
      }),
    ]);

    // Get monthly patient counts for the last 12 months
    const patientStats = await Promise.all(
      Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return db.patient.count({
          where: {
            createdAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });
      })
    );

    // Get monthly appointment counts for the last 12 months
    const appointmentStats = await Promise.all(
      Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return db.appointment.count({
          where: {
            date: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });
      })
    );

    // Calculate percentage changes
    const calculatePercentChange = (
      currentValue: number,
      previousValue: number
    ) => {
      if (previousValue === 0) return 0;
      return Number(
        (((currentValue - previousValue) / previousValue) * 100).toFixed(2)
      );
    };

    const patientPercentChange = calculatePercentChange(
      patientStats[0], // Current month
      patientStats[1] // Previous month
    );

    const appointmentPercentChange = calculatePercentChange(
      appointmentStats[0], // Current month
      appointmentStats[1] // Previous month
    );

    return {
      totalPatients,
      totalAppointments,
      patientStats: patientStats.reverse(),
      appointmentStats: appointmentStats.reverse(),
      patientPercentChange,
      appointmentPercentChange,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
}
