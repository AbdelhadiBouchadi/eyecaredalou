'use client';

import { UserTable } from './UsersTable';
import React, { useEffect } from 'react';
import { BiTime } from 'react-icons/bi';
import { BsCalendarMonth } from 'react-icons/bs';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { cn } from '@/lib/utils';

type UserData = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
  createdAt: Date;
};

interface UsersPageProps {
  users: UserData[];
  stats: {
    doctors: number;
    visitors: number;
    admins: number;
  };
}

const UsersPage = ({ users, stats }: UsersPageProps) => {
  useEffect(() => {
    AOS.init({});
  }, []);

  const boxes = [
    {
      id: 1,
      title: 'Médecins',
      value: stats.doctors.toString(),
      color: ['bg-subMain', 'text-subMain'],
      icon: BiTime,
    },
    {
      id: 2,
      title: 'Visiteurs',
      value: stats.visitors.toString(),
      color: ['bg-orange-500', 'text-orange-500'],
      icon: BsCalendarMonth,
    },
    {
      id: 3,
      title: 'Administrateurs',
      value: stats.admins.toString(),
      color: ['bg-[#66B5A3]', 'text-[#66B5A3]'],
      icon: MdOutlineCalendarMonth,
    },
  ];

  return (
    <>
      <h1 className="text-xl font-semibold">Utilisateurs</h1>

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
                Total des {box.title}
                <span className={cn('ml-2', box.color[1])}>{box.value}</span>
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
          <UserTable data={users} />
        </div>
      </div>
    </>
  );
};

export default UsersPage;
