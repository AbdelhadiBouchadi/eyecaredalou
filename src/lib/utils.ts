import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function saltAndHashPassword(password: any) {
  const saltRounds = 10; // Adjust the cost factor according to your security requirements
  const salt = bcrypt.genSaltSync(saltRounds); // Synchronously generate a salt
  const hash = bcrypt.hashSync(password, salt); // Synchronously hash the password
  return hash; // Return the hash directly as a string
}

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword); // Example for bcrypt
};

export const formatBloodGroup = (bloodGroup: string) => {
  const mapping: { [key: string]: string } = {
    A_POSITIVE: 'A+',
    A_NEGATIVE: 'A-',
    B_POSITIVE: 'B+',
    B_NEGATIVE: 'B-',
    O_POSITIVE: 'O+',
    O_NEGATIVE: 'O-',
    AB_POSITIVE: 'AB+',
    AB_NEGATIVE: 'AB-',
  };
  return mapping[bloodGroup] || bloodGroup;
};

export const formatUserRole = (role: string) => {
  const mapping: { [key: string]: string } = {
    ADMIN: 'Admin',
    DOCTOR: 'Docteur',
    RECEPTIONIST: 'Réceptionniste',
    VISITOR: 'Visiteur',
  };
  return mapping[role] || role;
};

export const formatConsultationType = (type: string) => {
  const mapping: { [key: string]: string } = {
    SPECIALIZED: 'Consultations Spécialisées',
    SURGERY: 'Chirurgie Programmée',
  };
  return mapping[type] || type;
};
