'use client';

import { MenuDatas } from '@/lib/data';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { IconType } from 'react-icons/lib';

interface SidebarLinkProps {
  title: string;
  path: string;
  icon: IconType;
}

const SidebarLink = ({ title, path, icon }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === path || (path !== '/' && pathname.startsWith(path));

  return (
    <Link
      href={path}
      className={`
            ${isActive ? 'bg-text' : ''}
            flex gap-4 transitions group items-center w-full p-4 rounded-lg hover:bg-text`}
    >
      {React.createElement(icon, {
        className: 'text-xl text-subMain font-semibold',
      })}
      <p
        className={`text-sm font-semibold group-hover:text-subMain ${
          isActive ? 'text-subMain ' : 'text-gray-500'
        }`}
      >
        {title}
      </p>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="bg-white xl:shadow-lg py-6 px-4 xl:h-screen w-full border-r border-border">
      <Link href="/">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-3/4 h-12 ml-4 object-contain"
        />
      </Link>
      <div className="flex-colo gap-2 mt-6">
        {MenuDatas.map((item, index) => (
          <SidebarLink
            key={index}
            path={item.path}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
