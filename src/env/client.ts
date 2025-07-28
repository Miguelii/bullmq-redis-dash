import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const ClientEnv = createEnv({
   client: {
      NEXT_PUBLIC_VERCEL_URL: z.url().nullish(),
   },
   runtimeEnv: {
      NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
   },
})
