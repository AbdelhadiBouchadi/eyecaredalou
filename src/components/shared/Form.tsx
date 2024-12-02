'use client';

import { Listbox, Menu, Switch } from '@headlessui/react';
import React, { ReactNode } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';
import DatePicker from 'react-datepicker';
import { FaCheck } from 'react-icons/fa';
import { fr } from 'date-fns/locale/fr';
import { registerLocale } from 'react-datepicker';

registerLocale('fr', fr);

// Input Component
interface InputProps {
  label: string;
  name: string;
  type: string;
  color?: boolean;
  placeholder: string;
}
export function Input({ label, name, type, color, placeholder }: InputProps) {
  return (
    <div className="text-sm w-full">
      <label
        className={`${
          color ? 'text-black text-sm' : 'text-white font-semibold'
        }`}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm mt-3 p-4 border ${
          color ? 'border-border font-light' : 'border-white text-white'
        } rounded-lg focus:border focus:border-subMain`}
      />
    </div>
  );
}

// Button Component
interface ButtonProps {
  label: string;
  onClick: () => void;
  loading?: boolean;
  Icon?: React.ComponentType<{ className?: string }>;
}
export function Button({ label, onClick, loading, Icon }: ButtonProps) {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="w-full flex justify-center items-center gap-4 hover:opacity-80 transition bg-subMain text-white text-sm font-medium px-2 py-4 rounded"
    >
      {loading ? (
        <BiLoaderCircle className="animate-spin text-white text-2xl" />
      ) : (
        <>
          {label}
          {Icon && <Icon className="text-white text-xl" />}
        </>
      )}
    </button>
  );
}

type MenuItem = {
  title: string;
  onClick: (data: MenuItem) => void;
  icon?: React.ComponentType<{ className?: string }>; // Accepts a component with className prop
};

interface MenuSelectProps {
  children: React.ReactNode; // The content for the menu button
  datas: MenuItem[]; // Array of menu items
  item: MenuItem; // Type of the data being passed (you can replace `any` with a specific type if known)
}

export function MenuSelect({ children, datas, item: data }: MenuSelectProps) {
  return (
    <div className="text-sm w-full relative">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="flex flex-col z-50 gap-4 absolute left-0 bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
          {datas.map((item, index) => (
            <button
              onClick={() => item.onClick(data)}
              key={index}
              className="flex gap-4 items-center hover:text-subMain"
            >
              {item.icon &&
                React.createElement(item.icon, {
                  className: 'text-md text-subMain',
                })}
              {item.title}
            </button>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}

type Person = {
  id: string | number;
  name: string;
};
// Select Component
interface SelectProps {
  children: ReactNode;
  selectedPerson: Person;
  setSelectedPerson: (value: Person) => void;
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
            {datas.map((person, index) => (
              <Listbox.Option
                key={index}
                value={person}
                className="cursor-pointer text-xs hover:text-subMain"
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

// Switch Component
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export function Switchi({ checked, onChange }: SwitchProps) {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? 'bg-subMain' : 'bg-border'
      } relative inline-flex p-[2px] w-12 cursor-pointer rounded-full transition`}
    >
      <span
        aria-hidden="true"
        className={`${
          checked ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition`}
      />
    </Switch>
  );
}

// Textarea Component
interface TextareaProps {
  label: string;
  name?: string;
  placeholder: string;
  rows: number;
}
export function Textarea({
  label,
  name,

  placeholder,
  rows,
}: TextareaProps) {
  return (
    <div className="text-sm w-full">
      <label className="text-black text-sm">{label}</label>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className="focus:border-subMain w-full bg-transparent text-sm mt-3 p-4 border border-border rounded font-light"
      />
    </div>
  );
}

// DatePicker Component
interface DatePickerProps {
  label: string;
  startDate: Date | null;
  onChange: (date: Date | null) => void;
}
export function DatePickerComp({
  label,
  startDate,
  onChange,
}: DatePickerProps) {
  return (
    <div className="text-sm w-full">
      <label className="text-black text-sm">{label}</label>
      <DatePicker
        locale={fr}
        selected={startDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
      />
    </div>
  );
}

// TimePicker Component
interface TimePickerProps {
  label: string;
  startDate: Date | null;
  onChange: (date: Date | null) => void;
}
export function TimePickerComp({
  label,
  startDate,
  onChange,
}: TimePickerProps) {
  return (
    <div className="text-sm w-full">
      <label className="text-black text-sm">{label}</label>
      <DatePicker
        locale={fr}
        selected={startDate}
        onChange={onChange}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        className="w-full bg-transparent text-sm mt-3 p-4 border border-border font-light rounded-lg focus:border focus:border-subMain"
      />
    </div>
  );
}

// Checkbox Component
interface CheckboxProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}
export function Checkbox({ label, name, onChange, checked }: CheckboxProps) {
  return (
    <div className="text-sm w-full flex flex-row items-center">
      <label className="flex items-center cursor-pointer relative">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="absolute opacity-0 w-0 h-0"
        />
        <span
          className={`border rounded w-5 h-5 flex justify-center items-center mr-2 ${
            checked ? 'border-subMain bg-subMain' : 'border-gray-300 bg-white'
          }`}
        >
          <FaCheck className={`${checked ? 'block text-white' : 'hidden'}`} />
        </span>
      </label>
      {label && <p className="text-black text-xs ml-2">{label}</p>}
    </div>
  );
}
