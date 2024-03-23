import ProductList from '@/components/admin/ProductList';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getProducts } from '@/services/product';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React from 'react';

export default async function ProductsPage() {
  const products = new QueryClient();
  await products.prefetchQuery({ queryKey: ['products'], queryFn: getProducts });

  return (
    <div className="flex flex-col w-full h-auto backdrop-blur-md p-4 space-y-4 shadow-lg shadow-gray-200/80 border rounded-md">
      <div className="flex w-full justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Button size="sm">
          <Link href="/admin/products/create">Post Product</Link>
        </Button>
      </div>
      <Separator />
      <HydrationBoundary state={dehydrate(products)}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
}
