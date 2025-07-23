import {
  type RedisFunctions,
  type RedisModules,
  type RedisScripts,
  type RedisClientType as RedisType,
} from 'redis'

export type RedisClientType = RedisType<RedisModules, RedisFunctions, RedisScripts, 2 | 3>