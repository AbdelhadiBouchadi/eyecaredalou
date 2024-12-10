'use server';

import { signIn, signOut } from '@/auth';
import { db } from '@/db';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { comparePasswords, saltAndHashPassword } from '../utils';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: '/' });
  revalidatePath('/');
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
  revalidatePath('/');
};

export const loginWithCreds = async (formData: FormData): Promise<void> => {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password') as string,
    role: 'VISITOR',
    redirectTo: '/',
  };

  const existingUser = await getUserByEmail(formData.get('email') as string);

  if (!existingUser) {
    throw new Error("L'utilisateur n'existe pas");
  }

  // Check if hashedPassword is null
  if (!existingUser.hashedPassword) {
    throw new Error('No password found for the user.');
  }

  // Compare password with the stored hashed password (assuming you're using bcrypt or another hashing mechanism)
  const isPasswordCorrect = await comparePasswords(
    rawFormData.password,
    existingUser.hashedPassword
  );

  if (!isPasswordCorrect) {
    throw new Error('Incorrect password.');
  }

  try {
    await signIn('credentials', rawFormData);
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          console.error('Invalid credentials!');
          break;
        default:
          console.error('Something went wrong!');
      }
    } else {
      throw error;
    }
  }

  revalidatePath('/');
};

export const registerUser = async (formData: FormData): Promise<void> => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  const hashedPassword = saltAndHashPassword(password);

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('User already exists.');
  }

  // Create new user
  await db.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });
};
