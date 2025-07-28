import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import '@/styles/globals.css'
import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from '@/components/site-header'
import { SidebarProvider, SidebarInset } from '@/components/sidebar'
import { Toaster } from '@/components/sonner'
import { TRPCProvider } from '@/trpc-server/client-provider'
import { ClientEnv } from '@/env/client'

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
})

export const metadata: Metadata = {
   title: 'QueueDash - BullMQ & Redis Job Dashboard',
   description:
      'An educational demo showcasing how to manage background jobs using BullMQ, Redis, tRPC, and Next.js.',
   keywords: [
      'BullMQ',
      'Redis',
      'Next.js',
      'tRPC',
      'Queue',
      'Background jobs',
      'Job queue',
      'Worker',
      'Task processing',
      'Node.js',
      'Dashboard',
   ],
   authors: [{ name: 'Miguel Gonçalves' }],
   creator: 'Miguel Gonçalves',
   applicationName: 'QueueDash',
   metadataBase: ClientEnv.NEXT_PUBLIC_VERCEL_URL
      ? new URL(ClientEnv.NEXT_PUBLIC_VERCEL_URL!)
      : undefined,
   openGraph: {
      title: 'QueueDash - BullMQ & Redis Job Dashboard',
      description:
         'Visualize and manage background jobs with this modern queue processing demo built using BullMQ and Next.js.',
      url: ClientEnv.NEXT_PUBLIC_VERCEL_URL ? ClientEnv.NEXT_PUBLIC_VERCEL_URL! : undefined,
      siteName: 'QueueDash',
      locale: 'en_US',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'QueueDash - BullMQ & Redis Job Dashboard',
      description: 'Manage background tasks using BullMQ, Redis, and tRPC in a Next.js app.',
   },
}

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} antialiased`}>
            <TRPCProvider>
               <Toaster />
               <SidebarProvider
                  style={
                     {
                        '--sidebar-width': 'calc(var(--spacing) * 72)',
                        '--header-height': 'calc(var(--spacing) * 12)',
                     } as React.CSSProperties
                  }
               >
                  <AppSidebar variant="inset" />
                  <SidebarInset>
                     <SiteHeader />
                     <div className="flex flex-1 flex-col">{children}</div>
                  </SidebarInset>
               </SidebarProvider>
            </TRPCProvider>
         </body>
      </html>
   )
}
