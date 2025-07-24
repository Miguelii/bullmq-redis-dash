import { EmailJobCard } from '@/components/email-job-card'
import { JobsMonitoringCard } from '@/components/jobs-monitoring-card'
import { RedisServerStatusCard } from '@/components/redis-server-status-card'
import RedisClient from '@/services/redis-client'

export const revalidate = 3600;

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
   const redisServiceIsUpAndRunning = await RedisClient.isRedisServiceIsUpAndRunning()

   return (
      <main className="@container/main flex flex-1 flex-col gap-12 px-5 py-10 md:p-10">
         <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-1 @5xl/main:grid-cols-1">
            <RedisServerStatusCard redisServiceIsUpAndRunning={redisServiceIsUpAndRunning} />
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
