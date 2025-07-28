import http from 'node:http';
import { Worker } from 'bullmq';

import { Redis } from 'ioredis';

const hostname = '0.0.0.0';

const port = 3000;

const connection = new Redis("redis://default:mR9nC0gzps6SxVFtIi67MJIFhEKLq1J9@redis-12404.crce204.eu-west-2-3.ec2.redns.redis-cloud.com:12404",{
  maxRetriesPerRequest: null
});

const worker = new Worker(
  'email-campaign',
  async job => {
    
    // Process test job
    if(job.name === 'send-email') {
      // Simulates run time of 20s
      await delay(20_000);
      console.log(`[send-email] job finish with ID=[${job.id}]`);
    } else if (job.name === 'send_notification') {
      // Simulates run time of 20s
      await delay(20_000);
      throw new Error("MOCK_ERROR_JOB");
    } else {
      throw new Error("JOB NOT FOUND")
    }
  },
  { connection },
);

const server = http.createServer((req, res) => {

  console.log(process.env)

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Worker is running\n');
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
