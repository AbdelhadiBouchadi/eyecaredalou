'use client';

import { FiEye } from 'react-icons/fi';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn, formatUserRole } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { deleteUser } from '@/lib/actions/auth';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { DeleteUser } from './DeleteUser';

type UserData = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
  createdAt: Date;
};

interface UserTableProps {
  data: UserData[];
}

export const UserTable: React.FC<UserTableProps> = ({ data }) => {
  const router = useRouter();
  const thClass = 'text-center text-sm font-medium py-3 px-2 whitespace-nowrap';
  const tdClass = 'text-xs py-4 px-2 whitespace-nowrap text-center';

  const handleDelete = async (id: string) => {
    try {
      const result = await deleteUser(id);
      if (result.success) {
        toast.success('Utilisateur supprimé avec succès');
        router.refresh();
      } else {
        toast.error(
          result.error || "Erreur lors de la suppression de l'utilisateur"
        );
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
          <th className={thClass}>Nom</th>
          <th className={thClass}>Email</th>
          <th className={thClass}>Role</th>
          <th className={thClass}>Crée le</th>
          <th className={thClass}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user, index) => (
          <tr
            key={user.id}
            className="border-b border-border hover:bg-greyed transition"
          >
            <td className={tdClass}>{index + 1}</td>
            <td className={tdClass}>
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || ''}
                  className="w-12 h-12 rounded-full object-cover border border-border mx-auto"
                />
              ) : (
                <span className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mx-auto">
                  {user.name?.[0].toUpperCase() ||
                    user.email?.[0].toUpperCase()}
                </span>
              )}
            </td>
            <td className={tdClass}>
              <h4 className="text-sm font-medium capitalize">
                {user.name || 'N/A'}
              </h4>
            </td>
            <td className={tdClass}>{user.email}</td>
            <td className={tdClass}>
              <span
                className={cn('py-1 px-4 bg-opacity-10 text-xs rounded-xl', {
                  'bg-subMain text-subMain': user.role === 'DOCTOR',
                  'bg-orange-500 text-orange-500': user.role === 'VISITOR',
                  'bg-[#66B5A3] text-[#66B5A3]': user.role === 'ADMIN',
                })}
              >
                {formatUserRole(user.role!)}
              </span>
            </td>
            <td className={tdClass}>
              {format(new Date(user.createdAt), 'PP', { locale: fr })}
            </td>
            <td className={tdClass}>
              <div className="flex items-center justify-center gap-2">
                <Link
                  href={`/users/${user.id}`}
                  className={cn(
                    buttonVariants({ variant: 'default' }),
                    'flex items-center gap-2'
                  )}
                >
                  Voir
                  <FiEye className="text-xl" />
                </Link>

                <DeleteUser userId={user.id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
