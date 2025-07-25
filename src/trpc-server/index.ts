import { publicProcedure, createTRPCRouter } from './trpc'
import { getAllQueryJobs } from '@/actions/get-all-querys-jobs'
import { addJobToEmailQueueAction } from '@/actions/add-job-to-email-queue'
import { timeout } from '@/lib/timeout'

export const appRouter = createTRPCRouter({
   getAllQueryJobs: publicProcedure.query(async () => {
      return await getAllQueryJobs()
   }),

   addJobToEmailQueueAction: publicProcedure.mutation(async () => {
      return await timeout(5_000, addJobToEmailQueueAction())
   }),

   healthCheck: publicProcedure.query(async () => {
      return {
         status: 200,
         success: true,
      }
   }),
})

// export type definition of API
export type AppRouter = typeof appRouter
