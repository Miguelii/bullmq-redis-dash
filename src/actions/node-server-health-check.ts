import 'server-only' // <-- ensure this file cannot be imported from the client

import { tryCatch } from '@/lib/try-catch'

export async function nodeServerHealthCheck() {
   const { data } = await tryCatch(async () => {
      const response = await fetch('https://bullmq-redis-dash.fly.dev/', {
         method: 'GET',
         cache: 'no-cache',
         credentials: 'include',
      })

      if (!response.ok) return false

      if (response.status !== 200) return false

      return true
   })

   return {
      success: data ?? false,
   }
}
