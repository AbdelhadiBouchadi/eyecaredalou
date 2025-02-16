'use client';

import React, { useEffect, useState } from 'react';
import {
  Calendar,
  momentLocalizer,
  ToolbarProps,
  View,
} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr';
import { BiPlus } from 'react-icons/bi';
import AddAppointmentModal from '@/components/shared/Modals/AddAppointmentModal';
import CustomToolbar from '@/components/shared/Calendar/CustomToolBar';
import { getAppointments } from '@/lib/actions/appointment';
import { Appointment } from '@prisma/client';
import { AppointmentFormValues } from '@/lib/validator';
import BigLoader from '../Loading/BigLoader';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  resource: Appointment & {
    patient?: { fullName: string };
  };
}

const AppointmentsPage: React.FC = () => {
  moment.locale('fr');
  const localizer = momentLocalizer(moment);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<
    (AppointmentFormValues & { id: string }) | undefined
  >(undefined);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState<
    (Appointment & {
      patient?: { fullName: string };
    })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleClose = () => {
    setOpen(false);
    setData(undefined);
  };

  const handleEventClick = (event: CalendarEvent) => {
    const appointment = event.resource;
    const formValues: AppointmentFormValues & { id: string } = {
      id: appointment.id,
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
      date: new Date(appointment.date),
      startTime: new Date(appointment.startTime),
      endTime: new Date(appointment.endTime),
      status: appointment.status,
      consultationType: appointment.consultationType,
      specializedConsultation: appointment.specializedConsultation || undefined,
      surgeryType: appointment.surgeryType || undefined,
      professor: appointment.professor || undefined,
      description: appointment.description || undefined,
    };
    setData(formValues);
    setOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return '#FFA500'; // Orange
      case 'APPROVED':
        return '#4CAF50'; // Green
      case 'CANCELED':
        return '#F44336'; // Red
      case 'COMPLETED':
        return '#2196F3'; // Blue
      default:
        return '#07b8db'; // Default color
    }
  };

  const events: CalendarEvent[] = appointments.map((appointment) => {
    // Create a Date object from the appointment date
    const appointmentDate = new Date(appointment.date);

    // Get hours and minutes from startTime and endTime
    const startTime = new Date(appointment.startTime);
    const endTime = new Date(appointment.endTime);

    // Create new Date objects for start and end by combining the appointment date with time
    const start = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
      startTime.getHours(),
      startTime.getMinutes()
    );

    const end = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate(),
      endTime.getHours(),
      endTime.getMinutes()
    );

    return {
      id: appointment.id,
      title: `${appointment.patient?.fullName || 'Patient'}`,
      start,
      end,
      color: getStatusColor(appointment.status),
      resource: appointment,
    };
  });

  if (loading) {
    return <BigLoader />;
  }

  return (
    <>
      {open && (
        <AddAppointmentModal
          isOpen={open}
          closeModal={handleClose}
          mode={data ? 'edit' : 'create'}
          appointmentData={data}
        />
      )}
      <button
        onClick={() => setOpen(true)}
        className="w-16 h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      <Calendar<CalendarEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 900, marginBottom: 50 }}
        onSelectEvent={(event: CalendarEvent) => handleEventClick(event)}
        date={date}
        onNavigate={setDate}
        view={view}
        onView={setView}
        timeslots={1}
        step={60}
        selectable
        views={['month', 'day', 'work_week']}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
            borderRadius: '10px',
            color: 'white',
            border: '1px solid #F2FAF8',
            fontSize: '12px',
            padding: '5px',
          },
        })}
        dayPropGetter={() => ({
          style: {
            backgroundColor: 'white',
          },
        })}
        components={{
          toolbar: CustomToolbar as React.ComponentType<
            ToolbarProps<CalendarEvent, object>
          >,
        }}
        messages={{
          allDay: 'Toute la journée',
          previous: 'Précédent',
          next: 'Suivant',
          today: "Aujourd'hui",
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          agenda: 'Agenda',
          date: 'Date',
          time: 'Heure',
          event: 'Événement',
          showMore: (total) => `+ ${total} rendez-vous`,
        }}
      />
    </>
  );
};

export default AppointmentsPage;
