import { FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { Button } from '../CustomBtn';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Define interfaces for the props
interface PatientData {
  id: string;
  title: string;
  image: string;
  admin: boolean;
  email: string;
  phone: string;
  age: number;
  gender: string;
  blood: string;
  totalAppointments: number;
  date: string;
}

interface PatientTableProps {
  data: PatientData[];
  used: boolean;
}

// patient table
export const PatientTable: React.FC<PatientTableProps> = ({ data, used }) => {
  const DropDown1 = [
    {
      title: 'Voir',
      icon: FiEye,
    },
  ];

  const thClass = 'text-center text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thClass}>#</th>
          <th className={thClass}>Patient</th>
          <th className={thClass}>Crée le:</th>
          <th className={thClass}>Sexe</th>
          {!used && (
            <>
              <th className={thClass}>Groupe Sanguin</th>
              <th className={thClass}>Age</th>
            </>
          )}
          <th className={thClass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr
            key={item.id}
            className="border-b border-border hover:bg-greyed transition"
          >
            <td className={tdClass}>{index + 1}</td>
            <td className={tdClass}>
              <div className="flex gap-4 items-center">
                {!used && item.image && (
                  <span className="w-12">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-12 rounded-full object-cover border border-border"
                    />
                  </span>
                )}
                <div>
                  <h4 className="text-sm font-medium">{item.title}</h4>
                  <p className="text-xs mt-1 text-textGray">{item.phone}</p>
                </div>
              </div>
            </td>
            <td className={tdClass}>{item.date}</td>
            <td className={tdClass}>
              <span
                className={`py-1 px-4 ${
                  item.gender === 'Mâle'
                    ? 'bg-subMain text-subMain'
                    : 'bg-orange-500 text-orange-500'
                } bg-opacity-10 text-xs rounded-xl`}
              >
                {item.gender}
              </span>
            </td>
            {!used && (
              <>
                <td className={tdClass}>{item.blood}</td>
                <td className={tdClass}>{item.age}</td>
              </>
            )}
            <td className={tdClass}>
              <Link
                href="/patients/preview"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'flex items-center gap-2 bg-subMain text-white'
                )}
              >
                Voir
                <FiEye className="text-xl" />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
