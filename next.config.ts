import type { NextConfig } from 'next'

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
