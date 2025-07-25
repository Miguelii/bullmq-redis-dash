import { Queue } from 'bullmq'
import Redis from 'ioredis'
import { tryCatch } from './try-catch'

export default class RedisClient {
   private static redisClient: Redis | null = null

   private static inProgressQueues: Record<string, Promise<Queue>> = {}

   static getRedisClient(): Redis {
      if (!this.redisClient) {
         this.redisClient = new Redis(process.env.REDIS_URL!, {
            maxRetriesPerRequest: 2,
         })

         this.redisClient.on('error', (err) => {
            console.error('Redis Client Error', err)
         })
      }
      return this.redisClient
   }

   static async isRedisServiceUpAndRunning(): Promise<boolean> {
      const { data } = await tryCatch(async () => {
         if (!this.redisClient) {
            this.getRedisClient()
         }
         const ping = await this.redisClient?.ping()
         return ping?.trim()?.toUpperCase() === 'PONG'
      })

      return data ?? false
   }

   static async getQueue(name: string): Promise<Queue> {
      if (!global.__bullQueues) global.__bullQueues = {}
      if (global.__bullQueues[name]) return global.__bullQueues[name]

      if (!this.inProgressQueues[name]) {
         this.inProgressQueues[name] = (async () => {
            const redisClient = this.getRedisClient()

            const queue = new Queue(name, {
               connection: redisClient,
            })

            global.__bullQueues![name] = queue
            return queue
         })()
      }

      return this.inProgressQueues[name]
   }

   static async preloadQueuesFromRedis(): Promise<void> {
      tryCatch(async () => {
         const redis = this.getRedisClient()
         const keys = await redis.keys('bull:*:id')
         const queueNames = [...new Set(keys.map((key) => key.split(':')[1]))]

         await Promise.all(queueNames.map((name) => this.getQueue(name)))
      })
   }
}
