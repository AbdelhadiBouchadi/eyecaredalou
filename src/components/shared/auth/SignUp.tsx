'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupFormSchema } from '@/lib/validator';
import { Input } from '../../ui/input';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from '../../ui/form';
import SubmitButton from './SubmitButton';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { registerUser } from '@/lib/actions/auth';
import { BiUserPlus } from 'react-icons/bi';
import Link from 'next/link';

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: {
    email: string;
    password: string;
    name: string;
  }) {
    try {
      // Call the registerUser function from the server actions
      setIsLoading(true);

      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('name', data.name);

      await registerUser(formData); // Register user on the server

      // If signup is successful, log the user in (optional) or redirect
      toast.success('Votre compte a été créé avec succès');
      router.push('/sign-in'); // Redirect after successful signup

      setIsLoading(false);
    } catch (error) {
      // Handle errors (e.g., user already exists)
      toast.error(
        'Une erreure est survenue lors de la création de votre compte'
      );
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="md:w-2/5 p-8 rounded-2xl mx-auto bg-white flex flex-col items-center shadow-xl"
      >
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-48 h-16 object-contain mb-6"
        />
        <div className="flex flex-col gap-4 w-full mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Nom Complet"
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Adresse Email"
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Mot De Passe"
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <SubmitButton className="login-btn" isLoading={isLoading}>
          <p>Créer le compte</p>
          <BiUserPlus className="text-white text-2xl" />
        </SubmitButton>

        <div className="flex justify-center items-center gap-2 my-2">
          <p className="text-sm text-gray-600">Déja inscrit?</p>
          <Link href="/sign-in" className="text-subMain hover:underline">
            Connectez-vous
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
