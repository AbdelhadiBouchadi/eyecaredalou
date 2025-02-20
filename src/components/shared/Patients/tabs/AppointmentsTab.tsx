'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAppointmentsByPatientId } from '@/lib/actions/appointment';
import BigLoader from '../../Loading/BigLoader';
import { formatSpecializedConsultation, formatSurgeryType } from '@/lib/utils';
import AddAppointmentModal from '../../Modals/AddAppointmentModal';
import { fr } from 'date-fns/locale';
import { AppointmentWithRelations } from '@/types';

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
    AppointmentWithRelations | undefined
  >(undefined);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const patientAppointments = await getAppointmentsByPatientId(patientId);
        setAppointments(patientAppointments);
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
    setSelectedAppointment(appointment);
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
            appointmentData={undefined}
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-border hover:bg-greyed transition"
              >
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
