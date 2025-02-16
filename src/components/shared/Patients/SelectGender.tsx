'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Gender } from '@prisma/client';

type SelectGenderProps = {
  value?: Gender;
  onChangeHandler: (value: Gender) => void;
};

const genders = [
  { id: Gender.MALE, title: 'Homme' },
  { id: Gender.FEMALE, title: 'Femme' },
];

const SelectGender = ({ value, onChangeHandler }: SelectGenderProps) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (value: Gender) => {
    setSelectedValue(value);
    onChangeHandler(value);
  };

  return (
    <Select value={selectedValue.toString()} onValueChange={handleChange}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder="Select gender" />
      </SelectTrigger>
      <SelectContent className="shad-select-content capitalize">
        {genders.map((item) => (
          <SelectItem
            key={item.id}
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

export default SelectGender;
