import Link from 'next/link';

export default function SidebarLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="flex items-center justify-between hover:bg-gray-50 rounded-sm py-2 px-2">
      <p>{label}</p>
      {children}
    </Link>
  );
}
