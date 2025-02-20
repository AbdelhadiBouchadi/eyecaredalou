'use client';

import { cn, formatUserRole } from '@/lib/utils';
import { FaUserMd } from 'react-icons/fa';

interface Doctor {
  id: string;
  name: string | null;
  email: string | null;
  specialization: string | null;
  role: string | null;
}

interface DoctorTableProps {
  data: Doctor[];
}

export const DoctorTable: React.FC<DoctorTableProps> = ({ data }) => {
  const thClass = 'text-center text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thClass}>#</th>
          <th className={thClass}>Avatar</th>
          <th className={thClass}>Nom</th>
          <th className={thClass}>Email</th>
          <th className={thClass}>Role</th>
        </tr>
      </thead>
      <tbody>
        {data.map((doctor, index) => (
          <tr
            key={doctor.id}
            className="border-b border-border hover:bg-greyed transition"
          >
            <td className={tdClass}>{index + 1}</td>
            <td className={tdClass}>
              <div className="w-full flex justify-center items-center">
                <FaUserMd className="size-10 p-2 rounded-full bg-primary/10 text-subMain" />
              </div>
            </td>

            <td className={tdClass}>
              <div className="flex items-center justify-center gap-4">
                <h4 className="text-sm font-medium capitalize">
                  {doctor.name || 'N/A'}
                </h4>
              </div>
            </td>
            <td className={tdClass}>{doctor.email || 'N/A'}</td>
            <td className={tdClass}>
              <span
                className={cn('py-1 px-4 bg-opacity-10 text-xs rounded-xl', {
                  'bg-subMain text-subMain': doctor.role === 'DOCTOR',
                  'bg-[#66B5A3] text-[#66B5A3]': doctor.role === 'ADMIN',
                })}
              >
                {formatUserRole(doctor.role!)}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
