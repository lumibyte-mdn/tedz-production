'use client';

import * as React from 'react';
import {
  IconChartBar,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconUsers,
} from '@tabler/icons-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { NavMain } from '../ui/nav-main';
import { NavSecondary } from '../ui/nav-secondary';
import { NavUser } from '../ui/nav-user';
import AppLogo from '../AppLogo';
import { useQuery } from '@tanstack/react-query';
import { getUserApi } from '@/api/auth';

const data = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/admin/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Category',
      url: '/admin/category',
      icon: IconListDetails,
    },
    {
      title: 'Brands',
      url: '/admin/brands',
      icon: IconChartBar,
    },
    {
      title: 'Projects',
      url: '/admin/projects',
      icon: IconFolder,
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: IconUsers,
    },
  ],
  navSecondary: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getUserApi,
  });

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='data-[slot=sidebar-menu-button]:!p-1.5 h-12'>
              <AppLogo />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='mt-4'>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user || null} />
      </SidebarFooter>
    </Sidebar>
  );
}
