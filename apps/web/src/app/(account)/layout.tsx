import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import Sidebar from '@/components/profile/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper className="flex heightMaxBody max-w-screen-2xl my-4 lg:space-x-4">
      <Sidebar />
      {children}
    </MaxWidthWrapper>
  );
}
