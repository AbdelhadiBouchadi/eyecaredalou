import React from 'react';
import { Menu } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { logout } from '@/lib/actions/auth';
import Link from 'next/link';
import { TbUser } from 'react-icons/tb';
import { AiOutlinePoweroff } from 'react-icons/ai';

const ProfileMenu = ({ children }: { children: React.ReactNode }) => {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="text-sm w-full relative">
      <Menu>
        <Menu.Button>{children}</Menu.Button>
        <Menu.Items className="flex flex-col z-50 gap-4 absolute -left-8 bg-white rounded-md shadow-lg py-4 px-6 ring-1 ring-border focus:outline-none">
          <Link
            href="/settings"
            className="flex gap-4 items-center hover:text-subMain md:w-42"
          >
            <TbUser className="text-xl text-subMain" />
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex gap-4 items-center hover:text-subMain md:w-42"
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
