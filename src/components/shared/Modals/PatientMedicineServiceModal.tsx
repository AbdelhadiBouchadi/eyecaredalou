'use client';

import React, { useState, useMemo } from 'react';
import Modal from './Modal';
import { BiSearch, BiPlus } from 'react-icons/bi';
import { RadioGroup } from '@headlessui/react';
import { Button } from '../Form';
import { medicineData, memberData, servicesData } from '@/lib/data';
import { Patient, Medicine, ServiceListItem } from '@/types';

interface PatientMedicineServiceModalProps {
  closeModal: () => void;
  isOpen: boolean;
  patient: boolean;
}

type SelectableItem = Patient | Medicine | ServiceListItem;

const PatientMedicineServiceModal: React.FC<
  PatientMedicineServiceModalProps
> = ({ closeModal, isOpen, patient }) => {
  const [selected, setSelected] = useState<SelectableItem>(() =>
    patient ? memberData[0] : (servicesData[0] as ServiceListItem)
  );

  const datas = useMemo(() => {
    if (patient) {
      return memberData;
    }
    return [
      ...(servicesData.slice(1, 100) as ServiceListItem[]),
      ...medicineData,
    ].sort((a, b) => (a.name ?? '').localeCompare(b.name ?? ''));
  }, [patient]);

  const getDisplayName = (item: SelectableItem): string => {
    if ('title' in item) {
      return item.title;
    }
    return item.name;
  };

  const getSubtext = (item: SelectableItem): string | undefined => {
    if ('email' in item) {
      return item.email;
    }
    return undefined;
  };

  return (
    <Modal
      closeModal={closeModal}
      isOpen={isOpen}
      title={patient ? 'Patients' : 'Medicine & Services'}
      width={'max-w-xl'}
    >
      <div className="flex-colo gap-6">
        <div className="flex items-center gap-4 w-full border border-border rounded-lg p-3">
          <input type="text" placeholder="Rechercher ..." className="w-full" />
          <BiSearch className="text-xl" />
        </div>

        <div className="w-full h-[500px] overflow-y-scroll">
          <RadioGroup value={selected} onChange={setSelected}>
            <div className="space-y-2">
              {datas.map((item) => (
                <RadioGroup.Option
                  key={item.id}
                  value={item}
                  className={({ active }) =>
                    `${
                      active ? 'border-subMain bg-subMain text-white' : ''
                    } rounded-xl border-[1px] border-border p-4 group hover:bg-subMain hover:text-white`
                  }
                >
                  {({ active }) => (
                    <>
                      <h6 className="text-sm">{getDisplayName(item)}</h6>
                      {patient && (
                        <p
                          className={`${
                            active ? 'text-white' : 'text-textGray'
                          } text-xs group-hover:text-white mt-1`}
                        >
                          {getSubtext(item)}
                        </p>
                      )}
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>

        <Button onClick={closeModal} label="Add" Icon={BiPlus} />
      </div>
    </Modal>
  );
};

export default PatientMedicineServiceModal;
