import { ArrowUpDown } from 'lucide-react';
import { Button } from '../../ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { User } from '@/@types/user';

export const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Created at</div>,
    cell: ({ row }) => {
      const createdAt: string = row.getValue('createdAt');
      const formatedDate = new Date(createdAt);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
      return <div className="text-right font-medium">{formatedDate.toLocaleDateString('id-ID', options)}</div>;
    },
  },
];
