import { type RedisJobStatusEnum } from './RedisJobStatusEnum'

export type RedisJobInfo = {
   queueName: string
   id: string
   name: string
   data: unknown // Generic job payload, depends on each job's input data
   status: RedisJobStatusEnum
}
