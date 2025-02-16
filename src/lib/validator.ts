import {
  AppointmentStatus,
  BloodGroup,
  Gender,
  UserRole,
} from '@prisma/client';
import * as z from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({ message: 'Adresse Email Invalide' }),
  password: z.string().min(6, {
    message: 'Le mot de passe doit comporter au moins 6 caractères',
  }),
});

export const signupFormSchema = z
  .object({
    name: z.string().min(1, { message: 'Le nom est requis' }),
    email: z.string().email({ message: 'Adresse email invalide' }),
    password: z.string().min(6, {
      message: 'Le mot de passe doit comporter au moins 6 caractères',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Confirmer le mot de passe doit comporter au moins 6 caractères',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const updateUserProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .optional(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>;

export const createPatientFormSchema = z.object({
  fullName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
  age: z.number().min(0, "L'âge doit être supérieur à 0"),
  gender: z.nativeEnum(Gender, {
    required_error: 'Veuillez choisir un genre',
  }),
  bloodGroup: z.nativeEnum(BloodGroup, {
    required_error: 'Veuillez choisir un groupe sanguin',
  }),
  allergies: z.string().optional(),
  habits: z.string().optional(),
  medicalHistory: z.string().optional(),
  profileImage: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof createPatientFormSchema>;

export const updatePatientFormSchema = z.object({
  fullName: z.string().min(1, 'Le nom complet est requis'),
  age: z.number().min(0, "L'âge doit être supérieur à 0"),
  gender: z.nativeEnum(Gender, {
    required_error: 'Veuillez choisir un genre',
  }),
  bloodGroup: z.nativeEnum(BloodGroup, {
    required_error: 'Veuillez choisir un groupe sanguin',
  }),
  allergies: z.string().optional(),
  habits: z.string().optional(),
  medicalHistory: z.string().optional(),
  profileImage: z.string().optional(),
});

export type UpdatePatientFormValues = z.infer<typeof updatePatientFormSchema>;

export const updatePersonalInfoSchema = z.object({
  fullName: z.string().min(1, 'Le nom complet est requis'),
  age: z.number().min(0, "L'âge doit être supérieur à 0"),
  gender: z.nativeEnum(Gender, {
    required_error: 'Veuillez choisir un genre',
  }),
  profileImage: z.string().optional(),
});

export type UpdatePersonalInfoValues = z.infer<typeof updatePersonalInfoSchema>;

export const updateHealthInfoSchema = z.object({
  bloodGroup: z.nativeEnum(BloodGroup, {
    required_error: 'Veuillez choisir un groupe sanguin',
  }),
  allergies: z.string().optional(),
  habits: z.string().optional(),
  medicalHistory: z.string().optional(),
});

export type UpdateHealthInfoValues = z.infer<typeof updateHealthInfoSchema>;

export const updateEyeImagesSchema = z.object({
  images: z.array(
    z.object({
      imageUrl: z.string(),
      type: z.string(),
      description: z.string().optional(),
    })
  ),
});

export type UpdateEyeImagesValues = z.infer<typeof updateEyeImagesSchema>;

export const createMedicalRecordSchema = z.object({
  complaint: z.string().min(1, 'La plainte est requise'),
  diagnosis: z.string().min(1, 'Le diagnostic est requis'),
  treatment: z.string().min(1, 'Le traitement est requis'),
  prescription: z.string().optional(),
  notes: z.string().optional(),
  date: z.date().default(() => new Date()),
});

export type MedicalRecordFormValues = z.infer<typeof createMedicalRecordSchema>;

export const createAppointmentSchema = z
  .object({
    patientId: z.string().min(1, 'Le patient est requis'),
    doctorId: z.string().min(1, 'Le docteur est requis'),
    date: z.date({
      required_error: 'La date est requise',
    }),
    startTime: z.date({
      required_error: "L'heure de début est requise",
    }),
    endTime: z.date({
      required_error: "L'heure de fin est requise",
    }),
    status: z.nativeEnum(AppointmentStatus, {
      required_error: 'Le status est requis',
    }),
    consultationType: z.enum(['SPECIALIZED', 'SURGERY'] as const, {
      required_error: 'Le type de consultation est requis',
    }),
    specializedConsultation: z
      .enum(['GLAUCOMA', 'SURFACE', 'PEDIATRIC', 'RETINA_UVEITIS'] as const)
      .optional(),
    surgeryType: z
      .enum([
        'CATARACT',
        'RETINA',
        'ANNEXES',
        'STRABISMUS',
        'CONGENITAL_CATARACT',
      ] as const)
      .optional(),
    professor: z
      .enum(['PR_MOUSTAINE', 'PR_BOUSLOUS', 'BOTH'] as const)
      .optional(),
    description: z.string().optional(),
    createdById: z.string().optional(), // Add this field
  })
  .refine(
    (data) => {
      return data.startTime < data.endTime;
    },
    {
      message: "L'heure de fin doit être après l'heure de début",
      path: ['endTime'],
    }
  )
  .refine(
    (data) => {
      if (data.consultationType === 'SPECIALIZED') {
        return !!data.specializedConsultation;
      }
      return true;
    },
    {
      message: 'Le type de consultation spécialisée est requis',
      path: ['specializedConsultation'],
    }
  )
  .refine(
    (data) => {
      if (data.consultationType === 'SURGERY') {
        return !!data.surgeryType && !!data.professor;
      }
      return true;
    },
    {
      message: 'Le type de chirurgie et le professeur sont requis',
      path: ['surgeryType', 'professor'],
    }
  );

export type AppointmentFormValues = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentSchema = createAppointmentSchema;
export type UpdateAppointmentFormValues = z.infer<
  typeof updateAppointmentSchema
>;
