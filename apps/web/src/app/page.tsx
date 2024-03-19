import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { HeroCarousel } from '@/components/hero/HeroCarousel';

export default async function Home() {
  return (
    <MaxWidthWrapper className="max-w-screen-2xl">
      <main className="md:py-4 py-2 w-full">
        <HeroCarousel />
      </main>
    </MaxWidthWrapper>
  );
}
