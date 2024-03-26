import AdminSidebar from '@/components/admin/AdminSidebar';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper className="flex heightMaxBody max-w-screen-2xl my-4 lg:space-x-4">
      <AdminSidebar />
      {children}
    </MaxWidthWrapper>
  );
}
