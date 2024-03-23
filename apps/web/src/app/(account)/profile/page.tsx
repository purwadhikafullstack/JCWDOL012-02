'use client';

import dynamic from 'next/dynamic';
import ImageDisplay from '@/components/profile/ImageDisplay';
import ProfileFormLoader from '@/components/profile/loader/ProfileFormLoader';
import { Separator } from '@/components/ui/separator';
import { useSessionStore } from '@/utils/SessionProvider';
import { UpdatePassword } from '@/components/profile/UpdatePassword';

const ProfileForm = dynamic(() => import('@/components/profile/ProfileForm'), {
  ssr: false,
  loading: () => <ProfileFormLoader />,
});

const ChangeEmail = dynamic(() => import('@/components/profile/ChangeEmail'), {
  ssr: false,
  loading: () => <div>Loading</div>,
});

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
        <ImageDisplay url={user?.image} name={user?.name} />
        <div className="col-span-2 space-y-4  ">
          <ProfileForm user={user!} />
          <Separator />
          <ChangeEmail />
          {user?.authType === 'Local' ? (
            <div>
              <UpdatePassword />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
