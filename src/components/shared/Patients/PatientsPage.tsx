'use client';

import { PatientTable } from '@/components/shared/Patients/PatientsTable';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { BiPlus, BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { cn } from '@/lib/utils';
import { PatientWithRelations } from '@/types';

interface PatientsPageProps {
  patients: PatientWithRelations[];
  stats: {
    daily: number;
    monthly: number;
    yearly: number;
  };
}

const PatientsPage = ({ patients, stats }: PatientsPageProps) => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const boxes = [
    {
      id: 1,
      title: "Patiens d'aujourd'hui",
      value: stats.daily.toString(),
      color: ['bg-subMain', 'text-subMain'],
      icon: BiTime,
    },
    {
      id: 2,
      title: 'Patients Mensuels',
      value: stats.monthly.toString(),
      color: ['bg-orange-500', 'text-orange-500'],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: 'Patients Annuels',
      value: stats.yearly.toString(),
      color: ['bg-[#66B5A3]', 'text-[#66B5A3]'],
      icon: MdOutlineCalendarMonth,
    },
  ];

  return (
    <>
      <Link
        href="/patients/create"
        className="w-16 h-16 border border-border z-50 bg-subMain text-white rounded-full flex-colo fixed bottom-8 right-12 button-fb"
      >
        <BiPlus className="text-2xl" />
      </Link>
      <h1 className="text-xl font-semibold">Patients</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5"
          >
            <div className="w-3/4">
              <h2 className="text-sm font-medium">{box.title}</h2>
              <h2 className="text-xl my-6 font-medium">{box.value}</h2>
              <p className="text-xs text-textGray">
                Total de Patients{' '}
                {box.title === "Patiens d'aujourd'hui"
                  ? "aujourd'hui"
                  : box.title === 'Patients Mensuels'
                  ? 'ce mois'
                  : 'cette année'}
                <span className={cn('ml-2', box.color[1])}>{box.value}</span>{' '}
              </p>
            </div>
            <div
              className={`w-10 h-10 flex-colo rounded-md text-white text-md ${box.color[0]}`}
            >
              <box.icon />
            </div>
          </div>
        ))}
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="mt-8 w-full overflow-x-scroll">
          <PatientTable data={patients} />
        </div>
      </div>
    </>
  );
};

export default PatientsPage;
