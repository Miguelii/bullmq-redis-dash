import 'server-only' // <-- ensure this file cannot be imported from the client

import { tryCatch } from '@/lib/try-catch'
import RedisClient from './redis-client'
import { RedisQueueEnum } from '@/types/RedisQueueEnum'
import { revalidatePath } from 'next/cache'

export async function addJobToEmailQueueAction() {
   const { data, error } = await tryCatch(async () => {
      let success = false
      let jobId = null

      const queue = await RedisClient.getQueue(RedisQueueEnum.EMAILS)

      if (queue) {
         const res = await queue.add('send-email', {
            to: 'user@example.com',
            subject: 'Vote for us!',
         })

         success = true
         jobId = res?.id ?? null
      }

      return {
         success,
         jobId,
      }
   })

   if (error) {
      console.log({ error })
   } else {
      revalidatePath('/dashboard', 'layout')
   }

   return {
      success: data?.success ?? false,
      jobId: data?.jobId ?? null,
   }
}
