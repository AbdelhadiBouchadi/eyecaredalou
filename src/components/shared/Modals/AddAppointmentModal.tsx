'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppointmentStatus } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import Modal from './Modal';
import { DatePickerComp, TimePickerComp } from '../Form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SelectStatus from './SelectStatus';
import {
  createAppointment,
  updateAppointment,
} from '@/lib/actions/appointment';
import {
  AppointmentFormValues,
  createAppointmentSchema,
} from '@/lib/validator';
import { useRouter } from 'next/navigation';
import { getPatients } from '@/lib/actions/patient';
import { PatientWithRelations } from '@/types';
import {
  consultationTypes,
  professors,
  specializedConsultations,
  surgeryTypes,
} from '@/types/appointment';
import SelectDoctor from '../Appointments/SelectDoctor';

interface AddAppointmentModalProps {
  closeModal: () => void;
  isOpen: boolean;
  appointmentData?: AppointmentFormValues & { id?: string };
  mode?: 'create' | 'edit';
}

const defaultValues: Partial<AppointmentFormValues> = {
  patientId: '',
  doctorId: '',
  date: new Date(),
  startTime: new Date(),
  endTime: new Date(),
  status: AppointmentStatus.PENDING,
  consultationType: 'SPECIALIZED',
  description: '',
};

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  closeModal,
  isOpen,
  appointmentData,
  mode = 'create',
}) => {
  const router = useRouter();
  const [patients, setPatients] = useState<PatientWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: mode === 'create' ? defaultValues : undefined,
  });

  const consultationType = form.watch('consultationType');

  useEffect(() => {
    if (mode === 'edit' && appointmentData) {
      // Reset form with appointment data
      form.reset(appointmentData);

      // Explicitly set each field
      Object.entries(appointmentData).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id') {
          form.setValue(key as keyof AppointmentFormValues, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      });
    }
  }, [appointmentData, form, mode]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatients();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
        toast.error('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  async function onSubmit(values: AppointmentFormValues) {
    try {
      const result =
        mode === 'create'
          ? await createAppointment(values)
          : await updateAppointment(appointmentData?.id!, values);

      if (result.success) {
        toast.success(
          mode === 'create'
            ? 'Rendez-vous créé avec succès'
            : 'Rendez-vous mis à jour avec succès'
        );
        router.refresh();
        closeModal();
      } else {
        toast.error(
          mode === 'create'
            ? 'Erreur lors de la création du rendez-vous'
            : 'Erreur lors de la mise à jour du rendez-vous'
        );
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  }

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={
        mode === 'create' ? 'Créer un Rendez-vous' : 'Modifier Le Rendez-vous'
      }
      width="max-w-3xl"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-colo gap-6"
        >
          {/* Patient Selection */}
          <FormField
            control={form.control}
            name="patientId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Patient</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Sélectionner un patient" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {patients?.map((patient: any) => (
                      <SelectItem
                        key={patient.id}
                        value={patient.id}
                        className="capitalize"
                      >
                        {patient.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Doctor Selection */}
          <FormField
            control={form.control}
            name="doctorId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Docteur</FormLabel>
                <FormControl>
                  <SelectDoctor
                    value={field.value}
                    onChangeHandler={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Consultation Type */}
          <FormField
            control={form.control}
            name="consultationType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Type de Consultation</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value || ''}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type de consultation" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {consultationTypes.map((type) => (
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

          {/* Specialized Consultation Type */}
          {consultationType === 'SPECIALIZED' && (
            <FormField
              control={form.control}
              name="specializedConsultation"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Type de Consultation Spécialisée</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ''}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le type de consultation spécialisée" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specializedConsultations.map((type) => (
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
          )}

          {/* Surgery Type */}
          {consultationType === 'SURGERY' && (
            <>
              <FormField
                control={form.control}
                name="surgeryType"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Type de Chirurgie Programmée</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le type de chirurgie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {surgeryTypes.map((type) => (
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
                name="professor"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Professeur</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner le professeur" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {professors.map((prof) => (
                          <SelectItem key={prof.value} value={prof.value}>
                            {prof.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Date and Time Selection */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Date de visite</FormLabel>
                <FormControl>
                  <DatePickerComp
                    label=""
                    startDate={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Début du rendez-vous</FormLabel>
                  <FormControl>
                    <TimePickerComp
                      label=""
                      startDate={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fin du rendez-vous</FormLabel>
                  <FormControl>
                    <TimePickerComp
                      label=""
                      startDate={field.value}
                      onChange={(date) => field.onChange(date)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <SelectStatus
                    value={field.value}
                    onChangeHandler={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    {...field}
                    placeholder="Description du rendez-vous"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <Button
              type="button"
              onClick={closeModal}
              className="bg-red-600 hover:bg-red-900 hover:bg-background hover:text-red-600 text-white text-sm p-4 rounded-lg font-normal"
            >
              {mode === 'edit' ? 'Annuler les modifications' : 'Annuler'}
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-subMain hover:bg-background hover:text-subMain text-white text-sm p-4 rounded-lg font-normal flex justify-center items-center gap-3"
            >
              {form.formState.isSubmitting
                ? 'En cours de traitement...'
                : 'Sauvegarder'}
              <HiOutlineCheckCircle className="text-xl" />
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default AddAppointmentModal;
