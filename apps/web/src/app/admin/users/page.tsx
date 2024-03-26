import UserList from '@/components/admin/user-management/UserList';
import { Separator } from '@/components/ui/separator';
import { getUsers } from '@/services/admin';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

export default async function UsersPage() {
  const users = new QueryClient();
  await users.prefetchQuery({ queryKey: ['users'], queryFn: getUsers });

  return (
    <div className="flex h-auto w-full flex-col space-y-2 rounded-md border p-4 shadow-lg shadow-gray-200/80 backdrop-blur-md">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>
      <Separator />
      <HydrationBoundary state={dehydrate(users)}>
        <UserList />
      </HydrationBoundary>
    </div>
  );
}
