import 'server-only' // <-- ensure this file cannot be imported from the client

import { tryCatch } from '@/lib/try-catch'
import { type RedisJobInfo } from '@/types/RedisJobInfo'
import { RedisJobStatusEnum } from '@/types/RedisJobStatusEnum'
import { type Job } from 'bullmq'
import RedisClient from '@/lib/redis-client'

export async function getAllQueryJobs() {
   const { data, error } = await tryCatch(async () => {
      await RedisClient.preloadQueuesFromRedis()

      const queues = RedisClient.getQueuesCache()

      const allJobs: RedisJobInfo[] = []

      for (const [queueName, queue] of Object.entries(queues)) {
         try {
            const jobs = await queue.getJobs(
               ['waiting', 'active', 'completed', 'failed', 'delayed', 'paused'],
               0,
               1000
            )

            const formattedJobs = jobs?.map((job: Job) => ({
               queueName,
               id: job.id!,
               name: job.name,
               data: job.data,
               status: parseJobStatus(job),
            }))

            allJobs.push(...formattedJobs)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
         } catch (error) {
            /* empty */
         }
      }

      return allJobs
   })

   if (error) {
      console.log({ error })
   }

   const jobsPending =
      data?.filter(
         (item) =>
            item.status === RedisJobStatusEnum.WAITING || item.status === RedisJobStatusEnum.ACTIVE
      ) ?? []

   const jobsCompleted = data?.filter((item) => item.status === RedisJobStatusEnum.COMPLETED) ?? []

   const jobsFailed = data?.filter((item) => item.status === RedisJobStatusEnum.FAILED) ?? []

   return {
      success: true,
      jobsPending,
      jobsCompleted,
      jobsFailed,
      totalPending: jobsPending?.length ?? 0,
      totalCompleted: jobsCompleted?.length ?? 0,
      totalFailed: jobsFailed?.length ?? 0,
   }
}

const parseJobStatus = (job: Job): RedisJobStatusEnum => {
   if (job.finishedOn) {
      return RedisJobStatusEnum.COMPLETED
   }

   if (job.failedReason) {
      return RedisJobStatusEnum.FAILED
   }

   if (job.processedOn) {
      return RedisJobStatusEnum.ACTIVE
   }

   return RedisJobStatusEnum.WAITING
}
