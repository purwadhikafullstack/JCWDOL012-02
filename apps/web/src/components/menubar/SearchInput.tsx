import { Input } from '../ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSearchStore } from '@/store/searchStore';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '../ui/button';

export default function SearchInput() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const router = useRouter();
  const search = searchParams.get('search')!;
  const category = searchParams.get('category')!;

  const handleCategory = (category: string) => {
    params.set('category', category);
    router.replace(`?${params.toString()}`);
  };

  const handleChange = useDebouncedCallback((value: string) => {
    params.set('search', value.toString());
    router.replace(`?${params.toString()}`);
  }, 1000);

  return (
    <div className="flex w-full max-w-lg px-2 gap-2">
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => handleChange(e.target.value)}
        className="w-full focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Button onClick={() => handleCategory('pasas')}>Category</Button>
    </div>
  );
}
