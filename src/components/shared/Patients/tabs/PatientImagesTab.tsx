'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Image as ImageIcon } from 'lucide-react';
import { EyeImage, Patient } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import { updateEyeImagesSchema, UpdateEyeImagesValues } from '@/lib/validator';
import {
  createPatientEyeImages,
  updatePatientEyeImages,
} from '@/lib/actions/patient';
import { EmptyState } from '../../EmptyState';
import { FileUploader } from '../../ImageUploader';
import SubmitButton from '../../auth/SubmitButton';

interface PatientImagesTabProps {
  patient: Patient;
  images?: EyeImage[];
}

const eyeTypes = [
  { value: 'LEFT_EYE', label: 'Œil Gauche' },
  { value: 'RIGHT_EYE', label: 'Œil Droit' },
  { value: 'BOTH_EYES', label: 'Les Deux Yeux' },
];

export function PatientImagesTab({
  patient,
  images = [],
}: PatientImagesTabProps) {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [previewMap, setPreviewMap] = useState<Map<string, number>>(new Map());
  const { startUpload } = useUploadThing('imageUploader');

  const form = useForm<UpdateEyeImagesValues>({
    resolver: zodResolver(updateEyeImagesSchema),
    defaultValues: {
      images: images.map((image) => ({
        imageUrl: image.imageUrl,
        type: image.type || 'LEFT_EYE',
        description: image.description || '',
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control: form.control,
  });

  const handleFileChange = (previewUrls: string[]) => {
    // Get current form values to check which URLs are already in the form
    const currentUrls = fields.map((field) => field.imageUrl);

    // Create a new map of preview URLs to their indices
    const newPreviewMap = new Map<string, number>();

    // Only add URLs that don't already exist in the form
    previewUrls.forEach((url, index) => {
      if (!currentUrls.includes(url)) {
        append({
          imageUrl: url,
          type: 'LEFT_EYE',
          description: '',
        });
        newPreviewMap.set(url, index);
      }
    });

    // Update the preview map
    setPreviewMap(newPreviewMap);
  };

  const isBlobUrl = (url: string) => url.startsWith('blob:');

  async function onSubmit(values: UpdateEyeImagesValues) {
    try {
      if (files.length > 0) {
        // Upload new files first
        const uploadedImages = await startUpload(files);
        if (!uploadedImages) {
          toast.error('Erreur lors du téléchargement des images');
          return;
        }

        // Get current form values
        const formValues = form.getValues().images;

        // Separate blob URLs and regular URLs
        const blobUrls = formValues.filter((value) =>
          isBlobUrl(value.imageUrl)
        );
        const regularUrls = formValues.filter(
          (value) => !isBlobUrl(value.imageUrl)
        );

        // Map uploaded images to blob URLs in order
        const finalImages = [
          ...regularUrls,
          ...blobUrls.map((blobValue, index) => ({
            imageUrl: uploadedImages[index]?.url || blobValue.imageUrl,
            type: blobValue.type,
            description: blobValue.description || '',
          })),
        ];

        // If this is the first upload for this patient
        if (images.length === 0) {
          const result = await createPatientEyeImages(patient.id, {
            images: finalImages,
          });

          if (result.success) {
            toast.success('Images ajoutées avec succès');
            router.push('/patients');
            setFiles([]);
            setPreviewMap(new Map());
          } else {
            toast.error("Erreur lors de l'ajout des images");
          }
        } else {
          // Update existing images
          const result = await updatePatientEyeImages(patient.id, {
            images: finalImages,
          });

          if (result.success) {
            toast.success('Images mises à jour avec succès');
            router.push('/patients');
            setFiles([]);
            setPreviewMap(new Map());
          } else {
            toast.error('Erreur lors de la mise à jour des images');
          }
        }
      } else {
        // If no new files, just update existing images
        const result = await updatePatientEyeImages(patient.id, {
          images: values.images,
        });

        if (result.success) {
          toast.success('Images mises à jour avec succès');
          router.push('/patients');
        } else {
          toast.error('Erreur lors de la mise à jour des images');
        }
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour des images');
      console.error(error);
    }
  }

  if (fields.length === 0 && !files.length) {
    return (
      <div className="space-y-8">
        <EmptyState
          icon={ImageIcon}
          title="Aucune image"
          description="Ce patient n'a pas encore d'images correspondantes."
        />
        <FileUploader
          onFieldChange={handleFileChange}
          imageUrls={fields.map((field) => field.imageUrl)}
          setFiles={setFiles}
        />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="relative">
                <img
                  src={field.imageUrl}
                  alt={`Image de l'œil ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>

              <FormField
                control={form.control}
                name={`images.${index}.type`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {eyeTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`images.${index}.description`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Description de l'image"
                        className="resize-none"
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <FormLabel>Ajouter des images</FormLabel>
          <FileUploader
            onFieldChange={handleFileChange}
            imageUrls={fields.map((field) => field.imageUrl)}
            setFiles={setFiles}
          />
        </div>

        <SubmitButton isLoading={form.formState.isSubmitting}>
          Sauvegarder
          <HiOutlineCheckCircle className="text-xl" />
        </SubmitButton>
      </form>
    </Form>
  );
}

export default PatientImagesTab;
