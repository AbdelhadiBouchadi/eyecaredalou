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
import { dashboardCards } from '@/lib/data';
import {
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowUpRight,
} from 'react-icons/bs';
import { cn } from '@/lib/utils';

const HomePage = () => {
  return (
    <>
      <div className="w-full grid xl:grid-cols-3 gap-6 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {dashboardCards.map((card, index) => (
          <div
            key={card.id}
            className=" bg-white rounded-xl border-[1px] border-border p-5 shadow-sm"
          >
            <div className="flex gap-4 items-center">
              <div
                className={cn(
                  'w-10 h-10 flex-colo bg-opacity-10 rounded-md shadow-md ',
                  index === 0 ? 'bg-subMain text-subMain' : '',
                  index === 1 ? 'bg-yellow-500 text-yellow-500' : '',
                  index === 2 ? 'bg-[#66B5A3] text-[#66B5A3]' : ''
                )}
              >
                <card.icon />
              </div>
              <h2 className="text-sm font-medium">{card.title}</h2>
            </div>
            <div className="grid grid-cols-8 gap-4 mt-4 bg-dry py-5 px-8 items-center rounded-xl shadow-md">
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
        <div className="xl:col-span-8  w-full">
          {/* eye banner */}
          <div className=" bg-white rounded-xl border-[1px] border-border relative xl:mt-6 overflow-hidden">
            <img
              src="/images/banner.avif"
              className="w-full h-72 object-cover"
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
              <h2 className="text-sm font-medium">Statisques Annuels</h2>
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
      </div>
    </>
  );
};

export default HomePage;
