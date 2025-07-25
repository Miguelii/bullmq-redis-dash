import RedisClient from '@/lib/redis-client'
import { ServerStatusCard } from '@/components/server-status-card'

export async function RedisServerStatusCard() {
   const redisServiceIsUpAndRunning = await RedisClient.isRedisServiceUpAndRunning()
   return (
      <ServerStatusCard
         serviceRunning={redisServiceIsUpAndRunning}
         title="Redis Server Status"
         serviceDownDescription="Redis server is not responding or unavailable."
         serviceRunningDescription="Redis server is operational and accepting connections."
      />
   )
}
