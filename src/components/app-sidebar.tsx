'use client'

import * as React from 'react'
import { IconInnerShadowTop } from '@tabler/icons-react'

import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/ui/sidebar'
import { NavMain } from './nav-main'
import Link from 'next/link'
import { useSidebarData } from '@/hooks/use-sidebar-data'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const data = useSidebarData()

   return (
      <Sidebar collapsible="offcanvas" {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                     <Link prefetch={false} href={'/'}>
                        <IconInnerShadowTop className="!size-5" />
                        <span className="text-base font-semibold">CampaignQueueDash</span>
                     </Link>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.menu} />
         </SidebarContent>
      </Sidebar>
   )
}
