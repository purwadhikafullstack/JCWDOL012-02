import { Trash } from 'lucide-react';
import { Button } from '../../ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/@types/user';
import UpdateAdminWarehouse from '../user-management/UpdateAdminWarehouse';
import DeleteAdminWarehouse from '../user-management/DeleteAdminWarehouse';

export const adminColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div>Created at</div>,
    cell: ({ row }) => {
      const createdAt: string = row.getValue('createdAt');
      const formatedDate = new Date(createdAt);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return <div className="font-medium">{formatedDate.toLocaleDateString('id-ID', options)}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex w-full justify-end gap-2">
          <UpdateAdminWarehouse data={data} />
          <DeleteAdminWarehouse email={data.email} />
        </div>
      );
    },
  },
];
