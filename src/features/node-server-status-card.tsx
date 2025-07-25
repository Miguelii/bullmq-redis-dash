import { ServerStatusCard } from '@/components/server-status-card'

export async function NodeServerStatusCard() {
   const nodeServiceIsUpAndRunning = false

   return (
      <ServerStatusCard
         serviceRunning={nodeServiceIsUpAndRunning}
         title="Node.js Server Status"
         serviceDownDescription="Node.js is not responding or unavailable."
         serviceRunningDescription="Node.js is operational and accepting connections."
      />
   )
}
