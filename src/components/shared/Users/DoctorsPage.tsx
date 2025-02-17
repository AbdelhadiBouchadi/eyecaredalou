'use client';

import React, { useEffect } from 'react';
import { FaUserMd } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { DoctorTable } from './DoctorsTable';

interface Doctor {
  id: string;
  name: string | null;
  email: string | null;
  specialization: string | null;
}

interface DoctorsPageProps {
  doctors: Doctor[];
  totalDoctors: number;
}

const DoctorsPage = ({ doctors, totalDoctors }: DoctorsPageProps) => {
  useEffect(() => {
    AOS.init({});
  }, []);

  return (
    <>
      <h1 className="text-xl font-semibold">Médecins</h1>

      <div className="grid grid-cols-1 gap-8 mt-8">
        <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
          <div className="w-3/4">
            <h2 className="text-sm font-medium">Total des Médecins</h2>
            <h2 className="text-xl my-6 font-medium">{totalDoctors}</h2>
            <p className="text-xs text-textGray">
              Nombre total de médecins dans le système
            </p>
          </div>
          <div className="w-10 h-10 flex-colo rounded-md text-white text-md bg-subMain">
            <FaUserMd />
          </div>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="10"
        data-aos-offset="200"
        className="bg-white my-8 rounded-xl border-[1px] border-border p-5"
      >
        <div className="mt-8 w-full overflow-x-scroll">
          <DoctorTable data={doctors} />
        </div>
      </div>
    </>
  );
};

export default DoctorsPage;
