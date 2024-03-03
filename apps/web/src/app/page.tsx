import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Test from '@/components/Test';
import { getSession } from '@/services/auth';

export default async function Home({ session }: any) {
  return (
    <MaxWidthWrapper className="max-w-screen-2xl">
      <main>Home Page</main>
    </MaxWidthWrapper>
  );
}
