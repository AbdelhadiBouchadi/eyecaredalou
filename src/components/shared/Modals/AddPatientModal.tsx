'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Gender, BloodGroup } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import Modal from './Modal';
import { FileUploader } from '../ImageUploader';
import SelectGender from '../Patients/SelectGender';
import SelectBloodGroup from '../Patients/SelectBloodGroup';
import { createPatient } from '@/lib/actions/patient';
import { createPatientFormSchema, PatientFormValues } from '@/lib/validator';
import { useUploadThing } from '@/lib/uploadthing';
import { useState } from 'react';
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
import { Button } from '@/components/ui/button';
import SubmitButton from '../auth/SubmitButton';

interface AddPatientModalProps {
  closeModal: () => void;
  isOpen: boolean;
  onPatientCreated?: (patientId: string) => void;
  initialName?: string;
}

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

const AddPatientModal: React.FC<AddPatientModalProps> = ({
  closeModal,
  isOpen,
  onPatientCreated,
  initialName = '',
}) => {
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
    defaultValues: {
      ...defaultValues,
      fullName: initialName,
    },
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

      if (result.success && result.patient) {
        toast.success('Le patient a été créé avec succès');
        onPatientCreated?.(result.patient.id);
        closeModal();
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
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title="Créer un patient"
      width="max-w-3xl"
    >
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

          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Button
              type="button"
              onClick={closeModal}
              variant={'destructive'}
              className="w-full"
            >
              Annuler
            </Button>
            <SubmitButton isLoading={form.formState.isSubmitting}>
              Créer le patient
              <HiOutlineCheckCircle className="text-xl" />
            </SubmitButton>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddPatientModal;
