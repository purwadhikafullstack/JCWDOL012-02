export const adminLinks = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
  { name: 'Warehouse', href: '/admin/warehouse', icon: 'Warehouse' },
  { name: 'Products', href: '/admin/products', icon: 'Package' },
  { name: 'Orders', href: '/admin/orders', icon: 'PackageCheck' },
  { name: 'Mutations', href: '/admin/mutations', icon: 'Banknote' },
  { name: 'Users', href: '/admin/users', icon: 'BookUser' },
];
export const adminPage = [
  '/admin/users',
  '/admin/products',
  '/admin/orders',
  '/admin/mutations',
  '/admin/warehouse',
  '/admin/dashboard',
  '/admin/products/create',
];

export const authPage = ['/login', '/admin/login', '/register', '/confirm/[code]', '/reset-password'];
export const profilePage = ['/profile', '/carts', '/orders', '/address', '/transactions'];
