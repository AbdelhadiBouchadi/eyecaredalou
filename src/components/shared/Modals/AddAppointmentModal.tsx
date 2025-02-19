'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import Modal from './Modal';
import { DatePickerComp } from '../Form';
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
import {
  AppointmentFormData,
  AppointmentWithRelations,
  PatientWithRelations,
} from '@/types';
import {
  consultationTypes,
  professors,
  specializedConsultations,
  surgeryTypes,
} from '@/types/appointment';
import SelectDoctor from '../Appointments/SelectDoctor';
import { DeleteAppointment } from '../Appointments/DeleteAppointment';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CircleLoader } from 'react-spinners';
import AddPatientModal from './AddPatientModal';
import SubmitButton from '../auth/SubmitButton';

interface AddAppointmentModalProps {
  closeModal: () => void;
  isOpen: boolean;
  appointmentData?: AppointmentWithRelations;
  mode?: 'create' | 'edit';
}

const defaultValues: AppointmentFormData = {
  patientId: '',
  doctorId: '',
  date: new Date(),
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
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: mode === 'create' ? defaultValues : undefined,
  });

  const consultationType = form.watch('consultationType');

  useEffect(() => {
    if (mode === 'edit' && appointmentData) {
      console.log('Appointment Data:', appointmentData); // Add this line
      const formData: AppointmentFormData = {
        patientId: appointmentData.patientId || '',
        doctorId: appointmentData.doctorId || '',
        date: appointmentData.date || new Date(),
        consultationType: appointmentData.consultationType || 'SPECIALIZED',
        specializedConsultation:
          appointmentData.specializedConsultation || undefined,
        surgeryType: appointmentData.surgeryType || undefined,
        professor: appointmentData.professor || undefined,
        description: appointmentData.description || '',
      };

      form.reset(formData);
    }
  }, [appointmentData, form, mode]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getPatients();
      if (Array.isArray(data)) {
        setPatients(data);
      } else {
        console.error('Received invalid patients data:', data);
        setPatients([]);
      }
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Failed to load patients');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.fullName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handlePatientCreated = async (patientId: string) => {
    await fetchPatients();
    form.setValue('patientId', patientId);
    setSearchValue('');
  };

  async function onSubmit(values: AppointmentFormData) {
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

  if (loading) {
    return (
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title="Chargement..."
        width="max-w-3xl"
      >
        <div className="flex items-center justify-center p-8">
          <CircleLoader color="#07b8db" />
        </div>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        closeModal={closeModal}
        isOpen={isOpen}
        title={
          mode === 'create'
            ? 'Créer un Rendez-vous'
            : `Modifier Le Rendez-vous${
                appointmentData?.createdBy?.name ||
                appointmentData?.createdBy?.email
                  ? ` | Crée par: Dr. ${
                      appointmentData.createdBy.name ||
                      appointmentData.createdBy.email
                    }`
                  : ''
              }`
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className={cn(
                            'w-full justify-between capitalize',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? patients.find(
                                (patient) => patient.id === field.value
                              )?.fullName || 'Sélectionner un patient'
                            : 'Rechercher un patient...'}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Rechercher un patient..."
                          value={searchValue}
                          onValueChange={setSearchValue}
                        />
                        <CommandList>
                          <CommandEmpty className="py-6 text-center text-sm">
                            <p>Aucun patient trouvé.</p>
                            <Button
                              variant="ghost"
                              className="mt-4 mx-auto flex items-center gap-2 text-primary"
                              onClick={() => {
                                setOpen(false);
                                setShowAddPatient(true);
                              }}
                            >
                              <UserPlus className="w-4 h-4" />
                              Créer un nouveau patient ?
                            </Button>
                          </CommandEmpty>
                          <CommandGroup>
                            {filteredPatients.map((patient) => (
                              <CommandItem
                                key={patient.id}
                                value={patient.fullName}
                                onSelect={() => {
                                  form.setValue('patientId', patient.id);
                                  setOpen(false);
                                  setSearchValue('');
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    patient.id === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {patient.fullName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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

            {/* Date Selection */}
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
              {mode === 'edit' ? (
                <DeleteAppointment
                  appointmentId={appointmentData?.id}
                  onDelete={closeModal}
                />
              ) : (
                <Button
                  type="button"
                  onClick={closeModal}
                  variant={'destructive'}
                  className="w-full"
                >
                  Annuler
                </Button>
              )}
              <SubmitButton isLoading={form.formState.isSubmitting}>
                Sauvegarder
                <HiOutlineCheckCircle className="text-xl" />
              </SubmitButton>
            </div>
          </form>
        </Form>
      </Modal>

      {showAddPatient && (
        <AddPatientModal
          isOpen={showAddPatient}
          closeModal={() => setShowAddPatient(false)}
          onPatientCreated={handlePatientCreated}
          initialName={searchValue}
        />
      )}
    </>
  );
};

export default AddAppointmentModal;
