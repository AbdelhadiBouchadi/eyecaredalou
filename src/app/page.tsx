'use client';

import dynamic from 'next/dynamic';

const DashboardSmallChart = dynamic(
  () => import('@/components/shared/Charts/DashboardSmallChart'),
  {
    ssr: false, // This ensures that the component is only rendered on the client
  }
);

const DashboardBigChart = dynamic(
  () => import('@/components/shared/Charts/DashboardBigChart'),
  {
    ssr: false,
  }
);

import React from 'react';
import {
  appointmentsData,
  dashboardCards,
  memberData,
  reviewData,
} from '@/lib/data';
import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowUpRight,
  BsCheckCircleFill,
  BsClockFill,
  BsXCircleFill,
} from 'react-icons/bs';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

const page = () => {
  return (
    <>
      <div className="w-full grid xl:grid-cols-3 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {dashboardCards.map((card, index) => (
          <div
            key={card.id}
            className=" bg-white rounded-xl border-[1px] border-border p-5"
          >
            <div className="flex gap-4 items-center">
              <div
                className={cn(
                  'w-10 h-10 flex-colo bg-opacity-10 rounded-md ',
                  index === 0 ? 'bg-subMain text-subMain' : '',
                  index === 1 ? 'bg-yellow-500 text-yellow-500' : '',
                  index === 2 ? 'bg-[#66B5A3] text-[#66B5A3]' : ''
                )}
              >
                <card.icon />
              </div>
              <h2 className="text-sm font-medium">{card.title}</h2>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-4 bg-dry py-5 px-8 items-center rounded-xl">
              <div className="col-span-5">
                {/* statistc */}
                <DashboardSmallChart data={card.datas} colors={card.color[2]} />
              </div>
              <div className="flex flex-col gap-4 col-span-3">
                <h4 className="text-md font-medium">
                  {card.value}
                  {
                    // if the id === 4 then add the $ sign
                    card.id === 4 ? '$' : '+'
                  }
                </h4>
                <p className={`text-sm flex gap-2 ${card.color[1]}`}>
                  {card.percent > 50 && <BsArrowUpRight />}
                  {card.percent > 30 && card.percent < 50 && (
                    <BsArrowDownRight />
                  )}
                  {card.percent < 30 && <BsArrowDownLeft />}
                  {card.percent}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full my-6 grid xl:grid-cols-8 grid-cols-1 gap-6">
        <div className="xl:col-span-6  w-full">
          {/* eye banner */}
          <div className=" bg-white rounded-xl border-[1px] border-border relative xl:mt-6">
            <img
              src="/images/banner.avif"
              className="w-full h-72 object-cover rounded"
              alt="banner"
            />
            <div className="space-y-4 py-5 md:px-12 px-6 absolute top-0 bottom-0 left-0 right-0 bg-subMain bg-opacity-10 flex flex-col justify-center">
              <h1 className="text-xl text-subMain font-semibold max-w-96">
                Commencez votre journée en gérant de nouveaux rendez-vous.
              </h1>
              <p className="text-xs text-textGray max-w-96 leading-6">
                Cet interface vous permet : la gestion des données de vos
                patients, la gestion de rendez-vous , et plus de
                fonctionnalités.
              </p>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-xl border-[1px] border-border p-5">
            <div className="flex-btn gap-2">
              <h2 className="text-sm font-medium">Earning Reports</h2>
              <p className="flex gap-4 text-sm items-center">
                5.44%{' '}
                <span className="py-1 px-2 bg-subMain text-white text-xs rounded-xl">
                  +2.4%
                </span>
              </p>
            </div>
            {/* Earning Reports */}
            <div className="mt-4">
              <DashboardBigChart />
            </div>
          </div>
        </div>
        {/* side 2 */}
        <div
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="10"
          data-aos-offset="200"
          className="xl:col-span-2 xl:block grid sm:grid-cols-2 gap-6"
        >
          {/* recent patients */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
            <h2 className="text-sm font-medium">Patients Récents </h2>
            {memberData.slice(3, 8).map((member, index) => (
              <Link
                href={`/patients/preview/${member.id}`}
                key={index}
                className="flex-btn gap-4 mt-6 border-b pb-4 border-border"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={member.image}
                    alt="member"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-medium">{member.title}</h3>
                    <p className="text-xs text-gray-400">{member.phone}</p>
                  </div>
                </div>
                <p className="text-xs text-textGray">2:00 PM</p>
              </Link>
            ))}
          </div>
          {/* today apointments */}
          <div className="bg-white rounded-xl border-[1px] border-border p-5 xl:mt-6">
            <h2 className="text-sm mb-4 font-medium">
              Rendez-vous d'aujourd'hui
            </h2>
            {appointmentsData.map((appointment, index) => (
              <div
                key={appointment.id}
                className="grid grid-cols-12 gap-2 items-center"
              >
                <p className="text-textGray text-[12px] col-span-3 font-light">
                  {appointment.time}
                </p>
                <div className="flex-colo relative col-span-2">
                  <hr className="w-[2px] h-20 bg-border" />
                  <div
                    className={`w-7 h-7 flex-colo text-sm bg-opacity-10
                   ${
                     appointment.status === 'Pending' &&
                     'bg-orange-500 text-orange-500'
                   }
                  ${
                    appointment.status === 'Cancel' && 'bg-red-500 text-red-500'
                  }
                  ${
                    appointment.status === 'Approved' &&
                    'bg-green-500 text-green-500'
                  }
                   rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  >
                    {appointment.status === 'Pending' && <BsClockFill />}
                    {appointment.status === 'Cancel' && <BsXCircleFill />}
                    {appointment.status === 'Approved' && <BsCheckCircleFill />}
                  </div>
                </div>
                <Link
                  href="/appointments"
                  className="flex flex-col gap-1 col-span-6"
                >
                  <h2 className="text-xs font-medium">
                    {appointment.user?.title}
                  </h2>
                  <p className="text-[12px] font-light text-textGray">
                    {appointment.from} - {appointment.to}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
