'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { BloodGroup } from '@prisma/client';

type SelectBloodGroupProps = {
  value?: BloodGroup;
  onChangeHandler: (value: BloodGroup) => void;
};

const bloodGroups = [
  { id: BloodGroup.A_POSITIVE, title: 'A+' },
  { id: BloodGroup.A_NEGATIVE, title: 'A-' },
  { id: BloodGroup.B_POSITIVE, title: 'B+' },
  { id: BloodGroup.B_NEGATIVE, title: 'B-' },
  { id: BloodGroup.O_POSITIVE, title: 'O+' },
  { id: BloodGroup.O_NEGATIVE, title: 'O-' },
  { id: BloodGroup.AB_POSITIVE, title: 'AB+' },
  { id: BloodGroup.AB_NEGATIVE, title: 'AB-' },
];

const SelectBloodGroup = ({
  value,
  onChangeHandler,
}: SelectBloodGroupProps) => {
  const [selectedValue, setSelectedValue] = useState(value || '');

  useEffect(() => {
    if (value) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (value: BloodGroup) => {
    setSelectedValue(value);
    onChangeHandler(value);
  };

  return (
    <Select value={selectedValue.toString()} onValueChange={handleChange}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder="Select blood group" />
      </SelectTrigger>
      <SelectContent className="shad-select-content capitalize">
        {bloodGroups.map((item) => (
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

export default SelectBloodGroup;
