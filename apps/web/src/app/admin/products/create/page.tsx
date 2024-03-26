import ProductForm from '@/components/product/ProductForm';
import { Separator } from '@/components/ui/separator';

export default function CreateProduct() {
  return (
    <div className="flex flex-col w-full h-auto backdrop-blur-md p-4 space-y-4 shadow-lg shadow-gray-200/80 border rounded-md">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Create Product</h1>
        <Separator />
      </div>
      <ProductForm />
    </div>
  );
}
