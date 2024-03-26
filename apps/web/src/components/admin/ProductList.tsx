'use client';

import { getProducts } from '@/services/product';
import { useQuery } from '@tanstack/react-query';

export default function ProductList() {
  const { data: products } = useQuery({ queryKey: ['products'], queryFn: getProducts });
  return <div>ProductList</div>;
}
