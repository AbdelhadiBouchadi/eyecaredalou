'use client';

import React, { useState } from 'react';
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
import { Appointment } from '@prisma/client';
import CustomDayHeader from '../Calendar/CustomDayHeader';
import { AppointmentWithRelations } from '@/types';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  resource: AppointmentWithRelations;
}

interface AppointmentsPageProps {
  appointments: AppointmentWithRelations[];
}

const AppointmentsPage: React.FC<AppointmentsPageProps> = ({
  appointments,
}) => {
  moment.locale('fr');
  const localizer = momentLocalizer(moment);

  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<
    AppointmentWithRelations | undefined
  >(undefined);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
    setSelectedAppointment(undefined);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedAppointment(event.resource);
    setOpen(true);
  };

  const getAppointmentColor = (appointment: Appointment) => {
    if (appointment.consultationType === 'SURGERY') {
      switch (appointment.surgeryType) {
        case 'CATARACT':
          return '#FF6B6B'; // Coral Red
        case 'RETINA':
          return '#4ECDC4'; // Turquoise
        case 'ANNEXES':
          return '#45B7D1'; // Ocean Blue
        case 'STRABISMUS':
          return '#96CEB4'; // Sage Green
        case 'CONGENITAL_CATARACT':
          return '#FFEEAD'; // Soft Yellow
        default:
          return '#07b8db'; // Default color
      }
    } else {
      // SPECIALIZED consultation types
      switch (appointment.specializedConsultation) {
        case 'GLAUCOMA':
          return '#6C5B7B'; // Deep Purple
        case 'SURFACE':
          return '#C06C84'; // Dusty Rose
        case 'PEDIATRIC':
          return '#F67280'; // Coral Pink
        case 'RETINA_UVEITIS':
          return '#F8B195'; // Peach
        default:
          return '#07b8db'; // Default color
      }
    }
  };

  const events: CalendarEvent[] = appointments.map((appointment) => {
    const appointmentDate = new Date(appointment.date);
    const start = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate()
    );
    const end = new Date(
      appointmentDate.getFullYear(),
      appointmentDate.getMonth(),
      appointmentDate.getDate()
    );

    return {
      id: appointment.id,
      title: `${appointment.patient?.fullName || 'Patient'} - ${
        appointment.consultationType === 'SURGERY'
          ? appointment.surgeryType
          : appointment.specializedConsultation
      }`,
      start,
      end,
      color: getAppointmentColor(appointment),
      resource: appointment,
    };
  });

  return (
    <>
      {open && (
        <AddAppointmentModal
          isOpen={open}
          closeModal={handleClose}
          mode={selectedAppointment ? 'edit' : 'create'}
          appointmentData={selectedAppointment}
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
        onSelectEvent={handleEventClick}
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
          header: CustomDayHeader,
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
          showMore: (total) => `+ ${total} RDV`,
        }}
      />
    </>
  );
};

export default AppointmentsPage;
