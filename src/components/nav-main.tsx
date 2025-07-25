'use client'

import { type Icon } from '@tabler/icons-react'

import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from '@/components/sidebar'

export function NavMain({
   items,
}: {
   items: {
      name: string
      url: string
      icon: Icon
   }[]
}) {
   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
         <SidebarGroupLabel>Menu</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => (
               <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                     <a href={item.url}>
                        <item.icon />
                        <span>{item.name}</span>
                     </a>
                  </SidebarMenuButton>
               </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarGroup>
   )
}
