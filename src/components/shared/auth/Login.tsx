'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginFormSchema } from '@/lib/validator'; // Assuming you have a schema for sign-in validation
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
import { loginWithCreds } from '@/lib/actions/auth';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { BiLogInCircle } from 'react-icons/bi';
import Link from 'next/link';

const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginFormSchema), // Use the sign-in schema for validation
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: { email: string; password: string }) {
    try {
      // Prepare form data to send to the server
      setIsLoading(true);

      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);

      // Call the loginWithCreds function to handle authentication
      await loginWithCreds(formData);

      // Redirect the user to the dashboard after successful login
      toast.success('Connexion réussie');
      router.push('/'); // Or wherever you want to redirect the user after successful login

      setIsLoading(false);
    } catch (error) {
      // Handle login errors (e.g., invalid credentials)
      toast.error("L'un des identifiants est incorrect");
      setIsLoading(false);
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
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Adresse Email"
                    className="shad-input "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Mot de passe"
                    className="shad-input "
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <SubmitButton className="login-btn" isLoading={isLoading}>
          <p>Se Connecter</p>
          <BiLogInCircle className="text-white text-2xl" />
        </SubmitButton>

        <div className="flex justify-center items-center gap-2 my-2">
          <p className="text-sm text-gray-600">Pas encore inscrit ?</p>
          <Link href="/sign-up" className="text-subMain hover:underline">
            Créez votre compte
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
