import { AppointmentStatus } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SelectStatusProps {
  value: AppointmentStatus;
  onChangeHandler: (value: AppointmentStatus) => void;
}

const statusOptions = [
  { value: AppointmentStatus.PENDING, label: 'En attente' },
  { value: AppointmentStatus.APPROVED, label: 'Approuvé' },
  { value: AppointmentStatus.CANCELED, label: 'Annulé' },
  { value: AppointmentStatus.COMPLETED, label: 'Terminé' },
];

const SelectStatus = ({ value, onChangeHandler }: SelectStatusProps) => {
  return (
    <Select
      value={value}
      onValueChange={(val) => onChangeHandler(val as AppointmentStatus)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Sélectionner un status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((status) => (
          <SelectItem key={status.value} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
