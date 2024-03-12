'use client';

import React, { ChangeEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import { Button, buttonVariants } from '../ui/button';
import { Label } from '../ui/label';
import { uploadImage } from '@/services/user';
import { useSessionStore } from '@/utils/SessionProvider';
import { updateUser } from '@/hooks/updateUser';

interface ImageDisplayProps {
  url: string;
  name: string;
}

export default function ImageDisplay(props: ImageDisplayProps) {
  const { url, name } = props;
  const { setLocalStorage } = useSessionStore((state) => state);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    if (!allowedExtensions.includes(file?.type!)) {
      e.target.value = '';
      return toast.error('Only .jpg, .jpeg, .png and .gif formats are supported.');
    } else if (file?.size! > 1e6) {
      e.target.value = '';
      return toast.error('Max image size 1MB');
    } else {
      reader.onloadend = () => setPreviewImage(reader.result as string);
      setFile(file!);
      reader.readAsDataURL(file!);
    }
  };

  const handleUpload = () => {
    let formData = new FormData();
    formData.append('image', file!);
    uploadImage(formData).then((res) => {
      if (res.success) {
        updateUser(setLocalStorage);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
    setFile(null);
    setPreviewImage(null);
  };

  return (
    <div className="col-span-1 w-full flex sm:flex-col flex-row sm:space-x-0 space-x-4 items-center justify-center">
      <div className="flex md:w-full sm:w-[200px] w-[120px] justify-center">
        <AspectRatio ratio={10 / 10} className="flex rounded-md object-cover overflow-hidden ">
          {previewImage ? (
            <Image
              src={previewImage}
              alt={name}
              width={200}
              height={200}
              priority
              className="object-cover object-center w-auto h-auto:"
            />
          ) : (
            <Avatar className="rounded-none w-full h-full">
              <AvatarImage src={url} alt={name} width={200} height={200} className="object-cover w-auto h-auto" />
              <AvatarFallback className="rounded-none">{name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
        </AspectRatio>
      </div>
      <div className="flex h-full w-full flex-col justify-end my-2 px-2 space-y-2">
        <div>
          <p className="md:text-sm text-xs font-medium text-gray-700">Max image size 1MB</p>
          <p className="md:text-sm text-xs font-medium text-gray-700">
            Only .jpg, .jpeg, .png and .gif formats are supported.
          </p>
        </div>
        {previewImage ? (
          <Button size="sm" onClick={handleUpload}>
            Update
          </Button>
        ) : (
          <Label htmlFor="input-file" className="w-full">
            <span className={buttonVariants({ size: 'sm', className: 'w-full' })}>Chose image</span>
            <Input
              id="input-file"
              type="file"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png, .gif"
              maxLength={1}
              className="hidden"
            />
          </Label>
        )}
      </div>
    </div>
  );
}
