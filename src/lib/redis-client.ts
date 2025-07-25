import { Queue } from 'bullmq'
import Redis from 'ioredis'
import { tryCatch } from './try-catch'
import { RedisQueueMap } from '@/types/RedisQueueMap'

export default class RedisClient {
   private static redisClient: Redis | null = null

   private static inProgressQueues: Record<string, Promise<Queue>> = {}

   private static queuesCache: RedisQueueMap = {}

   /**
    * Returns the current cache of created queues.
    * @returns {RedisQueueMap} Map of cached queues indexed by name.
    */
   static getQueuesCache(): RedisQueueMap {
      return this.queuesCache
   }

   /**
    * Gets the singleton Redis client instance.
    * Creates a new Redis connection if it doesn't exist yet.
    * @returns {Redis} The Redis client instance.
    */
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

   /**
    * Checks if the Redis service is up by sending a ping command.
    * @returns {Promise<boolean>} True if Redis responded with PONG, false otherwise.
    */
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

   /**
    * Gets a BullMQ queue instance by name.
    * Reuses the cached queue if it exists or creates a new one.
    * Ensures that concurrent calls for the same queue create only one instance.
    * @param {string} name - The name of the queue to get.
    * @returns {Promise<Queue>} The BullMQ queue instance.
    */
   static async getQueue(name: string): Promise<Queue> {
      if (this.queuesCache[name]) return this.queuesCache[name]

      if (!this.inProgressQueues[name]) {
         this.inProgressQueues[name] = (async () => {
            const redisClient = this.getRedisClient()

            const queue = new Queue(name, {
               connection: redisClient,
            })

            this.queuesCache[name] = queue
            return queue
         })()
      }

      return this.inProgressQueues[name]
   }

   /**
    * Preloads all existing queues found in Redis,
    * identifying queue names by scanning Redis keys.
    * Uses getQueue to create or retrieve cached instances.
    */
   static async preloadQueuesFromRedis(): Promise<void> {
      await tryCatch(async () => {
         const redis = this.getRedisClient()
         const keys = await redis.keys('bull:*:id')
         const queueNames = [...new Set(keys.map((key) => key.split(':')[1]))]

         await Promise.all(queueNames.map((name) => this.getQueue(name)))
      })
   }
}
