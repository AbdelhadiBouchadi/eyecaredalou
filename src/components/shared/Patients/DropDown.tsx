'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

type DropDownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const services = [
  { id: 'cataracte', name: 'Chirurgie de cataracte' },
  { id: 'retine', name: 'Chirurgie de rétine' },
  { id: 'annexes', name: 'Chirurgie des annexes' },
  { id: 'strabisme', name: 'Chirurgie de strabisme' },
  { id: 'cataracte congenitale', name: 'Chirurgie de cataracte congénitale' },
];

const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
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
        {services.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="flex cursor-pointer items-center gap-2 hover:text-subMain"
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;
