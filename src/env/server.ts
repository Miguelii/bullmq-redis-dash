import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const ServerEnv = createEnv({
   server: {
      REDIS_URL: z.string().min(50),
   },
   experimental__runtimeEnv: process.env,
})
