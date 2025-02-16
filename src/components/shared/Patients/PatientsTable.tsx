'use client';

import { FiEye, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn, formatBloodGroup } from '@/lib/utils';
import { PatientWithRelations } from '@/types';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deletePatient } from '@/lib/actions/patient';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { DeletePatient } from './DeletePatient';

interface PatientTableProps {
  data: PatientWithRelations[];
}

export const PatientTable: React.FC<PatientTableProps> = ({ data }) => {
  const router = useRouter();
  const thClass = 'text-center text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  const handleDelete = async (id: string) => {
    try {
      const result = await deletePatient(id);
      if (result.success) {
        toast.success('Patient supprimé avec succès');
        router.refresh();
      } else {
        toast.error(result.error || 'Erreur lors de la suppression du patient');
      }
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error(error);
    }
  };

  return (
    <table className="table-auto w-full">
      <thead className="bg-dry rounded-md overflow-hidden">
        <tr>
          <th className={thClass}>#</th>
          <th className={thClass}>Photo</th>
          <th className={thClass}>Patient</th>
          <th className={thClass}>Crée par</th>
          <th className={thClass}>Crée le:</th>
          <th className={thClass}>Sexe</th>
          <th className={thClass}>Groupe Sanguin</th>
          <th className={thClass}>Age</th>
          <th className={thClass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((patient, index) => (
          <tr
            key={patient.id}
            className="border-b border-border hover:bg-greyed transition"
          >
            <td className={tdClass}>{index + 1}</td>
            <td className={tdClass}>
              {patient.profileImage ? (
                <img
                  src={patient.profileImage}
                  alt={patient.fullName}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
              ) : (
                <span className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  {patient.fullName[0].toUpperCase()}
                </span>
              )}
            </td>
            <td className={tdClass}>
              <div>
                <h4 className="text-sm font-medium capitalize">
                  {patient.fullName}
                </h4>
                <p className="text-xs mt-1 text-textGray">
                  {patient.totalAppointments} rendez-vous
                </p>
              </div>
            </td>
            <td className={tdClass}>
              <p className="capitalize">
                {patient.createdBy?.name || patient.createdBy?.email || 'N/A'}
              </p>
            </td>
            <td className={tdClass}>
              {format(new Date(patient.createdAt), 'PP', { locale: fr })}
            </td>
            <td className={tdClass}>
              <span
                className={`py-1 px-4 ${
                  patient.gender === 'MALE'
                    ? 'bg-subMain text-subMain'
                    : 'bg-orange-500 text-orange-500'
                } bg-opacity-10 text-xs rounded-xl`}
              >
                {patient.gender === 'MALE' ? 'Homme' : 'Femme'}
              </span>
            </td>
            <td className={tdClass}>{formatBloodGroup(patient.bloodGroup)}</td>
            <td className={tdClass}>{patient.age}</td>
            <td className={tdClass}>
              <div className="flex items-center justify-center gap-2">
                <Link
                  href={`/patients/${patient.id}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'flex items-center gap-2 '
                  )}
                >
                  Voir
                  <FiEye className="text-xl" />
                </Link>

                <DeletePatient patientId={patient.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
