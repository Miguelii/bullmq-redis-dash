import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
   client: {
      NEXT_PUBLIC_EXAMPLE: z.string().nullish(),
   },
   runtimeEnv: {
      NEXT_PUBLIC_EXAMPLE: process.env.NEXT_PUBLIC_EXAMPLE,
   },
})
