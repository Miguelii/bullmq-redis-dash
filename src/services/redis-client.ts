import { Queue } from 'bullmq'
import Redis from 'ioredis'

export default class RedisClient {
   private static redisClient: Redis | null = null
   //private static queueCache: RedisQueueMap = global.__bullQueues ?? {}

   static getRedisClient(): Redis {
      if (!this.redisClient) {
         this.redisClient = new Redis(process.env.REDIS_URL!)

         this.redisClient.on('error', (err) => {
            console.error('Redis Client Error', err)
         })
      }
      return this.redisClient
   }

   static async isRedisServiceIsUpAndRunning(): Promise<boolean> {
      if (!this.redisClient) {
         this.getRedisClient()
      }

      const ping = await this.redisClient?.ping()
      return ping?.trim()?.toUpperCase() === 'PONG'
   }

   static async getQueue(name: string): Promise<Queue> {
      if (!global.__bullQueues) global.__bullQueues = {}
      if (global.__bullQueues[name]) return global.__bullQueues[name]

      const redisClient = this.getRedisClient()

      const queue = new Queue(name, {
         connection: redisClient,
      })

      global.__bullQueues[name] = queue

      //this.queueCache = global.__bullQueues

      return queue
   }
}
