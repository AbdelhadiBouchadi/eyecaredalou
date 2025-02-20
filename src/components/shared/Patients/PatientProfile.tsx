'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { patientTabs } from '@/lib/data';
import { MedicalRecordTab } from './tabs/MedicalRecordTab';
import { AppointmentsTab } from './tabs/AppointmentsTab';
import { PatientImagesTab } from './tabs/PatientImagesTab';
import { PersonalInfoTab } from './tabs/PersonalInfoTab';
import { HealthInfoTab } from './tabs/HealthInfoTab';
import { formatBloodGroup } from '@/lib/utils';
import { PatientWithRelations } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface PatientProfileProps {
  patient: PatientWithRelations;
}

export function PatientProfile({ patient }: PatientProfileProps) {
  const [activeTab, setActiveTab] = useState(1);

  const tabPanel = () => {
    switch (activeTab) {
      case 1:
        return (
          <MedicalRecordTab
            patient={patient}
            records={patient.medicalRecords}
          />
        );
      case 2:
        return <AppointmentsTab patientId={patient.id} />;
      case 3:
        return (
          <PatientImagesTab patient={patient} images={patient.eyeImages} />
        );
      case 4:
        return <PersonalInfoTab patient={patient} />;
      case 5:
        return <HealthInfoTab patient={patient} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/patients"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline className="text-xl" />
        </Link>
        <h1 className="sm:text-xl font-semibold capitalize">
          {patient.fullName}
        </h1>
        <div className="h-8 w-px bg-gray-900 hidden sm:block" />
        {patient.createdBy && (
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p className="font-semibold text-gray-900 mr-3">Créé par:</p>{' '}
            <p className="capitalize">
              Dr. {patient.createdBy.name || patient.createdBy.email}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div className="col-span-12 flex-colo gap-6 lg:col-span-4 bg-white rounded-xl border-[1px] border-border p-6 lg:sticky top-28">
          <Avatar>
            {patient.profileImage ? (
              <AvatarImage
                src={patient.profileImage}
                alt="Profile image"
                className="w-10 h-10 object-cover object-center"
              />
            ) : (
              <AvatarFallback>
                {patient.fullName ? (
                  patient.fullName.charAt(0).toUpperCase()
                ) : (
                  <User className="size-12 p-8 rounded-full bg-background text-subMain" />
                )}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="gap-2 flex-colo">
            <h2 className="text-sm font-semibold capitalize">
              {patient.fullName}
            </h2>
            <p className="text-xs">
              <span className="font-semibold mr-2">Age:</span> {patient.age} ans
            </p>
            <p className="text-xs">
              <span className="font-semibold mr-2">Groupe Sanguin:</span>{' '}
              {formatBloodGroup(patient.bloodGroup)}
            </p>
            <p className="text-xs">
              <span className="font-semibold mr-2">Rendez-vous:</span>{' '}
              {patient.totalAppointments}
            </p>
          </div>
          {/* tabs */}
          <div className="flex-colo gap-3 px-2 xl:px-6 w-full">
            {patientTabs.map((tab) => (
              <button
                onClick={() => setActiveTab(tab.id)}
                key={tab.id}
                className={`
                ${
                  activeTab === tab.id
                    ? 'bg-text text-subMain'
                    : 'bg-dry text-main hover:bg-text hover:text-subMain'
                }
                text-sm gap-4 flex items-center w-full p-4 rounded`}
              >
                <tab.icon className="text-lg" /> {tab.title}
              </button>
            ))}
          </div>
        </div>
        {/* tab panel */}
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
          {tabPanel()}
        </div>
      </div>
    </>
  );
}
