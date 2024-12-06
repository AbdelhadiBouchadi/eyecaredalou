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
