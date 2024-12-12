'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { memberData } from '@/lib/data';
import { useEffect, useState } from 'react';

type SelectStatusProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const status = [
  { id: 'canceled', title: 'Annulé' },
  { id: 'approved', title: 'Approuvé' },
  { id: 'pending', title: 'En attente' },
];

const SelectStatus = ({ value, onChangeHandler }: SelectStatusProps) => {
  const [selectedValue, setSelectedValue] = useState(value?.toString() || '');

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChangeHandler(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder={'Choisir un service'} />
      </SelectTrigger>
      <SelectContent className="shad-select-content capitalize">
        {status.map((item, index) => (
          <SelectItem
            key={index}
            value={item.id}
            className="flex cursor-pointer items-center gap-2 hover:text-subMain"
          >
            {item.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectStatus;
