'use client';

import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';
import { User } from '@prisma/client';
import { UserProfileForm } from './UserProfileForm';

interface UserProfileProps {
  user: NonNullable<User>;
  sessionUser: NonNullable<User>;
}

export function UserProfile({ user, sessionUser }: UserProfileProps) {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link
          href="/users"
          className="bg-white border border-subMain border-dashed rounded-lg py-3 px-4 text-md"
        >
          <IoArrowBackOutline className="text-xl" />
        </Link>
        <h1 className="sm:text-xl font-semibold">{user.name || user.email}</h1>
      </div>
      <div className="grid grid-cols-12 gap-6 my-8 items-start">
        <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border-[1px] border-border p-6">
          <UserProfileForm user={user} sessionUser={sessionUser} />
        </div>
      </div>
    </>
  );
}
