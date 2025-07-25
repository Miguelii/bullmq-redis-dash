import { Skeleton } from '@/components/skeleton'
import { EmailJobCard } from '@/features/email-job-card'
import { JobsMonitoringCard } from '@/features/jobs-monitoring-card'
import { NodeServerStatusCard } from '@/features/node-server-status-card'
import { RedisServerStatusCard } from '@/features/redis-server-status-card'
import { TrpcServerStatusCard } from '@/features/trpc-server-status-card'
import { Suspense } from 'react'

export const experimental_ppr = true

export const revalidate = 3600

export default async function DashboardPage() {
   return (
      <main className="@container/main flex flex-1 flex-col gap-12 px-5 py-10 md:p-10">
         <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs">
            {/*
             * Each service is represented by its own card component.
             * This ensures that each card is responsible for fetching and managing its own data independently.
             */}
            <Suspense fallback={<Skeleton className="w-full h-28" />}>
               <RedisServerStatusCard />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-28" />}>
               <TrpcServerStatusCard />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full h-28" />}>
               <NodeServerStatusCard />
            </Suspense>
         </div>

         <div className="flex flex-col gap-8">
            <h2 className="text-xl font-bold">Available Operations</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 XL:grid-cols-4 gap-4">
               <EmailJobCard />
            </div>
         </div>

         <div className="flex flex-col gap-8">
            <h3 className="text-xl font-bold">Jobs Monitoring</h3>
            <JobsMonitoringCard />
         </div>
      </main>
   )
}
