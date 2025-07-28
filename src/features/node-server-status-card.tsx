import { ServerStatusCard } from '@/components/server-status-card'
import { trpc } from '@/trpc-server/server-provider'

export async function NodeServerStatusCard() {
   const request = await trpc.nodejsHealthCheck()

   const nodeServiceIsUpAndRunning = request?.success === true

   return (
      <ServerStatusCard
         serviceRunning={nodeServiceIsUpAndRunning}
         title="Node.js Server Status"
         serviceDownDescription="Node.js is not responding or unavailable."
         serviceRunningDescription="Node.js is operational and accepting connections."
      />
   )
}
