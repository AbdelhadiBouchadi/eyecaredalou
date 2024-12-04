import React from 'react';
import { DateLocalizer } from 'react-big-calendar';
import moment from 'moment';

interface CustomWorkWeekViewProps {
  date: Date;
  localizer: DateLocalizer;
}

const CustomWorkWeekView: React.FC<CustomWorkWeekViewProps> = ({
  date,
  localizer,
}) => {
  const weekStart = moment(date).startOf('week').add(1, 'day');

  const dayAttributes = [
    'Consultation glaucome',
    'Consultation surface',
    'Consultation strabisme/amblyopie',
    'Consultation rétine',
    'Consultation pédiatrique',
  ];

  return (
    <div className="rbc-work-week-view">
      {[...Array(5)].map((_, index) => {
        const day = moment(weekStart).add(index, 'days');
        return (
          <div key={index} className="rbc-work-day">
            <div className="rbc-work-day-header">
              {localizer.format(day.toDate(), 'dddd')}
            </div>
            <div className="rbc-work-day-attribute">{dayAttributes[index]}</div>
            <div className="rbc-work-day-content">
              {/* Content for each day will be rendered by react-big-calendar */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CustomWorkWeekView;
