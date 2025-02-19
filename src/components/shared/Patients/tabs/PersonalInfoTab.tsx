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
import { Search } from 'lucide-react';
import SubmitButton from '../../auth/SubmitButton';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import { ImageModal } from '../../Modals/ImageModal';

interface PersonalInfoTabProps {
  patient: Patient;
}

export function PersonalInfoTab({ patient }: PersonalInfoTabProps) {
  const router = useRouter();
  const [profileFiles, setProfileFiles] = useState<File[]>([]);
  const [observationFiles, setObservationFiles] = useState<File[]>([]);
  const [previewProfileUrl, setPreviewProfileUrl] = useState<
    string | undefined
  >(patient.profileImage ?? undefined);
  const [previewObservationUrl, setPreviewObservationUrl] = useState<
    string | undefined
  >(patient.observationImage ?? undefined);
  const [uploadedProfileUrl, setUploadedProfileUrl] = useState<
    string | undefined
  >(patient.profileImage ?? undefined);
  const [uploadedObservationUrl, setUploadedObservationUrl] = useState<
    string | undefined
  >(patient.observationImage ?? undefined);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const form = useForm<UpdatePersonalInfoValues>({
    resolver: zodResolver(updatePersonalInfoSchema),
    defaultValues: {
      fullName: patient.fullName,
      age: patient.age,
      gender: patient.gender,
      profileImage: patient.profileImage ?? undefined,
      observationImage: patient.observationImage ?? undefined,
    },
  });

  const { startUpload } = useUploadThing('imageUploader');

  useEffect(() => {
    form.setValue('profileImage', uploadedProfileUrl);
    form.setValue('observationImage', uploadedObservationUrl);
  }, [uploadedProfileUrl, uploadedObservationUrl, form]);

  async function onSubmit(values: UpdatePersonalInfoValues) {
    try {
      let finalProfileUrl = uploadedProfileUrl;
      let finalObservationUrl = uploadedObservationUrl;

      if (profileFiles.length > 0) {
        const uploadedImages = await startUpload(profileFiles);
        if (!uploadedImages) {
          toast.error("Erreur lors du téléchargement de l'image de profil");
          return;
        }
        finalProfileUrl = uploadedImages[0].url;
        setUploadedProfileUrl(finalProfileUrl);
      }

      if (observationFiles.length > 0) {
        const uploadedImages = await startUpload(observationFiles);
        if (!uploadedImages) {
          toast.error("Erreur lors du téléchargement de l'image d'observation");
          return;
        }
        finalObservationUrl = uploadedImages[0].url;
        setUploadedObservationUrl(finalObservationUrl);
      }

      const result = await updatePatientInfo(patient.id, {
        ...values,
        profileImage: finalProfileUrl,
        observationImage: finalObservationUrl,
      });

      if (result.success) {
        toast.success('Les informations du patient ont été mises à jour');
        router.refresh();
        setProfileFiles([]);
        setObservationFiles([]);
      } else {
        toast.error('Une erreur est survenue');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
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

  const removeProfileImage = () => {
    setPreviewProfileUrl(undefined);
    setUploadedProfileUrl(undefined);
    form.setValue('profileImage', undefined);
    setProfileFiles([]);
  };

  const removeObservationImage = () => {
    setPreviewObservationUrl(undefined);
    setUploadedObservationUrl(undefined);
    form.setValue('observationImage', undefined);
    setObservationFiles([]);
  };

  return (
    <>
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
              <FormItem>
                <FormLabel>Image d'observation</FormLabel>
                <div className="space-y-4">
                  <FormControl>
                    <FileUploader
                      onFieldChange={handleObservationFileChange}
                      imageUrls={
                        previewObservationUrl ? [previewObservationUrl] : []
                      }
                      setFiles={setObservationFiles}
                    />
                  </FormControl>
                  {previewObservationUrl && (
                    <div
                      className="relative group cursor-pointer"
                      onClick={() => setIsImageModalOpen(true)}
                    >
                      <img
                        src={previewObservationUrl}
                        alt="Observation"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                        <Search className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}
                </div>
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

      <ImageModal
        imageUrl={previewObservationUrl || ''}
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
      />
    </>
  );
}
