import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  title: string;
  width?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  closeModal,
  title,
  width = 'max-w-lg',
  children,
}: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto custom-scrollbar">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full ${width} transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all max-h-[90vh]`}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center px-2"
                >
                  {title}
                  <button
                    onClick={closeModal}
                    className="hover:opacity-70 transition bg-red-500 rounded-full p-2"
                  >
                    <IoClose className="size-4 text-primary-foreground" />
                  </button>
                </Dialog.Title>
                <div className="mt-6 max-h-[70vh] overflow-y-auto custom-scrollbar px-2">
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
