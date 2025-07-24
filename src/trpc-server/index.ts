import { publicProcedure, createTRPCRouter } from './trpc'
import { getAllQueryJobs } from '@/services/get-all-querys-jobs'
import { addJobToEmailQueueAction } from '@/services/add-job-to-email-queue-action'

export const appRouter = createTRPCRouter({
   getAllQueryJobs: publicProcedure.query(async () => {
      return await getAllQueryJobs()
   }),

   addJobToEmailQueueAction: publicProcedure.mutation(async () => {
      return await addJobToEmailQueueAction()
   }),
})

// export type definition of API
export type AppRouter = typeof appRouter
