'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface UserButtonProps {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}

export function UserButton({ email, name, image }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <div className="flex gap-4 items-center rounded-full border border-dashed border-subMain shadow-xl hover:scale-110 transition-all duration-300">
            <Avatar>
              {image ? (
                <AvatarImage
                  src={image}
                  alt="Profile image"
                  className="w-10 h-10 object-cover object-center"
                />
              ) : (
                <AvatarFallback>
                  {name ? (
                    name.charAt(0).toUpperCase()
                  ) : (
                    <User className="size-10 p-2 rounded-full bg-background text-subMain" />
                  )}
                </AvatarFallback>
              )}
            </Avatar>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="me-2 opacity-60"
              aria-hidden="true"
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name || 'User'}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email || 'No email'}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile" className="flex items-center gap-2">
              <Settings
                size={16}
                strokeWidth={2}
                className="opacity-60"
                aria-hidden="true"
              />
              <span>Profil</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2 cursor-pointer"
        >
          <LogOut
            size={16}
            strokeWidth={2}
            className="opacity-60"
            aria-hidden="true"
          />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
