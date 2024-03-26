'use client';
import Image from 'next/image';
import { z } from 'zod';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { useRouter } from 'next/navigation';
import { postProduct } from '@/services/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { createProductSchema } from '@/validators/productsValidator';
import { ChangeEvent, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const categories = ['Laptop', 'Phone'];
const allowedExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const brands = ['Axioo', 'Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Asus', 'Lenovo'];

export default function ProductForm() {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      brand: 'Axioo',
      category: 'Laptop',
      image: null,
    },
  });

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

  function onSubmit(values: z.infer<typeof createProductSchema>) {
    toast.promise(postProduct(values, file as File), {
      loading: 'Creating product...',
      success: (data) => {
        router.push('/admin/products');
        return data.message;
      },
      error: (error) => error.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((brand, index) => (
                    <SelectItem key={index} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                    handleFileChange(event);
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {previewImage && (
          <div className="w-full flex justify-center">
            <Image src={previewImage} alt="image" width={200} height={200} />
          </div>
        )}
        {/* <ProductImage previewImage={previewImage} setPreviewImage={setPreviewImage} file={file} setFile={setFile} /> */}
        <Button className="w-full" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
