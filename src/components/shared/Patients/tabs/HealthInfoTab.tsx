'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Patient } from '@prisma/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { updatePatientInfo } from '@/lib/actions/patient';
import {
  updateHealthInfoSchema,
  UpdateHealthInfoValues,
} from '@/lib/validator';
import { toast } from 'react-hot-toast';
import SelectBloodGroup from '../SelectBloodGroup';
import { HiOutlineCheckCircle } from 'react-icons/hi';

interface HealthInfoTabProps {
  patient: Patient;
}

export function HealthInfoTab({ patient }: HealthInfoTabProps) {
  const form = useForm<UpdateHealthInfoValues>({
    resolver: zodResolver(updateHealthInfoSchema),
    defaultValues: {
      bloodGroup: patient.bloodGroup,
      allergies: patient.allergies || '',
      habits: patient.habits || '',
      medicalHistory: patient.medicalHistory || '',
    },
  });

  async function onSubmit(values: UpdateHealthInfoValues) {
    try {
      const result = await updatePatientInfo(patient.id, values);

      if (result.success) {
        toast.success('Les informations de santé ont été mises à jour');
      } else {
        toast.error('Une erreure est survenue');
      }
    } catch (error) {
      toast.error('Une erreure est survenue');
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Groupe Sanguin</FormLabel>
              <FormControl>
                <SelectBloodGroup
                  value={field.value}
                  onChangeHandler={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Listez les allergies..."
                  className="shad-textArea"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="habits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Habitudes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tabagiste, alcoolique, etc..."
                  className="shad-textArea"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medicalHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Historique Médical</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Maladies chroniques, etc..."
                  className="shad-textArea"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="text-sm p-4 rounded-lg font-normal flex justify-center items-center gap-3 w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'En cours...' : 'Sauvegarder'}
          <HiOutlineCheckCircle className="text-xl" />
        </Button>
      </form>
    </Form>
  );
}
