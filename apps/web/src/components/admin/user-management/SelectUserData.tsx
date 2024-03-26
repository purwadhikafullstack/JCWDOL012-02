'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DefaultData } from './UserList';

interface SelectUserDataProps {
  setDefaultData: React.Dispatch<React.SetStateAction<DefaultData>>;
}

export default function SelectUserData({ setDefaultData }: SelectUserDataProps) {
  const handleSelect = (value: string) => {
    setDefaultData(value as DefaultData);
  };

  return (
    <Select defaultValue="admin" onValueChange={handleSelect}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select user data" className="font-medium" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-medium">
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="user">User</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
