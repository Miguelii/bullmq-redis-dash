import { publicProcedure, createTRPCRouter } from './trpc'
import { getAllQueryJobs } from '@/actions/get-all-querys-jobs'
import { timeout } from '@/lib/timeout'
import { nodeServerHealthCheck } from '@/actions/node-server-health-check'
import { AddJobActionSchema } from '@/actions/add-job-to-email-queue.schema'
import { addJobToEmailQueueAction } from '@/actions/add-job-to-email-queue'

export const appRouter = createTRPCRouter({
   getAllQueryJobs: publicProcedure.query(async () => {
      return await getAllQueryJobs()
   }),

   addJobToEmailQueueAction: publicProcedure
      .input(AddJobActionSchema)
      .mutation(async ({ input }) => {
         return await timeout(5_000, addJobToEmailQueueAction(input))
      }),

   healthCheck: publicProcedure.query(async () => {
      return {
         status: 200,
         success: true,
      }
   }),

   nodejsHealthCheck: publicProcedure.query(async () => {
      return await nodeServerHealthCheck()
   }),
})

// export type definition of API
export type AppRouter = typeof appRouter
