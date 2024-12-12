'use client';

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { DatePickerComp, Select, TimePickerComp } from '../Form';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { memberData, servicesData, sortsDatas } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DropDown from '../Patients/DropDown';
import SelectDoctor from './SelectDoctor';
import SelectStatus from './SelectStatus';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

// Types
type Service = {
  id: string | number; // Accept either string or number for id
  name: string;
  price?: number;
  date?: string;
  status?: boolean;
};

type Status = {
  id: string | number;
  name: string;
};

type Doctor = {
  id: string | number;
  name: string;
};

interface AppointmentData {
  title?: string;
  service: Service;
  start: Date;
  end: Date;
  message?: string;
}

interface AddAppointmentModalProps {
  closeModal: () => void;
  isOpen: boolean;
  datas?: AppointmentData;
}

const doctorsData: Doctor[] = memberData.map((item) => ({
  id: item.id,
  name: item.title,
}));

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  closeModal,
  isOpen,
  datas,
}) => {
  const [services, setServices] = useState<Service>({
    id: String(servicesData[0].id), // Convert id to string
    name: servicesData[0].name,
  });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<Status>({
    id: String(sortsDatas.status[0].id), // Convert id to string
    name: sortsDatas.status[0].name,
  });
  const [doctors, setDoctors] = useState<Doctor>(doctorsData[0]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (datas) {
      setServices(datas.service);
      setStartTime(new Date(datas.start));
      setEndTime(new Date(datas.end));
    }
  }, [datas]);

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? 'Modifier Le Rendez-vous' : 'Créer un Rendez-vous'}
      width="max-w-3xl"
    >
      {open && (
        <PatientMedicineServiceModal
          closeModal={() => setOpen(false)}
          isOpen={open}
          patient={true}
        />
      )}
      <div className="flex-colo gap-6">
        {/* Patient Name and Add Button */}
        <div className="grid sm:grid-cols-12 gap-4 w-full items-center">
          <div className="sm:col-span-12 flex justify-center items-center w-full gap-3">
            <Input
              placeholder="Nom du patient"
              className="shad-input sm:col-span-10 "
            />
            <Button
              onClick={() => setOpen(true)}
              className="text-white bg-subMain hover:bg-background hover:text-subMain h-full flex-rows text-sm py-3.5 mt-3 sm:col-span-2 rounded-lg"
            >
              <BiPlus className="text-xl" /> Ajouter
            </Button>
          </div>
        </div>

        {/* Purpose and Date */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Raison de la visite</p>
            <DropDown onChangeHandler={() => ''} value="" />
          </div>
          <DatePickerComp
            label="Date de visite"
            startDate={startDate}
            onChange={setStartDate}
          />
        </div>

        {/* Time Selection */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <TimePickerComp
            label="Début du rendez-vous"
            startDate={startTime}
            onChange={setStartTime}
          />
          <TimePickerComp
            label="Fin du rendez-vous"
            startDate={endTime}
            onChange={setEndTime}
          />
        </div>

        {/* Doctor and Status */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Docteur</p>
            <SelectDoctor onChangeHandler={() => ''} value="" />
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <SelectStatus onChangeHandler={() => ''} value="" />
          </div>
        </div>

        {/* Description */}
        <div className="w-full flex flex-col gap-3">
          <Label className="text-start text-sm">Déscription</Label>
          <Textarea rows={5} />
        </div>

        {/* Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <Button
            onClick={closeModal}
            className="bg-red-600 hover:bg-red-900 hover:bg-background hover:text-red-600 text-white text-sm p-4 rounded-lg font-normal"
          >
            {datas?.title ? 'Discard' : 'Annuler'}
          </Button>
          <Button
            onClick={() => toast.error('This feature is not available yet')}
            className="bg-subMain hover:bg-background hover:text-subMain text-white text-sm p-4 rounded-lg font-normal flex justify-center items-center gap-3"
          >
            Sauvegarder
            <HiOutlineCheckCircle className="text-xl" />
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddAppointmentModal;
