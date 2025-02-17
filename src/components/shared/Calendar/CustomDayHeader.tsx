import React from 'react';

interface CustomDayHeaderProps {
  date: Date;
}

const CustomDayHeader: React.FC<CustomDayHeaderProps> = ({ date }) => {
  const dayOfWeek = date.getDay();

  const getConsultationType = (day: number) => {
    switch (day) {
      case 1: // Monday
        return 'Glaucome';
      case 2: // Tuesday
        return 'Surface';
      case 3: // Wednesday
        return 'Pédiatrique';
      case 4: // Thursday
        return 'Rétine';
      default:
        return '';
    }
  };

  const getDayName = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
  };

  const consultationType = getConsultationType(dayOfWeek);

  return (
    <div className="rbc-header-content flex flex-col items-center justify-center">
      <span className="rbc-header-day">{getDayName(date)}</span>
      {consultationType && (
        <span className="rbc-header-consultation">{consultationType}</span>
      )}
    </div>
  );
};

export default CustomDayHeader;
