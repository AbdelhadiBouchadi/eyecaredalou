'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Patient } from '@prisma/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updatePatientInfo } from '@/lib/actions/patient';
import {
  updatePersonalInfoSchema,
  UpdatePersonalInfoValues,
} from '@/lib/validator';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FileUploader } from '../../ImageUploader';
import SelectGender from '../SelectGender';
import { DeletePatient } from '../DeletePatient';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import SubmitButton from '../../auth/SubmitButton';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import Image from 'next/image';

interface PersonalInfoTabProps {
  patient: Patient;
}

export function PersonalInfoTab({ patient }: PersonalInfoTabProps) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(
    patient.profileImage ?? undefined
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(
    patient.profileImage ?? undefined
  );

  const form = useForm<UpdatePersonalInfoValues>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      fullName: patient.fullName,
      age: patient.age,
      gender: patient.gender,
      profileImage: patient.profileImage ?? undefined,
    },
  });

  const { startUpload } = useUploadThing('imageUploader');

  useEffect(() => {
    form.setValue('profileImage', uploadedImageUrl);
  }, [uploadedImageUrl, form]);

  async function onSubmit(values: UpdatePersonalInfoValues) {
    try {
      let finalImageUrl = uploadedImageUrl;

      if (files.length > 0) {
        const uploadedImages = await startUpload(files);
        if (!uploadedImages) {
          toast.error("Erreur lors du téléchargement de l'image");
          return;
        }

        finalImageUrl = uploadedImages[0].url;
        setUploadedImageUrl(finalImageUrl);
      }

      const result = await updatePatientInfo(patient.id, {
        ...values,
        profileImage: finalImageUrl,
      });

      if (result.success) {
        toast.success('Les informations du patient ont été mises à jour');
        router.refresh();
        setFiles([]);
      } else {
        toast.error('Une erreur est survenue');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  }

  const handleFileChange = (urls: string[]) => {
    if (urls.length > 0) {
      setPreviewImageUrl(urls[0]);
      form.setValue('profileImage', urls[0]);
    } else {
      setPreviewImageUrl(undefined);
      form.setValue('profileImage', undefined);
    }
  };

  const removeImage = () => {
    setPreviewImageUrl(undefined);
    setUploadedImageUrl(undefined);
    form.setValue('profileImage', undefined);
    setFiles([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image de profile</FormLabel>
              <FormControl>
                <FileUploader
                  onFieldChange={handleFileChange}
                  imageUrls={previewImageUrl ? [previewImageUrl] : []}
                  setFiles={setFiles}
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
            <FormItem>
              <FormLabel>Nom Complet</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
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
            <FormItem>
              <FormLabel>Sexe</FormLabel>
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

        <div className="flex gap-4">
          <DeletePatient patientId={patient.id} className="w-full" />
          <SubmitButton isLoading={form.formState.isSubmitting}>
            Sauvegarder
            <HiOutlineCheckCircle className="text-xl" />
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
