import { ServerStatusCard } from '@/components/server-status-card'
import { trpc } from '@/trpc-server/server-provider'

export async function TrpcServerStatusCard() {
   const request = await trpc.healthCheck()

   const trpcServiceIsUpAndRunning = request?.status === 200 && request?.success === true

   return (
      <ServerStatusCard
         serviceRunning={trpcServiceIsUpAndRunning}
         title="tRPC Server Status"
         serviceDownDescription="tRPC Server is not responding or unavailable."
         serviceRunningDescription="tRPC Server is operational and accepting connections."
      />
   )
}
