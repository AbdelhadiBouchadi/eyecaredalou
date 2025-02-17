'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { EmptyState } from '@/components/shared/EmptyState';
import { Appointment, User } from '@prisma/client';
import { getAppointmentsByPatientId } from '@/lib/actions/appointment';
import BigLoader from '../../Loading/BigLoader';
import {
  formatAppointmentStatus,
  formatSpecializedConsultation,
  formatSurgeryType,
} from '@/lib/utils';
import AddAppointmentModal from '../../Modals/AddAppointmentModal';
import { AppointmentFormValues } from '@/lib/validator';
import { fr } from 'date-fns/locale';

interface AppointmentWithRelations extends Appointment {
  doctor: User;
}

interface AppointmentsTabProps {
  patientId: string;
}

export function AppointmentsTab({ patientId }: AppointmentsTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [appointments, setAppointments] = useState<AppointmentWithRelations[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<
    (AppointmentFormValues & { id: string }) | undefined
  >(undefined);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const patientAppointments = await getAppointmentsByPatientId(patientId);
        setAppointments(patientAppointments as AppointmentWithRelations[]);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [patientId]);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleAppointmentClick = (appointment: AppointmentWithRelations) => {
    const formValues: AppointmentFormValues & { id: string } = {
      id: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: new Date(appointment.date),

      status: appointment.status,
      consultationType: appointment.consultationType,
      specializedConsultation: appointment.specializedConsultation || undefined,
      surgeryType: appointment.surgeryType || undefined,
      professor: appointment.professor || undefined,
      description: appointment.description || undefined,
    };
    setSelectedAppointment(formValues);
    setIsOpen(true);
  };

  if (loading) {
    return <BigLoader />;
  }

  if (appointments.length === 0) {
    return (
      <>
        {isOpen && (
          <AddAppointmentModal
            isOpen={isOpen}
            closeModal={handleClose}
            mode="create"
            appointmentData={selectedAppointment}
          />
        )}
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-medium">Rendez-vous</h1>
            <Button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Créer un rendez-vous
            </Button>
          </div>

          <EmptyState
            icon={Calendar}
            title="Aucun rendez-vous"
            description="Aucun rendez-vous n'a été planifié pour ce patient."
          />
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      {isOpen && (
        <AddAppointmentModal
          isOpen={isOpen}
          closeModal={handleClose}
          mode={selectedAppointment ? 'edit' : 'create'}
          appointmentData={selectedAppointment}
        />
      )}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Rendez-vous</h1>
        <Button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Créer un rendez-vous
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Date
              </th>

              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Docteur
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Type
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Status
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-2 py-4 text-sm text-gray-900">
                  {format(new Date(appointment.date), 'PP', { locale: fr })}
                </td>

                <td className="px-2 py-4 text-sm text-gray-900 capitalize">
                  Dr. {appointment.doctor?.name || 'N/A'}
                </td>
                <td className="px-2 py-4 text-sm text-gray-900">
                  {appointment.specializedConsultation &&
                    ` ${formatSpecializedConsultation(
                      appointment.specializedConsultation
                    )}`}
                  {appointment.surgeryType &&
                    ` ${formatSurgeryType(appointment.surgeryType)}`}
                </td>
                <td className="min-w-16">
                  <span
                    className={`w-full px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : appointment.status === 'CANCELED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {formatAppointmentStatus(appointment.status)}
                  </span>
                </td>
                <td className="px-2 py-4 text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAppointmentClick(appointment)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Voir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
