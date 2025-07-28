import type { NextConfig } from 'next'

import { loadEnv } from '@/lib/load-env'

loadEnv()

const nextConfig: NextConfig = {
   turbopack: {
      resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
   },
   experimental: {
      ppr: 'incremental',
      webpackBuildWorker: true,
      webpackMemoryOptimizations: true,
      reactCompiler: true,
   },
   poweredByHeader: true,
}

export default nextConfig
