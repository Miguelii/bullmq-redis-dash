import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
   const BASE_URL = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

   return [
      {
         url: BASE_URL,
         lastModified: new Date(),
         changeFrequency: 'weekly',
         priority: 1,
      },
      {
         url: `${BASE_URL}/dashboard`,
         lastModified: new Date(),
         changeFrequency: 'daily',
         priority: 1,
      },
   ]
}
