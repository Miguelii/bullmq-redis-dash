'use client'

import { Button } from '@/components/button'
import { Separator } from '@/components/separator'
import { SidebarTrigger } from '@/components/sidebar'
import { useSidebarData } from '@/hooks/use-sidebar-data'
import { usePathname } from 'next/navigation'

export function SiteHeader() {
   const data = useSidebarData()

   const currPath = usePathname()

   const selectedPath = data.menu.find(
      (item) => item.url === currPath || item.url.startsWith(currPath)
   )

   return (
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
         <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
            {selectedPath?.name && (
               <h1 className="text-base font-medium underline">{selectedPath?.name}</h1>
            )}
            <div className="ml-auto flex items-center gap-2">
               <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
                  <a
                     href="https://github.com/Miguelii/bullmq-redis-dash"
                     rel="noopener noreferrer"
                     target="_blank"
                     className="dark:text-foreground"
                  >
                     GitHub
                  </a>
               </Button>
            </div>
         </div>
      </header>
   )
}
