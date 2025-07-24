import { type Queue } from 'bullmq'

export type RedisQueueMap = Record<string, Queue>
