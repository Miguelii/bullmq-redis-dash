import { RedisClientType } from '@/types/RedisClientType';

import {
  createClient as redisCreateClient,
} from 'redis'

export default class RedisClient {
  private static client: RedisClientType | null = globalThis?.__redisClient || null

  static async isRedisServiceIsUpAndRunning(): Promise<boolean> {
    if (RedisClient.client) {
      const ping = await RedisClient?.client?.ping()
      return ping?.trim()?.toUpperCase() === 'PONG'
    }
    return false
  }

  static async getClient(): Promise<RedisClientType | null> {
    if (RedisClient.client && RedisClient.client.isOpen) {
      return RedisClient.client
    }

    try {
      RedisClient.client = redisCreateClient({
        url: process.env.REDIS_URL,
      })

      RedisClient.client.on('error', (err) => {
        console.error('Redis Client Error', err)
      })

      await RedisClient.client.connect();

      globalThis.__redisClient = RedisClient.client;

      return RedisClient.client
    } catch (err) {
      console.error('Redis Connection Failed:', err)
      return null
    }
  }
}
