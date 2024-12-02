'use client';

import React, { useEffect } from 'react';
import { ToolbarProps, Navigate, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/fr'; // Import French locale
import { BiChevronLeft, BiChevronRight, BiTime } from 'react-icons/bi';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { ViewType } from '@/types/appointment';

const CustomToolbar: React.FC<ToolbarProps<any>> = (toolbar) => {
  moment.locale('fr');
  const localizer = momentLocalizer(moment);

  // Set moment locale to French
  useEffect(() => {
    moment.locale('fr');
  }, []);

  const goToBack = () => {
    toolbar.onNavigate(Navigate.PREVIOUS);
  };

  const goToNext = () => {
    toolbar.onNavigate(Navigate.NEXT);
  };

  const goToCurrent = () => {
    toolbar.onNavigate(Navigate.TODAY);
  };

  const goToView = (view: ViewType) => {
    toolbar.onView(view);
  };

  const viewNamesGroup = [
    { view: 'month' as ViewType, label: 'Month', icon: <HiOutlineViewGrid /> },
    {
      view: 'week' as ViewType,
      label: 'Week',
      icon: <HiOutlineCalendarDays />,
    },
    { view: 'day' as ViewType, label: 'Day', icon: <BiTime /> },
  ];

  return (
    <div className="flex flex-col gap-8 mb-8">
      <h1 className="text-xl font-semibold">Rendez-vous</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-12 gap-4">
        <div className="md:col-span-1 flex sm:justify-start justify-center items-center">
          <button
            onClick={goToCurrent}
            className="px-6 py-2 border border-subMain rounded-md text-subMain"
          >
            Aujourd'hui
          </button>
        </div>
        <div className="md:col-span-9 flex justify-center items-center gap-4 capitalize">
          <button onClick={goToBack} className="text-2xl text-subMain">
            <BiChevronLeft />
          </button>
          <span className="text-xl font-semibold">
            {moment(toolbar.date).format('MMMM YYYY')}
          </span>
          <button onClick={goToNext} className="text-2xl text-subMain">
            <BiChevronRight />
          </button>
        </div>
        <div className="md:col-span-2 grid grid-cols-3 rounded-md border border-subMain">
          {viewNamesGroup.map((item, index) => (
            <button
              key={index}
              onClick={() => goToView(item.view)}
              className={`border-l text-xl py-2 flex-colo border-subMain ${
                toolbar.view === item.view
                  ? 'bg-subMain text-white'
                  : 'text-subMain'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomToolbar;
