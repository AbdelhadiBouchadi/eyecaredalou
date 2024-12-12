'use client';

import React from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { TbUser } from 'react-icons/tb';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { signOut } from 'next-auth/react';

const ProfileMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-sm w-full relative">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="flex flex-col z-50 gap-4 absolute right-0 bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
          <Link
            href="/settings"
            className="flex gap-4 items-center hover:text-subMain w-48 xl:w-60"
          >
            <TbUser className="text-xl text-subMain" />
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="flex gap-4 items-center hover:text-subMain w-48 xl:w-60"
          >
            <AiOutlinePoweroff className="text-xl text-subMain" />
            Se déconnecter
          </button>
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
