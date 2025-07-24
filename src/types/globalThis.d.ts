import { RedisQueueMap } from './RedisQueueMap'

declare global {
   var __bullQueues: RedisQueueMap | undefined
}
