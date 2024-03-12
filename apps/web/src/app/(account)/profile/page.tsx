'use client';

import ImageDisplay from '@/components/profile/ImageDisplay';
import ProfileForm from '@/components/profile/ProfileForm';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSessionStore } from '@/utils/SessionProvider';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useSessionStore((state) => state);

  return (
    <div className="flex flex-col w-full h-auto backdrop-blur-md p-4 space-y-4 shadow-lg shadow-gray-200/80 border rounded-md">
      <div className="flex flex-col">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <p className="text-sm text-gray-700">
          Feel free to edit any of your details below so your Basic.Space account is always up to date.
        </p>
      </div>
      <Separator />
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
        <ImageDisplay url={user.image} name={user.name} />
        <div className="col-span-2 space-y-4  ">
          <ProfileForm user={user} />
          <Separator />
          {user.authType === 'Local' ? (
            <div>
              <p className="text-md font-semibold mb-2 text-gray-700">Reset your password</p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Reset Password</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      If you want to reset your password, you must enter your email to send the OTP code, continue to
                      enter the page
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>
                      <Link href="/request/reset-password">Continue</Link>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
