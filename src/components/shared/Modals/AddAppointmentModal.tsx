'use client';

import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import {
  Button,
  DatePickerComp,
  Input,
  Select,
  Textarea,
  TimePickerComp,
} from '../Form';
import { BiChevronDown, BiPlus } from 'react-icons/bi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { toast } from 'react-hot-toast';
import PatientMedicineServiceModal from './PatientMedicineServiceModal';
import { memberData, servicesData, sortsDatas } from '@/lib/data';
import { useForm } from 'react-hook-form';

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
  id: string;
  name: string;
};

type Shares = {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
};

interface AppointmentData {
  title?: string;
  service: Service;
  start: Date;
  end: Date;
  shareData: Shares;
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
  // Inside your component
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
  const [shares, setShares] = useState<Shares>({
    email: false,
    sms: false,
    whatsapp: false,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (datas) {
      setServices(datas.service);
      setStartTime(new Date(datas.start));
      setEndTime(new Date(datas.end));
      setShares(datas.shareData);
    }
  }, [datas]);

  const onChangeShare = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setShares((prev) => ({ ...prev, [name]: checked }));
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={datas?.title ? 'Edit Appointment' : 'New Appointment'}
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
          <div className="sm:col-span-10">
            <Input
              label="Patient Name"
              color={true}
              placeholder={
                datas?.title
                  ? datas.title
                  : 'Select Patient and patient name will appear here'
              }
              name="patientName" // Provide a name here
              type="text" // Specify the type of input (e.g., 'text', 'email', etc.)
              register={register} // Pass the register function from react-hook-form, if needed
            />
          </div>
          <button
            onClick={() => setOpen(true)}
            className="text-subMain flex-rows border border-dashed border-subMain text-sm py-3.5 sm:mt-6 sm:col-span-2 rounded"
          >
            <BiPlus /> Add
          </button>
        </div>

        {/* Purpose and Date */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Purpose of Visit</p>
            <Select
              selectedPerson={services}
              setSelectedPerson={setServices}
              datas={servicesData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {services.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <DatePickerComp
            label="Date of Visit"
            startDate={startDate}
            onChange={setStartDate}
          />
        </div>

        {/* Time Selection */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <TimePickerComp
            label="Start Time"
            startDate={startTime}
            onChange={setStartTime}
          />
          <TimePickerComp
            label="End Time"
            startDate={endTime}
            onChange={setEndTime}
          />
        </div>

        {/* Doctor and Status */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Doctor</p>
            <Select
              selectedPerson={doctors}
              setSelectedPerson={setDoctors}
              datas={doctorsData}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {doctors.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
          <div className="flex w-full flex-col gap-3">
            <p className="text-black text-sm">Status</p>
            <Select
              selectedPerson={status}
              setSelectedPerson={setStatus}
              datas={sortsDatas.status}
            >
              <div className="w-full flex-btn text-textGray text-sm p-4 border border-border font-light rounded-lg focus:border focus:border-subMain">
                {status.name} <BiChevronDown className="text-xl" />
              </div>
            </Select>
          </div>
        </div>

        {/* Description */}
        <Textarea
          label="Description"
          placeholder={datas?.message || 'Add any additional details here'}
          name="description"
          rows={5}
        />

        {/* Buttons */}
        <div className="grid sm:grid-cols-2 gap-4 w-full">
          <button
            onClick={closeModal}
            className="bg-red-600 bg-opacity-5 text-red-600 text-sm p-4 rounded-lg font-light"
          >
            {datas?.title ? 'Discard' : 'Cancel'}
          </button>
          <Button
            label="Save"
            Icon={HiOutlineCheckCircle}
            onClick={() => toast.error('This feature is not available yet')}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddAppointmentModal;