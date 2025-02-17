'use client';

import { Button } from '@/components/ui/button';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

// Define the types for the props
interface ModalProps {
  closeModal: () => void;
  isOpen: boolean;
  width?: string; // Optional string prop
  children: ReactNode; // ReactNode type for child components
  title: string;
}

export default function Modal({
  closeModal,
  isOpen,
  width,
  children,
  title,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${
                  width ? width : 'max-w-4xl'
                } transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <div className="w-full flex justify-between items-center gap-2 mb-8">
                  <h1 className="text-md font-semibold">{title}</h1>
                  <Button
                    onClick={closeModal}
                    className="size-10 bg-background hover:bg-red-600 hover:bg-opacity-5 text-red-600 rounded-md flex justify-center items-center"
                  >
                    <FaTimes />
                  </Button>
                </div>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
