'use client';

import React, { ChangeEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Input } from '../ui/input';
import { toast } from 'sonner';

interface ImageDisplayProps {
  url: string | null;
  name: string;
}

export default function ImageDisplay(props: ImageDisplayProps) {
  const { url, name } = props;
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    if (
      file?.type !== 'image/jpeg' &&
      file?.type !== 'image/png' &&
      file?.type !== 'image/jpg' &&
      file?.type !== 'image/gif'
    ) {
      e.target.value = '';
      return toast.error('Ekstensi file yang diperbolehkan .JPG .JPEG .PNG .GIF');
    } else if (file?.size > 1e6) {
      e.target.value = '';
      return toast.error('Besar file maksimum 1MB');
    } else {
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="col-span-1 flex w-full space-x-4">
      <Avatar className="w-40 h-40 rounded-xl">
        {selectedFile ? (
          <AvatarImage src={selectedFile} alt={name} width={200} height={200} />
        ) : (
          <AvatarImage src={url!} alt={name} width={200} height={200} />
        )}
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-between">
        <h1 className="font-semibold text-2xl">{name}</h1>
        <div className="flex flex-col w-full">
          <p className="text-sm font-medium text-gray-700">Besar file: maksimum 1MB.</p>
          <p className="text-sm font-medium text-gray-700">Ekstensi file yang diperbolehkan: .JPG .JPEG .PNG .GIF</p>
          <Input
            id="picture"
            type="file"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png, .gif"
            height={0}
            maxLength={1}
          />
        </div>
      </div>
    </div>
  );
}
