'use effect';

import { getAddress } from '@/services/address';
import { useQuery } from '@tanstack/react-query';
import UpdateAddress from './UpdateAddress';
import DeleteAddress from './DeleteAddress';

export default function AddressList() {
  const { data: address, isError } = useQuery({
    queryKey: ['address'],
    queryFn: () => getAddress(),
  });

  if (isError) return <div>You haven&apos;t created an address</div>;

  return (
    <div className="flex flex-col w-full space-y-4">
      {address?.map((item, index) => (
        <div key={index} className="flex flex-col relative border p-2 rounded-md mb-2">
          <div className="flex items-center space-x-2">
            <p className="font-semibold text-lg text-gray-500">{item.label}</p>
            {item.isMainAddress ? (
              <span className="font-semibold text-sm text-white bg-gray-500 px-1 rounded-sm">Main</span>
            ) : null}
          </div>
          <p className="font-semibold text-xl ">{item.recipientName}</p>
          <p className="font-medium text-gray-700 ">{item.phoneNumber}</p>
          <p>{item.fullAddress}</p>
          <div className="flex space-x-2 absolute right-2 top-2 ">
            <UpdateAddress addressId={item.id} />
            <DeleteAddress addressId={item.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
