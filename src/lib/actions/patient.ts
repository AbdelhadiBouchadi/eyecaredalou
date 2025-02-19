'use server';

import { revalidatePath } from 'next/cache';
import { Gender, BloodGroup } from '@prisma/client';
import { db } from '@/db';
import {
  MedicalRecordFormValues,
  PatientFormValues,
  UpdateEyeImagesValues,
} from '../validator';
import { auth } from '@/auth';

export async function createPatient(data: PatientFormValues) {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('Session not found');
    }

    if (!session.user) {
      throw new Error('User not found in session');
    }

    const userId = session.user.id;
    if (!userId) {
      throw new Error('User ID not found in session');
    }

    const patient = await db.patient.create({
      data: {
        fullName: data.fullName,
        age: data.age,
        gender: data.gender as Gender,
        bloodGroup: data.bloodGroup as BloodGroup,
        allergies: data.allergies || '',
        habits: data.habits || '',
        medicalHistory: data.medicalHistory || '',
        profileImage: data.profileImage,
        observationImage: data.observationImage,
        createdById: userId,
      },
      include: {
        createdBy: true,
      },
    });

    revalidatePath('/patients');
    return { success: true, patient };
  } catch (error) {
    console.error('Error creating patient:', error);
    // Add more detailed error information
    const errorMessage =
      error instanceof Error
        ? `${error.message}\nStack: ${error.stack}`
        : 'An unknown error occurred';
    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function updatePatient({
  id,
  data,
}: {
  id: string;
  data: Partial<PatientFormValues>;
}) {
  try {
    const patient = await db.patient.update({
      where: { id },
      data: {
        ...data,
        gender: data.gender as Gender,
        bloodGroup: data.bloodGroup as BloodGroup,
      },
    });

    revalidatePath('/patients');
    revalidatePath(`/patients/${id}`);
    return { success: true, patient };
  } catch (error) {
    console.error('Error updating patient:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deletePatient(id: string) {
  try {
    await db.patient.delete({
      where: { id },
    });

    revalidatePath('/patients');
    return { success: true };
  } catch (error) {
    console.error('Error deleting patient:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function getPatients() {
  try {
    const patients = await db.patient.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        appointments: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return patients;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
}

export async function getPatientStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  try {
    const [dailyPatients, monthlyPatients, yearlyPatients] = await Promise.all([
      db.patient.count({
        where: {
          createdAt: {
            gte: today,
          },
        },
      }),
      db.patient.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth,
          },
        },
      }),
      db.patient.count({
        where: {
          createdAt: {
            gte: firstDayOfYear,
          },
        },
      }),
    ]);

    return {
      daily: dailyPatients,
      monthly: monthlyPatients,
      yearly: yearlyPatients,
    };
  } catch (error) {
    console.error('Error fetching patient stats:', error);
    throw error;
  }
}

export async function getPatientById(id: string) {
  try {
    const patient = await db.patient.findUnique({
      where: { id },
      include: {
        appointments: true,
        medicalRecords: true,
        eyeImages: true,
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return patient;
  } catch (error) {
    console.error('Error fetching patient:', error);
    throw error;
  }
}

export async function updatePatientInfo(
  id: string,
  data: Partial<PatientFormValues>
) {
  try {
    const patient = await db.patient.update({
      where: { id },
      data: {
        ...data,
        gender: data.gender as Gender,
        bloodGroup: data.bloodGroup as BloodGroup,
        profileImage: data.profileImage,
      },
    });

    revalidatePath(`/patients/${id}`);
    return { success: true, patient };
  } catch (error) {
    console.error('Error updating patient:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createMedicalRecord(
  patientId: string,
  data: MedicalRecordFormValues
) {
  try {
    const record = await db.medicalRecord.create({
      data: {
        ...data,
        patientId,
      },
    });

    revalidatePath(`/patients/${patientId}`);
    return { success: true, record };
  } catch (error) {
    console.error('Error creating medical record:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteMedicalRecord(patientId: string, recordId: string) {
  try {
    await db.medicalRecord.delete({
      where: { id: recordId },
    });

    revalidatePath(`/patients/${patientId}`);
    return { success: true };
  } catch (error) {
    console.error('Error deleting medical record:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function createPatientEyeImages(
  patientId: string,
  data: UpdateEyeImagesValues
) {
  try {
    // Create all images in a single transaction
    await db.eyeImage.createMany({
      data: data.images.map((image) => ({
        patientId,
        imageUrl: image.imageUrl,
        type: image.type,
        description: image.description || '',
      })),
    });

    revalidatePath(`/patients/${patientId}`);
    return { success: true };
  } catch (error) {
    console.error('Error creating eye images:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function updatePatientEyeImages(
  patientId: string,
  data: UpdateEyeImagesValues
) {
  try {
    // Get existing images
    const existingImages = await db.eyeImage.findMany({
      where: { patientId },
    });

    // Create new images
    const newImages = data.images.filter(
      (image) =>
        !existingImages.some((existing) => existing.imageUrl === image.imageUrl)
    );

    if (newImages.length > 0) {
      // Create each image individually to ensure all fields are properly set
      await Promise.all(
        newImages.map((image) =>
          db.eyeImage.create({
            data: {
              patientId,
              imageUrl: image.imageUrl,
              type: image.type,
              description: image.description || '', // Ensure description is never undefined
            },
          })
        )
      );
    }

    // Update existing images
    for (const image of data.images) {
      const existingImage = existingImages.find(
        (existing) => existing.imageUrl === image.imageUrl
      );

      if (existingImage) {
        await db.eyeImage.update({
          where: { id: existingImage.id },
          data: {
            type: image.type,
            description: image.description || '', // Ensure description is never undefined
          },
        });
      }
    }

    // Delete images that are no longer present
    const imagesToDelete = existingImages.filter(
      (existing) =>
        !data.images.some((image) => image.imageUrl === existing.imageUrl)
    );

    if (imagesToDelete.length > 0) {
      await db.eyeImage.deleteMany({
        where: {
          id: {
            in: imagesToDelete.map((image) => image.id),
          },
        },
      });
    }

    revalidatePath(`/patients/${patientId}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating eye images:', error);
    return { success: false, error: (error as Error).message };
  }
}

export async function deleteEyeImage(imageId: string) {
  try {
    const image = await db.eyeImage.delete({
      where: { id: imageId },
    });

    revalidatePath(`/patients/${image.patientId}`);
    return { success: true, image };
  } catch (error) {
    console.error('Error deleting eye image:', error);
    return { success: false, error: (error as Error).message };
  }
}
