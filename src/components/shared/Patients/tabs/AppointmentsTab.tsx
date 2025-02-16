'use client';

import { useState, useEffect } from 'react';
import { Plus, Eye, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { EmptyState } from '@/components/shared/EmptyState';
import { Appointment, User } from '@prisma/client';
import { getAppointmentsByPatientId } from '@/lib/actions/appointment';
import BigLoader from '../../Loading/BigLoader';

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

  if (loading) {
    return <BigLoader />;
  }

  if (appointments.length === 0) {
    return (
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
    );
  }

  return (
    <div className="w-full">
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Heure
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Docteur
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {format(new Date(appointment.date), 'PP')}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {format(new Date(appointment.startTime), 'p')}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {appointment.doctor?.name || 'N/A'}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">
                  {appointment.consultationType}
                  {appointment.specializedConsultation &&
                    ` - ${appointment.specializedConsultation}`}
                  {appointment.surgeryType && ` - ${appointment.surgeryType}`}
                </td>
                <td className="px-4 py-4 text-sm">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      appointment.status === 'COMPLETED'
                        ? 'bg-green-100 text-green-800'
                        : appointment.status === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : appointment.status === 'CANCELED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {appointment.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsOpen(true)}
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
