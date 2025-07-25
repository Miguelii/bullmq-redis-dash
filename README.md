# 🎯 QueueDash

A simple and educational demo showcasing how to manage background tasks using [BullMQ](https://docs.bullmq.io/), [Redis](https://redis.io/), and [Next.js](https://nextjs.org/).

This application demonstrates how to offload long or intensive processes (like sending emails, processing files, or performing heavy computations) to background jobs using a queue system.

---

## Technologies

- **Next.js** – Framework for frontend and API routes.
   - React Compiler
   - Partial Prerendering (PPR)
   - App Router

- **tRPC** - End-to-end typesafe API between the Next.js frontend and API routes.
   - React Query for caching and revalidating

- **Redis** - An in-memory data store used by BullMQ to persist job states and manage queues.

- **BullMQ** - A Node.js library for creating and managing job queues based on Redis.
   - Worker process running in a dedicated Node.js API
