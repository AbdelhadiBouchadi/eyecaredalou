'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { logout } from '@/lib/actions/auth';

export function VisitorApprovalMessage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <CardTitle>Compte en attente d&apos;approbation</CardTitle>
          <CardDescription>
            Votre compte est actuellement en attente d&apos;approbation par un
            administrateur. Vous aurez accès une fois que votre compte sera
            approuvé.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2"
            variant="outline"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
