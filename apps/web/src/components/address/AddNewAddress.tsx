'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import OpenCageMap from './OpenCageMap';

export default function AddNewAddress() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="sm:space-x-2">
          <Plus size={20} className="sm:flex hidden" />
          <span>Add New Address</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-sm max-w-[1000px] px-2">
        <DialogHeader>
          <DialogTitle className="text-center">Add New Address</DialogTitle>
        </DialogHeader>
        <Separator className="bg-gray-700" />
        <OpenCageMap />
      </DialogContent>
    </Dialog>
  );
}
