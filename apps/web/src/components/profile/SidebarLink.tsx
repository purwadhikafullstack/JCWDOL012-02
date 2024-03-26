import Link from 'next/link';

export default function SidebarLink({
  href,
  label,
  children,
  active,
}: {
  href: string;
  label: string;
  children?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center justify-between hover:bg-gray-50 font-medium rounded-sm py-2 px-2 ${
        active ? 'text-blue-600' : ''
      }`}
    >
      <p>{label}</p>
      {children}
    </Link>
  );
}
