'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/admin';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import SelectUserData from './SelectUserData';
import { User } from '@/@types/user';
import { adminColumns } from '../columns/AdminColumns';
import { userColumns } from '../columns/UserColumns';
import NewAdminWarehouse from './NewAdminWarehouse';

export enum DefaultData {
  USERS = 'user',
  ADMIN = 'admin',
}

export default function UserList() {
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [defaultData, setDefaultData] = useState<DefaultData>(DefaultData.ADMIN);
  const users = data?.users as User[];
  const admin = data?.warehouseAdmin as User[];

  const table = useReactTable({
    data: defaultData === DefaultData.USERS ? users : admin,
    columns: defaultData === DefaultData.USERS ? userColumns : adminColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          {defaultData === DefaultData.ADMIN && <NewAdminWarehouse />}
          <SelectUserData setDefaultData={setDefaultData} />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={userColumns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
