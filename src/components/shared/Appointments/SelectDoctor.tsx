import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getDoctors } from '@/lib/actions/auth';

interface Doctor {
  id: string;
  name: string | null;
  email: string | null;
  specialization: string | null;
}

interface SelectDoctorProps {
  value: string;
  onChangeHandler: (value: string) => void;
}

const SelectDoctor = ({ value, onChangeHandler }: SelectDoctorProps) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Chargement des docteurs..." />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select onValueChange={onChangeHandler} value={value || ''}>
      <SelectTrigger className="capitalize">
        <SelectValue placeholder="Sélectionner un docteur" />
      </SelectTrigger>
      <SelectContent>
        {doctors.map((doctor) => (
          <SelectItem key={doctor.id} value={doctor.id} className="capitalize">
            {doctor.name}
            {doctor.specialization && ` - ${doctor.specialization}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectDoctor;
