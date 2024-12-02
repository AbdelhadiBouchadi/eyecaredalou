import React from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';

interface MenuItem {
  title: string;
  icon?: React.ElementType;
  path?: string; // Make path optional
  onClick?: (data: MenuItem) => void; // Add onClick callback
}

interface MenuSelectProps {
  children: React.ReactNode;
  datas: MenuItem[];
  item?: MenuItem[]; // Adjust this type according to the expected data type
}

const MenuSelect = ({ children, datas }: MenuSelectProps) => {
  return (
    <div className="text-sm w-full relative">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="flex flex-col z-50 gap-4 absolute -left-8 bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
          {datas.map((item, index) => (
            <Link
              href={item.path!}
              key={index}
              className={`flex gap-4 items-center hover:text-subMain md:w-36`}
            >
              {item.icon && <item.icon className="text-md text-subMain" />}
              {item.title}
            </Link>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default MenuSelect;
