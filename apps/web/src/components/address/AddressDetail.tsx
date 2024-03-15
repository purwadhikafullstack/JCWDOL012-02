'use client';

import { z } from 'zod';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { DialogClose } from '../ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDataStore } from '@/store/dataStore';
import { addressSchema } from '@/validators/userValidator';
import { postNewAddress, updateAddress } from '@/services/address';
import { useAddressStore } from '@/store/locationStore';
import { useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Type } from '@/app/(account)/address/page';
import { useQueryClient } from '@tanstack/react-query';

interface AddressDetailProps {
  type: Type;
  addressId?: number;
}

export default function AddressDetail(props: AddressDetailProps) {
  const { type, addressId } = props;
  const { position, setStep } = useAddressStore();
  const { cities, provinces } = useDataStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const query = useQueryClient();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: 'Home',
      recipientName: '',
      phoneNumber: '',
      provinceId: '',
      cityId: '',
      fullAddress: '',
      latitude: position?.lat || 0,
      longitude: position?.lng || 0,
      isMainAddress: false,
    },
  });
  form.watch(['provinceId'], { cityId: '' });

  function onSubmit(values: z.infer<typeof addressSchema>) {
    toast.promise(type === 'Add' ? postNewAddress(values) : updateAddress(addressId!, values), {
      loading: 'Updating address...',
      success: (data) => {
        setStep(0);
        closeRef.current?.click();
        query.invalidateQueries({ queryKey: ['address'] });
        return data.message;
      },
      error: (error) => error.message,
    });
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input placeholder="Label" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="recipientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input placeholder="Recipient Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="provinceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Province</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a province" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {provinces.map((province) => (
                      <SelectItem key={province.province_id} value={province.province_id}>
                        {province.province}
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
            name="cityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" defaultValue={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {cities.map((city) => {
                      if (city.province_id === form.getValues('provinceId')) {
                        return (
                          <SelectItem key={city.city_id} value={city.city_id}>
                            {city.city_name}
                          </SelectItem>
                        );
                      }
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Address</FormLabel>
                <FormControl>
                  <Input placeholder="Full address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isMainAddress"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <FormLabel>Set to main address</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Save</Button>
          <DialogClose ref={closeRef} />
        </form>
      </Form>
    </div>
  );
}
