import React from 'react';
import { Listbox } from '@headlessui/react';

interface Person {
  id: number;
  name: string;
  unavailable?: boolean;
}

interface SelectProps {
  children: React.ReactNode;
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person) => void;
  datas: Person[];
}

export function Select({
  children,
  selectedPerson,
  setSelectedPerson,
  datas,
}: SelectProps) {
  return (
    <div className="text-sm relative w-full">
      <div className="w-full">
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <Listbox.Button className="w-full">{children}</Listbox.Button>
          <Listbox.Options className="flex flex-col gap-4 top-10 z-50 absolute left-0 w-full bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
            {datas.map((person) => (
              <Listbox.Option
                className="cursor-pointer text-xs hover:text-subMain"
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
    </div>
  );
}
