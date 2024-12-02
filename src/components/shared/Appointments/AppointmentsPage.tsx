'use client';

import React, { useState } from 'react';
import { Calendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr'; // Import French locale
import { BiPlus } from 'react-icons/bi';
import { servicesData } from '@/lib/data';
import AddAppointmentModal from '@/components/shared/Modals/AddAppointmentModal';
import { AppointmentData } from '@/types/appointment';
import { Service } from '@/types/medical';
import CustomToolbar from '@/components/shared/Calendar/CustomToolBar';

const AppointmentsPage: React.FC = () => {
  moment.locale('fr');
  const localizer = momentLocalizer(moment);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<AppointmentData | undefined>(undefined);
  const [view, setView] = useState<View>('month');
  const [date, setDate] = useState(new Date());

  const handleClose = () => {
    setOpen(false);
    setData(undefined);
  };

  const createService = (serviceData: any): Service => ({
    id: serviceData.id,
    name: serviceData.name,
    price: serviceData.price || 0,
    date: serviceData.date || new Date().toISOString(),
    status: serviceData.status || false,
  });

  const events: AppointmentData[] = [
    {
      id: 0,
      start: moment({ hours: 7 }).toDate(),
      end: moment({ hours: 9 }).toDate(),
      color: '#FB923C',
      title: 'John Doe',
      message: 'He is not sure about the time',
      service: createService(servicesData[1]),
      shareData: { email: true, sms: true, whatsapp: false },
    },
    {
      id: 1,
      start: moment({ hours: 12 }).toDate(),
      end: moment({ hours: 13 }).toDate(),
      color: '#FC8181',
      title: 'Minah Mmassy',
      message: 'She is coming for checkup',
      service: createService(servicesData[2]),
      shareData: { email: false, sms: true, whatsapp: false },
    },
    {
      id: 2,
      start: moment({ hours: 14 }).toDate(),
      end: moment({ hours: 17 }).toDate(),
      color: '#FFC107',
      title: 'Irene P. Smith',
      message: 'She is coming for checkup. but she is not sure about the time',
      service: createService(servicesData[3]),
      shareData: { email: true, sms: true, whatsapp: true },
    },
  ];

  const handleEventClick = (event: AppointmentData) => {
    setData(event);
    setOpen(true);
  };

  return (
    <>
      {open && (
        <AddAppointmentModal
          datas={data}
          isOpen={open}
          closeModal={handleClose}
        />
      )}
      <button
        onClick={() => setOpen(true)}
        className="w-16  h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </button>
      <Calendar<AppointmentData>
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
        views={['month', 'day', 'week']}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color || '#07b8db',
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
          toolbar: CustomToolbar,
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
