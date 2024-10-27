import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fr } from 'date-fns/locale/fr';

registerLocale('fr', fr);

interface FromToDateProps {
  label?: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (dates: [Date | undefined, Date | undefined]) => void;
  bg?: string;
}

export const FromToDate: React.FC<FromToDateProps> = ({
  label,
  startDate,
  endDate,
  onChange,
  bg,
}) => {
  return (
    <div className="text-sm w-full flex flex-col gap-2">
      {label && <label className="text-black text-sm">{label}</label>}
      <DatePicker
        locale="fr"
        placeholderText="Choisir une date"
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update) =>
          onChange(update as [Date | undefined, Date | undefined])
        }
        className={`w-full ${
          bg || 'bg-transparent'
        } text-xs px-4 h-14 border border-border text-main font-normal rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
};
