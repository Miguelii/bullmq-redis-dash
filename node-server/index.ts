import http from 'node:http'
import { Worker } from 'bullmq'
import { Redis } from 'ioredis'

const hostname = '0.0.0.0'

const port = 3000

const connection = new Redis(process.env.REDIS_URL, {
   maxRetriesPerRequest: null,
})

const worker = new Worker(
   'email-campaign',
   async (job) => {
      // Process test job
      if (job.name === 'send-email') {
         // Simulates run time of 20s
         await delay(20_000)
         console.log(`[send-email] job finish with success ID=[${job.id}]`)
      } else if (job.name === 'send_notification') {
         // Simulates run time of 20s
         await delay(20_000)
         console.log(`[send_notification] job finish with expected error ID=[${job.id}]`)
         throw new Error('MOCK_ERROR_JOB')
      } else {
         throw new Error('JOB NOT FOUND')
      }
   },
   { connection }
)

const server = http.createServer((req, res) => {
   if(process.env.REDIS_URL == null || process.env.REDIS_URL === '') {
      res.statusCode = 503
      res.setHeader('Content-Type', 'text/plain')
      res.end('BullMQ Worker not running\n')
   } else {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      res.end('Worker is running\n')
   }
})

server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`)
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
