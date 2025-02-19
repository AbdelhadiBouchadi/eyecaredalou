'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { Gender, BloodGroup } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileUploader } from '../ImageUploader';
import SelectGender from './SelectGender';
import SelectBloodGroup from './SelectBloodGroup';
import { createPatient } from '@/lib/actions/patient';
import { createPatientFormSchema, PatientFormValues } from '@/lib/validator';
import toast from 'react-hot-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { useState } from 'react';
import SubmitButton from '../auth/SubmitButton';

const defaultValues: Partial<PatientFormValues> = {
  fullName: '',
  age: 0,
  gender: Gender.MALE,
  bloodGroup: BloodGroup.A_POSITIVE,
  allergies: '',
  habits: '',
  medicalHistory: '',
  profileImage: '',
  observationImage: '',
};

export default function CreatePatient() {
  const router = useRouter();
  const [profileFiles, setProfileFiles] = useState<File[]>([]);
  const [observationFiles, setObservationFiles] = useState<File[]>([]);
  const [previewProfileUrl, setPreviewProfileUrl] = useState<
    string | undefined
  >();
  const [previewObservationUrl, setPreviewObservationUrl] = useState<
    string | undefined
  >();

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(createPatientFormSchema),
    defaultValues,
  });

  const { startUpload } = useUploadThing('imageUploader');

  async function onSubmit(values: PatientFormValues) {
    try {
      let profileImageUrl = values.profileImage;
      let observationImageUrl = values.observationImage;

      if (profileFiles.length > 0) {
        const uploadedImages = await startUpload(profileFiles);
        if (uploadedImages && uploadedImages[0]?.url) {
          profileImageUrl = uploadedImages[0].url;
        }
      }

      if (observationFiles.length > 0) {
        const uploadedImages = await startUpload(observationFiles);
        if (uploadedImages && uploadedImages[0]?.url) {
          observationImageUrl = uploadedImages[0].url;
        }
      }

      const result = await createPatient({
        ...values,
        profileImage: profileImageUrl,
        observationImage: observationImageUrl,
      });

      if (result.success) {
        toast.success('Le patient a été créé avec succès');
        router.push('/patients');
        router.refresh();
      } else {
        toast.error('Une erreure est survenue lors de la création du patient');
      }
    } catch (error) {
      toast.error('Une erreure est survenue lors de la création du patient');
      console.error(error);
    }
  }

  const handleProfileFileChange = (urls: string[]) => {
    if (urls.length > 0) {
      setPreviewProfileUrl(urls[0]);
      form.setValue('profileImage', urls[0]);
    } else {
      setPreviewProfileUrl(undefined);
      form.setValue('profileImage', undefined);
    }
  };

  const handleObservationFileChange = (urls: string[]) => {
    if (urls.length > 0) {
      setPreviewObservationUrl(urls[0]);
      form.setValue('observationImage', urls[0]);
    } else {
      setPreviewObservationUrl(undefined);
      form.setValue('observationImage', undefined);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/patients"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline className="text-xl" />
        </Link>
        <h1 className="text-xl font-semibold">Créer un patient</h1>
      </div>

      <div className="bg-white my-8 rounded-xl border-[1px] border-border p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-colo gap-4"
          >
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem className="flex gap-3 flex-col w-full">
                  <FormLabel>Image de profile</FormLabel>
                  <FormControl>
                    <FileUploader
                      onFieldChange={handleProfileFileChange}
                      imageUrls={previewProfileUrl ? [previewProfileUrl] : []}
                      setFiles={setProfileFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observationImage"
              render={({ field }) => (
                <FormItem className="flex gap-3 flex-col w-full">
                  <FormLabel>Image d'observation</FormLabel>
                  <FormControl>
                    <FileUploader
                      onFieldChange={handleObservationFileChange}
                      imageUrls={
                        previewObservationUrl ? [previewObservationUrl] : []
                      }
                      setFiles={setObservationFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Nom du patient</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom du patient" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Age du patient</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Age du patient"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Sexe du patient</FormLabel>
                  <FormControl>
                    <SelectGender
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
              name="bloodGroup"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Groupe sanguin</FormLabel>
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
                <FormItem className="w-full">
                  <FormLabel>Allérgies</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Toutes les allergies"
                      className="resize-none"
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
                <FormItem className="w-full">
                  <FormLabel>Habitudes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Toutes les habitudes ( tabagique, alcoolique ...)"
                      className="resize-none"
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
                <FormItem className="w-full">
                  <FormLabel>Antécédents médicaux</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="diabètique, hypertension, asthme ..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton isLoading={form.formState.isSubmitting}>
              Créer le patient
              <HiOutlineCheckCircle className="text-xl" />
            </SubmitButton>
          </form>
        </Form>
      </div>
    </>
  );
}
