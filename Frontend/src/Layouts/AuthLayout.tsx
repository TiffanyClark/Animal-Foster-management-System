import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/shared/SideBar';
import type { NavItem } from '@/components/shared/SideBar';
import {
  Box,
  Home,
  LayoutDashboard,
  PawPrint,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { UserAvatar } from '@/components/shared/UserAvatar';
import { Outlet } from 'react-router-dom';
import useGlobalContext from '@/hooks/useGlobalContext';

const fosterNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/foster-page', icon: LayoutDashboard },
  { name: 'My Pets', href: '/foster-pets-page', icon: PawPrint },
  { name: 'Store', href: '/foster-store-page', icon: ShoppingBag },
];

const employeeNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/employee-page', icon: LayoutDashboard },
  {
    name: 'Foster Parents',
    href: '/employee-foster-parents-page',
    icon: Users,
  },
  { name: 'Foster Homes', href: '/employee-foster-homes-page', icon: Home },
  { name: 'Inventory', href: '/employee-inventory-page', icon: Box },
  { name: 'Pets', href: '/employee-pets-page', icon: PawPrint },
];

export default function AuthLayout() {
  const { user } = useGlobalContext();
  let navItem = fosterNavItems;
  let label = 'Foster';

  if (user?.employeeId !== null && user?.fosterParent === null) {
    navItem = employeeNavItems;
    label = 'Employee';
  }

  if (user?.employeeId !== null && user?.fosterParent !== null) {
    const tempFoster = [
      { name: 'My Pets', href: '/foster-pets-page', icon: PawPrint },
      { name: 'Store', href: '/foster-store-page', icon: ShoppingBag },
    ];
    navItem = [...tempFoster, ...employeeNavItems];
    label = 'Employee';
  }

  return (
    <SidebarProvider>
      <AppSidebar label={label} navItems={navItem} />
      <SidebarInset className="flex flex-col min-h-screen">
        <header className="flex h-16 items-center justify-between px-4">
          <SidebarTrigger />
          <UserAvatar />
        </header>
        <div className="flex-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
