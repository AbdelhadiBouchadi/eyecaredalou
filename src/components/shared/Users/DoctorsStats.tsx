import { Stethoscope } from 'lucide-react';
import React from 'react';

interface DoctorStatsProps {
  stats: number;
}

const DoctorsStats = ({ stats }: DoctorStatsProps) => {
  return (
    <div className="bg-white flex-btn gap-4 rounded-xl border-[1px] border-border p-5">
      <div className="w-3/4">
        <h2 className="text-sm font-medium">Nombre total de docteurs</h2>
        <h2 className="text-xl my-6 font-medium">{stats}</h2>
        <p className="text-xs text-textGray">
          Total de Docteurs{' '}
          <span className="ml-2 bg-primary text-secondary">{stats}</span>{' '}
        </p>
      </div>
      <div className={`w-10 h-10 flex-colo rounded-md text-white text-md `}>
        <Stethoscope />
      </div>
    </div>
  );
};

export default DoctorsStats;
