import { requireUser } from '@/hooks';
import { User } from 'lucide-react';
import React from 'react';

const CurrentUser = async () => {
  const session = await requireUser();

  return (
    <div className="flex gap-4 items-center p-4 rounded-lg">
      {session?.user?.image ? (
        <img
          src={session.user.image}
          alt="user"
          className="w-12 border border-border object-cover h-12 rounded-full"
        />
      ) : (
        <User className="size-10 p-2 rounded-full bg-background text-subMain shadow-sm" />
      )}
      <p className="text-sm text-subMain font-normal uppercase hidden md:flex items-center justify-center">
        {session?.user?.name}
      </p>
    </div>
  );
};

export default CurrentUser;
